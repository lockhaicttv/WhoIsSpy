/**
 * In-App Purchase Service
 * Handles Google Play Billing integration for premium keyword packages
 */

import { Platform } from 'react-native';
import * as RNIap from 'react-native-iap';
import { PREMIUM_PACKAGES } from '../constants/defaultKeywords';

// Product IDs must match those configured in Google Play Console
export const PRODUCT_IDS = {
  ADVANCED: 'advanced_pack',
  CULTURE: 'culture_pack',
  SCIENCE: 'science_pack',
  ENTERTAINMENT: 'entertainment_pack',
  ULTIMATE: 'ultimate_pack',
  CUSTOM_KEYWORDS: 'custom_keywords_pack',
};

// Map product IDs to package IDs
export const PRODUCT_TO_PACKAGE_MAP: Record<string, string> = {
  [PRODUCT_IDS.ADVANCED]: PREMIUM_PACKAGES.ADVANCED,
  [PRODUCT_IDS.CULTURE]: PREMIUM_PACKAGES.CULTURE,
  [PRODUCT_IDS.SCIENCE]: PREMIUM_PACKAGES.SCIENCE,
  [PRODUCT_IDS.ENTERTAINMENT]: PREMIUM_PACKAGES.ENTERTAINMENT,
  [PRODUCT_IDS.ULTIMATE]: PREMIUM_PACKAGES.ULTIMATE,
  [PRODUCT_IDS.CUSTOM_KEYWORDS]: PREMIUM_PACKAGES.CUSTOM_KEYWORDS,
};

let isIapConnected = false;

/**
 * Initialize IAP connection
 * Must be called before any purchase operations
 */
export const initializeIAP = async (): Promise<boolean> => {
  try {
    if (isIapConnected) return true;

    // Only initialize on Android (iOS requires different setup)
    if (Platform.OS !== 'android') {
      console.log('IAP: Not on Android, skipping initialization');
      return false;
    }

    await RNIap.initConnection();
    isIapConnected = true;
    console.log('✅ IAP connection initialized');

    // Get available purchases on startup to restore previous purchases
    await restorePurchases();

    return true;
  } catch (error) {
    console.error('❌ Failed to initialize IAP:', error);
    return false;
  }
};

/**
 * End IAP connection
 * Should be called when app is closing
 */
export const endIAPConnection = async (): Promise<void> => {
  try {
    if (!isIapConnected) return;
    await RNIap.endConnection();
    isIapConnected = false;
    console.log('✅ IAP connection ended');
  } catch (error) {
    console.error('❌ Failed to end IAP connection:', error);
  }
};

/**
 * Get available products from Google Play Store
 */
export const getProducts = async (): Promise<RNIap.Product[]> => {
  try {
    if (!isIapConnected) {
      const initialized = await initializeIAP();
      if (!initialized) return [];
    }

    const productIds = Object.values(PRODUCT_IDS);
    const products = await RNIap.getProducts({ skus: productIds });

    console.log('✅ Retrieved products:', products.length);
    return products;
  } catch (error) {
    console.error('❌ Failed to get products:', error);
    return [];
  }
};

/**
 * Request a purchase for a product
 * @param productId - The product ID to purchase (e.g., 'advanced_pack')
 * @returns Purchase info if successful, null otherwise
 */
export const requestPurchase = async (
  productId: string
): Promise<RNIap.Purchase | null> => {
  try {
    if (!isIapConnected) {
      const initialized = await initializeIAP();
      if (!initialized) {
        throw new Error('IAP not available');
      }
    }

    console.log(`🛒 Requesting purchase for: ${productId}`);

    // Request purchase - returns array on Android
    const purchase = await RNIap.requestPurchase({ skus: [productId] });

    // Handle single purchase or array response
    const singlePurchase = Array.isArray(purchase) ? purchase[0] : purchase;

    console.log('✅ Purchase successful:', singlePurchase);
    return singlePurchase || null;
  } catch (error: any) {
    // User cancelled
    if (error.code === RNIap.ErrorCode.UserCancelled) {
      console.log('ℹ️ User cancelled purchase');
      return null;
    }

    console.error('❌ Purchase failed:', error);
    throw error;
  }
};

/**
 * Acknowledge a purchase (required by Google Play)
 * Must be called after successful purchase to complete transaction
 */
export const acknowledgePurchase = async (
  purchaseToken: string
): Promise<void> => {
  try {
    await RNIap.acknowledgePurchaseAndroid({ token: purchaseToken });
    console.log('✅ Purchase acknowledged:', purchaseToken);
  } catch (error) {
    console.error('❌ Failed to acknowledge purchase:', error);
    throw error;
  }
};

/**
 * Restore previous purchases
 * Called on app startup and when user clicks "Restore Purchases"
 * @returns List of purchased product IDs
 */
export const restorePurchases = async (): Promise<string[]> => {
  try {
    if (!isIapConnected) {
      const initialized = await initializeIAP();
      if (!initialized) return [];
    }

    // Get available purchases (already owned by user)
    const purchases = await RNIap.getAvailablePurchases();

    console.log(`✅ Restored ${purchases.length} purchases`);

    // Extract product IDs from purchases
    const productIds = purchases.map((purchase) => purchase.productId);

    return productIds;
  } catch (error) {
    console.error('❌ Failed to restore purchases:', error);
    return [];
  }
};

/**
 * Check if a product is purchased
 * @param productId - Product ID to check
 */
export const isPurchased = async (productId: string): Promise<boolean> => {
  try {
    const purchasedProducts = await restorePurchases();
    return purchasedProducts.includes(productId);
  } catch (error) {
    console.error('❌ Failed to check purchase status:', error);
    return false;
  }
};

/**
 * Get localized price for a product
 * @param productId - Product ID
 * @returns Formatted price string (e.g., "$2.99")
 */
export const getProductPrice = async (productId: string): Promise<string | null> => {
  try {
    const products = await getProducts();
    const product = products.find((p) => p.productId === productId);

    if (product) {
      // Use localizedPrice which includes currency symbol
      return product.localizedPrice;
    }

    return null;
  } catch (error) {
    console.error('❌ Failed to get product price:', error);
    return null;
  }
};

/**
 * Listen for purchase updates
 * Should be set up when component mounts
 */
export const setupPurchaseListener = (
  onPurchaseUpdate: (purchase: RNIap.Purchase) => void,
  onPurchaseError: (error: RNIap.PurchaseError) => void
): (() => void) => {
  // Listen for successful purchases
  const purchaseUpdateSubscription = RNIap.purchaseUpdatedListener((purchase) => {
    console.log('📦 Purchase update:', purchase);
    onPurchaseUpdate(purchase);
  });

  // Listen for purchase errors
  const purchaseErrorSubscription = RNIap.purchaseErrorListener((error) => {
    console.warn('⚠️ Purchase error:', error);
    onPurchaseError(error);
  });

  // Return cleanup function
  return () => {
    purchaseUpdateSubscription.remove();
    purchaseErrorSubscription.remove();
  };
};

/**
 * Finish a transaction (for consumables or after processing)
 * For non-consumable products, use acknowledgePurchase instead
 */
export const finishTransaction = async (
  purchase: RNIap.Purchase
): Promise<void> => {
  try {
    await RNIap.finishTransaction({ purchase, isConsumable: false });
    console.log('✅ Transaction finished');
  } catch (error) {
    console.error('❌ Failed to finish transaction:', error);
  }
};
