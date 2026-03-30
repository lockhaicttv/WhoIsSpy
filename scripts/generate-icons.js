/**
 * Icon Generation Script for "The Last Signal"
 * 
 * Usage:
 *   1. Save the app icon image as: assets/images/app-icon-source.png
 *   2. Run: node scripts/generate-icons.js
 * 
 * This script generates all required icon sizes from a single source image.
 * Requires: sharp (install with `npm install --save-dev sharp`)
 */

const fs = require('fs');
const path = require('path');

async function generateIcons() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.log('sharp is not installed. Installing...');
    const { execSync } = require('child_process');
    execSync('npm install --save-dev sharp', { stdio: 'inherit' });
    sharp = require('sharp');
  }

  const sourceImage = path.join(__dirname, '..', 'assets', 'images', 'app-icon-source.png');
  
  if (!fs.existsSync(sourceImage)) {
    console.error('❌ Source image not found!');
    console.error(`   Please save your icon image as: ${sourceImage}`);
    process.exit(1);
  }

  const outputDir = path.join(__dirname, '..', 'assets', 'images');

  const icons = [
    { name: 'icon.png', size: 1024 },
    { name: 'favicon.png', size: 48 },
    { name: 'splash-icon.png', size: 288 },
    { name: 'android-icon-foreground.png', size: 432 },
  ];

  console.log('🎨 Generating icons for "The Last Signal"...\n');

  for (const icon of icons) {
    const outputPath = path.join(outputDir, icon.name);
    await sharp(sourceImage)
      .resize(icon.size, icon.size, { fit: 'cover' })
      .png()
      .toFile(outputPath);
    console.log(`  ✅ ${icon.name} (${icon.size}x${icon.size})`);
  }

  console.log('\n🎉 All icons generated successfully!');
  console.log('   Run `npx expo prebuild --clean` to apply changes to native projects.');
}

generateIcons().catch(console.error);
