import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { t } from "../../utils/i18n";

interface PackageInfo {
  id: string;
  name: string;
  descriptionKey: string;
  keywordCount: number;
  price: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const PACKAGES_CONFIG: Omit<PackageInfo, "name">[] = [
  {
    id: PREMIUM_PACKAGES.ADVANCED,
    descriptionKey: "store.advancedDesc",
    keywordCount: 200,
    price: "$2.99",
    icon: "trophy",
    color: "#ff9800",
  },
  {
    id: PREMIUM_PACKAGES.CULTURE,
    descriptionKey: "store.cultureDesc",
    keywordCount: 250,
    price: "$2.99",
    icon: "globe",
    color: "#006b1b",
  },
  {
    id: PREMIUM_PACKAGES.SCIENCE,
    descriptionKey: "store.scienceDesc",
    keywordCount: 200,
    price: "$2.99",
    icon: "flask",
    color: "#874e00",
  },
  {
    id: PREMIUM_PACKAGES.ENTERTAINMENT,
    descriptionKey: "store.entertainmentDesc",
    keywordCount: 300,
    price: "$3.99",
    icon: "film",
    color: "#b02500",
  },
  {
    id: PREMIUM_PACKAGES.ULTIMATE,
    descriptionKey: "store.ultimateDesc",
    keywordCount: 950,
    price: "$9.99",
    icon: "diamond",
    color: "#665c00",
  },
  {
    id: PREMIUM_PACKAGES.CUSTOM_KEYWORDS,
    descriptionKey: "store.customKeywordsDesc",
    keywordCount: 0,
    price: "$1.99",
    icon: "create",
    color: "#006b1b",
  },
];

const StoreScreen = () => {
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    locked: 0,
    free: 0,
    premium: 0,
  });
  const [unlockedPackages, setUnlockedPackages] = useState<string[]>([]);

  // Build packages array with translated descriptions
  const packages: PackageInfo[] = PACKAGES_CONFIG.map((pkg) => ({
    ...pkg,
    name: PACKAGE_NAMES[pkg.id],
    description: t(pkg.descriptionKey) || "",
  }));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const keywordStats = getKeywordStats();
    setStats(keywordStats);

    const purchases = getUserPurchases();
    setUnlockedPackages(purchases.map((p) => p.packageId));
  };

  const handleUnlock = (packageInfo: PackageInfo) => {
    // Skip if keyword count is 0 (not implemented yet), unless it's the custom keywords pack
    if (
      packageInfo.keywordCount === 0 &&
      packageInfo.id !== PREMIUM_PACKAGES.CUSTOM_KEYWORDS
    ) {
      Alert.alert(
        t("store.comingSoon"),
        t("store.comingSoonMsg", { name: packageInfo.name }),
        [{ text: t("common.confirm") || "OK" }],
      );
      return;
    }

    // Simulate purchase
    Alert.alert(
      t("store.unlockPackage"),
      t("store.unlockConfirm", {
        name: packageInfo.name,
        price: packageInfo.price,
      }),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("store.unlockNow"),
          onPress: () => {
            try {
              // If unlocking Ultimate Pack, unlock all premium packs
              if (packageInfo.id === PREMIUM_PACKAGES.ULTIMATE) {
                unlockPackage(
                  PREMIUM_PACKAGES.ADVANCED,
                  PACKAGE_NAMES[PREMIUM_PACKAGES.ADVANCED],
                );
                unlockPackage(
                  PREMIUM_PACKAGES.CULTURE,
                  PACKAGE_NAMES[PREMIUM_PACKAGES.CULTURE],
                );
                unlockPackage(
                  PREMIUM_PACKAGES.SCIENCE,
                  PACKAGE_NAMES[PREMIUM_PACKAGES.SCIENCE],
                );
                unlockPackage(
                  PREMIUM_PACKAGES.ENTERTAINMENT,
                  PACKAGE_NAMES[PREMIUM_PACKAGES.ENTERTAINMENT],
                );
                unlockPackage(packageInfo.id, packageInfo.name);
              } else {
                unlockPackage(packageInfo.id, packageInfo.name);
              }

              Alert.alert(
                t("store.successUnlock"),
                t("store.successUnlockMsg", { name: packageInfo.name }),
              );
              loadData();
            } catch (error) {
              Alert.alert(t("common.error"), t("store.failedUnlock"));
            }
          },
        },
      ],
    );
  };

  const isUnlocked = (packageId: string) =>
    unlockedPackages.includes(packageId);

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
                        label={
                          pkg.keywordCount === 0 &&
                          pkg.id !== PREMIUM_PACKAGES.CUSTOM_KEYWORDS
                            ? t("store.comingSoon")
                            : t("store.unlockNow")
                        }
                        variant="primary"
                        size="small"
                        icon={
                          pkg.keywordCount === 0 &&
                          pkg.id !== PREMIUM_PACKAGES.CUSTOM_KEYWORDS
                            ? "time"
                            : "lock-open"
                        }
                        onPress={() => handleUnlock(pkg)}
                        disabled={
                          pkg.keywordCount === 0 &&
                          pkg.id !== PREMIUM_PACKAGES.CUSTOM_KEYWORDS
                        }
                        className={
                          pkg.keywordCount === 0 &&
                          pkg.id !== PREMIUM_PACKAGES.CUSTOM_KEYWORDS
                            ? "opacity-50"
                            : ""
                        }
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

          {/* Info Card */}
          <Card variant="secondary" className="mb-32 -rotate-1">
            <View className="flex-row items-start gap-3">
              <Ionicons name="information-circle" size={24} color="#5b5300" />
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
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Navigation - Fixed at bottom */}
      <BottomNavigation />
    </View>
  );
};

export default StoreScreen;
