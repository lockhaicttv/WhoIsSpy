# Google Play In-App Purchase Setup Guide

This guide will help you set up in-app purchases for The Last Signal on Google Play Console.

## Prerequisites
- Google Play Console access
- App uploaded to closed testing track
- react-native-iap package installed ✅

## Step 1: Configure In-App Products

### 1.1 Go to Google Play Console
1. Navigate to [Google Play Console](https://play.google.com/console)
2. Select your app: **The Last Signal** (`com.lockhaicttv.thelastsignal`)
3. In the left sidebar, go to **Monetize > Products > In-app products**

### 1.2 Create Each Product

You need to create **6 in-app products**. For each product:

#### Product 1: Advanced Pack
- Click **Create product**
- **Product ID**: `advanced_pack` ⚠️ (Must match exactly!)
- **Name**: Advanced Pack
- **Description**: Challenging keywords for experienced players. Unlock 200 premium keywords.
- **Status**: Active
- **Price**: $2.99 USD
- Click **Save**

#### Product 2: Culture Pack
- **Product ID**: `culture_pack`
- **Name**: Culture Pack
- **Description**: Historical figures, landmarks, and cultural terms. Unlock 250 premium keywords.
- **Price**: $2.99 USD

#### Product 3: Science Pack
- **Product ID**: `science_pack`
- **Name**: Science Pack
- **Description**: Science, math, astronomy, and educational keywords. Unlock 200 premium keywords.
- **Price**: $2.99 USD

#### Product 4: Entertainment Pack
- **Product ID**: `entertainment_pack`
- **Name**: Entertainment Pack
- **Description**: Movies, TV shows, games, music, and pop culture. Unlock 300 premium keywords.
- **Price**: $3.99 USD

#### Product 5: Ultimate Pack
- **Product ID**: `ultimate_pack`
- **Name**: Ultimate Pack
- **Description**: Get ALL premium packs (950 keywords) at best value! Includes Advanced, Culture, Science, and Entertainment packs.
- **Price**: $9.99 USD

#### Product 6: Custom Keywords Pack
- **Product ID**: `custom_keywords_pack`
- **Name**: Custom Keywords Pack
- **Description**: Import unlimited custom keyword pairs from Excel files. Create your own game content!
- **Price**: $6.99 USD

---

## Step 2: Add License Testers

During closed testing, you need to add testers who can make free test purchases.

### 2.1 Add License Testers
1. In Google Play Console, go to **Setup > License testing**
2. Click **Add license testers**
3. Add Gmail accounts (one per line):
   ```
   your.email@gmail.com
   tester1@gmail.com
   tester2@gmail.com
   ```
4. **License response**: Select **RESPOND_NORMALLY**
5. Click **Save changes**

### 2.2 Important Notes for Testers
- Testers MUST use the exact Gmail account added to the license testing list
- Testers MUST join your closed testing track first
- Test purchases are FREE for license testers
- Test purchases work exactly like real purchases but don't charge money

---

## Step 3: Build and Deploy

Now that IAP is implemented, you need to build a new version:

```bash
# Build production Android app bundle
eas build --platform android --profile production

# After build completes, submit to Google Play
eas submit --platform android --latest
```

---

## Step 4: Test Purchases (Closed Testing)

### 4.1 For Testers:
1. Make sure you're added to license testing list
2. Join the closed testing track
3. Download and install the app
4. Go to the Store tab
5. Tap any "Unlock Now" button
6. Complete the purchase flow (it's FREE for testers!)
7. Verify the package is unlocked

### 4.2 Verify Purchase Functionality:
- Purchase flow opens Google Play Billing sheet
- Purchase completes successfully
- Package unlocks in the app
- Keywords become available
- "Restore Purchases" button works

---

## Step 5: Handle Common Issues

### Issue: "Product not found"
**Solution**: Make sure:
- Product IDs match exactly (check `services/iapService.ts`)
- Products are set to "Active" in Play Console
- App version in closed testing matches the build
- Wait 2-4 hours after creating products (Google needs time to propagate)

### Issue: "This version of the application is not configured for billing"
**Solution**:
- Upload an APK/AAB to closed testing first
- Products must be created BEFORE the APK that uses them
- Rebuild and resubmit if products were added after upload

### Issue: Tester can't make purchases
**Solution**:
- Verify tester email is added to License testing
- Tester must be signed in with that exact Gmail account
- Tester must join closed testing track
- Wait 1-2 hours after adding to license list

---

## Step 6: Resubmit to Google Play

After setting up IAP:

1. **Build new version**:
   ```bash
   eas build --platform android --profile production
   ```

2. **Submit to closed testing**:
   ```bash
   eas submit --platform android --latest
   ```

3. **Update store listing** (if needed):
   - Add privacy policy URL (REQUIRED for apps with IAP)
   - Update screenshots if they show the store
   - Complete Data Safety section

4. **Wait for review**: Usually 1-3 days for closed testing updates

---

## Checklist Before Resubmission

- [x] react-native-iap installed
- [x] IAP service created (`services/iapService.ts`)
- [x] StoreScreen updated to use Google Play Billing
- [ ] 6 in-app products created in Play Console with correct IDs
- [ ] License testers added
- [ ] Privacy policy URL added to Play Console
- [ ] Data Safety section completed
- [ ] New build uploaded to closed testing
- [ ] Tested with at least one license tester

---

## Product ID Reference

| Package Name | Product ID | Price |
|-------------|------------|-------|
| Advanced Pack | `advanced_pack` | $2.99 |
| Culture Pack | `culture_pack` | $2.99 |
| Science Pack | `science_pack` | $2.99 |
| Entertainment Pack | `entertainment_pack` | $3.99 |
| Ultimate Pack | `ultimate_pack` | $9.99 |
| Custom Keywords | `custom_keywords_pack` | $6.99 |

⚠️ **CRITICAL**: Product IDs must match exactly! They are defined in `/services/iapService.ts`

---

## Testing Commands

```bash
# Build for testing
eas build --platform android --profile production

# Submit to closed testing
eas submit --platform android --latest

# Check build status
eas build:list

# View logs
npx expo start
```

---

## Support

If you encounter issues:
1. Check the [react-native-iap documentation](https://github.com/dooboolab-community/react-native-iap)
2. Review Google Play Console help for IAP setup
3. Verify all product IDs match between code and Play Console
4. Wait 2-4 hours after creating products

---

## Next Steps

1. ✅ Create all 6 in-app products in Google Play Console
2. ✅ Add license testers
3. ✅ Add privacy policy URL
4. ✅ Complete Data Safety section  
5. ✅ Build new version with `eas build`
6. ✅ Submit to closed testing
7. ✅ Test purchases with license testers
8. ✅ Fix any issues found during testing
9. ✅ Promote to production when ready!
