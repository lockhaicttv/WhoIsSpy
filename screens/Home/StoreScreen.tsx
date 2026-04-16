import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as RNIap from "react-native-iap";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import {
  PACKAGE_NAMES,
  PREMIUM_PACKAGES,
} from "../../constants/defaultKeywords";
import {
  getKeywordStats,
  getUserPurchases,
  unlockPackage,
} from "../../db/keywordService";
import {
  initializeIAP,
  getProducts,
  requestPurchase,
  acknowledgePurchase,
  restorePurchases,
  setupPurchaseListener,
  PRODUCT_IDS,
  PRODUCT_TO_PACKAGE_MAP,
} from "../../services/iapService";
import { t } from "../../utils/i18n";

interface PackageInfo {
  id: string;
  name: string;
  descriptionKey: string;
  description: string;
  keywordCount: number;
  price: string;
  productId: string; // Google Play product ID
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const PACKAGES_CONFIG: Omit<PackageInfo, "name" | "description">[] = [
  {
    id: PREMIUM_PACKAGES.ADVANCED,
    productId: PRODUCT_IDS.ADVANCED,
    descriptionKey: "store.advancedDesc",
    keywordCount: 200,
    price: "$2.99",
    icon: "trophy",
    color: "#ff9800",
  },
  {
    id: PREMIUM_PACKAGES.CULTURE,
    productId: PRODUCT_IDS.CULTURE,
    descriptionKey: "store.cultureDesc",
    keywordCount: 250,
    price: "$2.99",
    icon: "globe",
    color: "#006b1b",
  },
  {
    id: PREMIUM_PACKAGES.SCIENCE,
    productId: PRODUCT_IDS.SCIENCE,
    descriptionKey: "store.scienceDesc",
    keywordCount: 200,
    price: "$2.99",
    icon: "flask",
    color: "#874e00",
  },
  {
    id: PREMIUM_PACKAGES.ENTERTAINMENT,
    productId: PRODUCT_IDS.ENTERTAINMENT,
    descriptionKey: "store.entertainmentDesc",
    keywordCount: 300,
    price: "$3.99",
    icon: "film",
    color: "#b02500",
  },
  {
    id: PREMIUM_PACKAGES.ULTIMATE,
    productId: PRODUCT_IDS.ULTIMATE,
    descriptionKey: "store.ultimateDesc",
    keywordCount: 950,
    price: "$9.99",
    icon: "diamond",
    color: "#665c00",
  },
  {
    id: PREMIUM_PACKAGES.CUSTOM_KEYWORDS,
    productId: PRODUCT_IDS.CUSTOM_KEYWORDS,
    descriptionKey: "store.customKeywordsDesc",
    keywordCount: 0,
    price: "$6.99",
    icon: "create",
    color: "#006b1b",
  },
];

const IS_DEV = process.env.EXPO_PUBLIC_APP_ENV !== "production";

const StoreScreen = () => {
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    locked: 0,
    free: 0,
    premium: 0,
  });
  const [unlockedPackages, setUnlockedPackages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [storeProducts, setStoreProducts] = useState<RNIap.Product[]>([]);

  // Build packages array with translated descriptions and real prices
  const packages: PackageInfo[] = PACKAGES_CONFIG.map((pkg) => {
    const storeProduct = storeProducts.find((p) => p.id === pkg.productId);
    return {
      ...pkg,
      name: PACKAGE_NAMES[pkg.id],
      description: t(pkg.descriptionKey) || "",
      price: storeProduct?.displayPrice || pkg.price, // Use real price from store
    };
  });

  useEffect(() => {
    let purchaseListener: (() => void) | null = null;

    const initStore = async () => {
      try {
        // Initialize IAP connection
        const initialized = await initializeIAP();

        if (initialized) {
          // Get real products from Google Play Store
          const products = await getProducts();
          setStoreProducts(products);

          // Restore previous purchases
          await syncPurchasesFromStore();

          // Set up purchase listener
          purchaseListener = setupPurchaseListener(
            handlePurchaseUpdate,
            handlePurchaseError
          );
        } else if (IS_DEV) {
          // In development, auto-unlock all packages if IAP not available
          unlockAllPackagesForDev();
        }
      } catch (error) {
        console.error("Failed to initialize store:", error);
      } finally {
        setIsLoading(false);
        loadData();
      }
    };

    initStore();

    // Cleanup
    return () => {
      if (purchaseListener) {
        purchaseListener();
      }
    };
  }, []);

  const unlockAllPackagesForDev = () => {
    try {
      Object.values(PREMIUM_PACKAGES).forEach((packageId) => {
        unlockPackage(packageId, PACKAGE_NAMES[packageId]);
      });
      console.log("🔓 Dev mode: All packages unlocked");
    } catch (error) {
      console.warn("Dev: failed to auto-unlock packages", error);
    }
  };

  const syncPurchasesFromStore = async () => {
    try {
      // Get all purchases from Google Play
      const purchasedProductIds = await restorePurchases();

      // Unlock corresponding packages in local database
      for (const productId of purchasedProductIds) {
        const packageId = PRODUCT_TO_PACKAGE_MAP[productId];
        if (packageId) {
          const packageName = PACKAGE_NAMES[packageId];

          // Handle Ultimate Pack (unlocks all individual packs)
          if (packageId === PREMIUM_PACKAGES.ULTIMATE) {
            unlockPackage(PREMIUM_PACKAGES.ADVANCED, PACKAGE_NAMES[PREMIUM_PACKAGES.ADVANCED]);
            unlockPackage(PREMIUM_PACKAGES.CULTURE, PACKAGE_NAMES[PREMIUM_PACKAGES.CULTURE]);
            unlockPackage(PREMIUM_PACKAGES.SCIENCE, PACKAGE_NAMES[PREMIUM_PACKAGES.SCIENCE]);
            unlockPackage(PREMIUM_PACKAGES.ENTERTAINMENT, PACKAGE_NAMES[PREMIUM_PACKAGES.ENTERTAINMENT]);
          }

          unlockPackage(packageId, packageName);
        }
      }

      console.log(`✅ Synced ${purchasedProductIds.length} purchases from store`);
    } catch (error) {
      console.error("Failed to sync purchases:", error);
    }
  };

  const handlePurchaseUpdate = async (purchase: RNIap.Purchase) => {
    try {
      const { productId, purchaseToken } = purchase;

      // Get package ID from product ID
      const packageId = PRODUCT_TO_PACKAGE_MAP[productId];
      if (!packageId) {
        console.warn("Unknown product purchased:", productId);
        return;
      }

      const packageName = PACKAGE_NAMES[packageId];

      // Unlock the package in local database
      if (packageId === PREMIUM_PACKAGES.ULTIMATE) {
        // Ultimate pack unlocks all individual packs
        unlockPackage(PREMIUM_PACKAGES.ADVANCED, PACKAGE_NAMES[PREMIUM_PACKAGES.ADVANCED]);
        unlockPackage(PREMIUM_PACKAGES.CULTURE, PACKAGE_NAMES[PREMIUM_PACKAGES.CULTURE]);
        unlockPackage(PREMIUM_PACKAGES.SCIENCE, PACKAGE_NAMES[PREMIUM_PACKAGES.SCIENCE]);
        unlockPackage(PREMIUM_PACKAGES.ENTERTAINMENT, PACKAGE_NAMES[PREMIUM_PACKAGES.ENTERTAINMENT]);
      }

      unlockPackage(packageId, packageName);

      // Acknowledge the purchase with Google Play
      if (purchaseToken) {
        await acknowledgePurchase(purchaseToken);
      }

      // Show success message
      Alert.alert(
        t("store.successUnlock"),
        t("store.successUnlockMsg", { name: packageName })
      );

      // Reload data
      loadData();
      setIsPurchasing(false);
    } catch (error) {
      console.error("Failed to process purchase:", error);
      Alert.alert(t("common.error"), t("store.failedUnlock"));
      setIsPurchasing(false);
    }
  };

  const handlePurchaseError = (error: RNIap.PurchaseError) => {
    console.error("Purchase error:", error);

    if (error.code !== RNIap.ErrorCode.UserCancelled) {
      Alert.alert(t("common.error"), error.message || t("store.failedUnlock"));
    }

    setIsPurchasing(false);
  };

  const loadData = () => {
    const keywordStats = getKeywordStats();
    setStats(keywordStats);

    const purchases = getUserPurchases();
    setUnlockedPackages(purchases.map((p) => p.packageId));
  };

  const handleUnlock = async (packageInfo: PackageInfo) => {
    if (isPurchasing) return;

    // In dev mode, just unlock directly
    if (IS_DEV) {
      performDirectUnlock(packageInfo);
      return;
    }

    try {
      setIsPurchasing(true);

      // Request purchase from Google Play
      await requestPurchase(packageInfo.productId);

      // Purchase listener will handle the rest
    } catch (error: any) {
      console.error("Purchase request failed:", error);

      if (error.code !== RNIap.ErrorCode.UserCancelled) {
        Alert.alert(t("common.error"), t("store.failedUnlock"));
      }

      setIsPurchasing(false);
    }
  };

  const performDirectUnlock = (packageInfo: PackageInfo) => {
    try {
      if (packageInfo.id === PREMIUM_PACKAGES.ULTIMATE) {
        unlockPackage(PREMIUM_PACKAGES.ADVANCED, PACKAGE_NAMES[PREMIUM_PACKAGES.ADVANCED]);
        unlockPackage(PREMIUM_PACKAGES.CULTURE, PACKAGE_NAMES[PREMIUM_PACKAGES.CULTURE]);
        unlockPackage(PREMIUM_PACKAGES.SCIENCE, PACKAGE_NAMES[PREMIUM_PACKAGES.SCIENCE]);
        unlockPackage(PREMIUM_PACKAGES.ENTERTAINMENT, PACKAGE_NAMES[PREMIUM_PACKAGES.ENTERTAINMENT]);
      }

      unlockPackage(packageInfo.id, packageInfo.name);

      Alert.alert(
        t("store.successUnlock"),
        t("store.successUnlockMsg", { name: packageInfo.name })
      );

      loadData();
    } catch (error) {
      Alert.alert(t("common.error"), t("store.failedUnlock"));
    }
  };

  const handleRestorePurchases = async () => {
    try {
      setIsLoading(true);
      await syncPurchasesFromStore();
      loadData();
      Alert.alert(t("store.restoreSuccess"), t("store.restoreSuccessMsg"));
    } catch (error) {
      console.error("Failed to restore purchases:", error);
      Alert.alert(t("common.error"), t("store.restoreFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const isUnlocked = (packageId: string) =>
    unlockedPackages.includes(packageId);

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#e0fee1] items-center justify-center">
        <ActivityIndicator size="large" color="#006b1b" />
        <Text className="text-[#47624b] mt-4 font-bold">
          {t("store.loading")}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1" edges={["bottom"]}>
        <ScrollView
          className="flex-1 px-6 pt-6"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Stats */}
          <Card variant="primary" className="mb-8">
            <View className="flex-row items-center gap-3 mb-4">
              <Ionicons name="library" size={28} color="#005d16" />
              <Text className="text-2xl font-black text-[#00480f] tracking-tight uppercase">
                {t("store.yourCollection")}
              </Text>
            </View>

            <View className="bg-[#c7f0cd]/40 rounded-xl p-4">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-sm font-bold text-[#47624b]">
                  {t("store.availableKeywords")}
                </Text>
                <Text className="text-3xl font-black text-[#006b1b]">
                  {stats.available}
                </Text>
              </View>

              <View className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
                <View
                  className="h-full bg-[#006b1b] rounded-full"
                  style={{
                    width: `${(stats.available / (stats.total || 1)) * 100}%`,
                  }}
                />
              </View>

              <Text className="text-xs text-[#47624b] mt-2 text-center">
                {t("store.keywordsUnlocked", {
                  available: stats.available,
                  total: stats.total,
                })}
              </Text>
            </View>
          </Card>

          {/* Package Cards */}
          <View className="mb-4">
            <Text className="text-xl font-black text-[#1b3420] mb-4 uppercase tracking-tight">
              {t("store.premiumPackages")}
            </Text>
          </View>

          <View className="w-full gap-6 pb-32">
            {packages.map((pkg, index) => {
              const unlocked = isUnlocked(pkg.id);

              return (
                <Card
                  key={pkg.id}
                  variant="surface"
                  className={index % 2 === 0 ? "rotate-1" : "-rotate-1"}
                >
                  <View className="relative">
                    {/* Unlocked Badge */}
                    {unlocked && (
                      <View
                        className="absolute -top-2 -right-2 bg-[#006b1b] rounded-full px-3 py-1 flex-row items-center gap-1 z-10"
                        style={{
                          shadowColor: "#1b3420",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.2,
                          shadowRadius: 4,
                          elevation: 3,
                        }}
                      >
                        <Ionicons
                          name="checkmark-circle"
                          size={14}
                          color="#d1ffc8"
                        />
                        <Text className="text-[10px] font-bold text-[#d1ffc8] uppercase">
                          {t("store.unlocked")}
                        </Text>
                      </View>
                    )}

                    <View className="flex-row items-start gap-4 mb-4">
                      <View
                        className="w-16 h-16 rounded-2xl items-center justify-center"
                        style={{ backgroundColor: `${pkg.color}20` }}
                      >
                        <Ionicons name={pkg.icon} size={32} color={pkg.color} />
                      </View>

                      <View className="flex-1">
                        <Text className="font-black text-xl text-[#1b3420] mb-1 uppercase tracking-tight">
                          {pkg.name}
                        </Text>
                        <View className="flex-row items-center gap-2">
                          <View className="bg-[#d8f9d9] px-2 py-1 rounded-full">
                            <Text className="text-[10px] font-bold text-[#006b1b] uppercase">
                              {pkg.id === PREMIUM_PACKAGES.CUSTOM_KEYWORDS
                                ? t("store.unlimited")
                                : `+${pkg.keywordCount} ${t("store.keywords")}`}
                            </Text>
                          </View>
                          {!unlocked && (
                            <View className="bg-[#f9e534] px-2 py-1 rounded-full">
                              <Text className="text-[10px] font-bold text-[#5b5300] uppercase">
                                {pkg.price}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>

                    <Text className="text-sm text-[#47624b] mb-4">
                      {pkg.description}
                    </Text>

                    {!unlocked ? (
                      <Button
                        label={t("store.unlockNow")}
                        variant="primary"
                        size="small"
                        icon="lock-open"
                        onPress={() => handleUnlock(pkg)}
                      />
                    ) : (
                      <View className="bg-[#d8f9d9] px-6 py-3 rounded-full flex-row items-center justify-center gap-2">
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color="#006b1b"
                        />
                        <Text className="font-bold text-sm text-[#006b1b] uppercase">
                          {t("store.owned")}
                        </Text>
                      </View>
                    )}
                  </View>
                </Card>
              );
            })}
          </View>

          {/* Restore Purchases Button */}
          {!IS_DEV && (
            <View className="mb-6">
              <Button
                label={t("store.restorePurchases")}
                variant="secondary"
                size="small"
                icon="refresh"
                onPress={handleRestorePurchases}
                disabled={isLoading}
              />
            </View>
          )}

          {/* Info Card - dev mode only */}
          {IS_DEV && (
            <Card variant="secondary" className="mb-32 -rotate-1">
              <View className="flex-row items-start gap-3">
                <Ionicons name="code-slash" size={24} color="#5b5300" />
                <View className="flex-1">
                  <Text className="text-sm font-bold text-[#5b5300] mb-2">
                    {t("store.demoModeActive")}
                  </Text>
                  <Text className="text-xs text-[#5b5300]/70">
                    {t("store.demoModeDesc")}
                  </Text>
                </View>
              </View>
            </Card>
          )}
          {!IS_DEV && <View className="mb-32" />}
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Navigation - Fixed at bottom */}
      <BottomNavigation />
    </View>
  );
};

export default StoreScreen;
