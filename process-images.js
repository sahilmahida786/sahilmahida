/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = 'c:\\Sahil.OS\\public\\images\\projects\\seo-gpb';
const outputDir = inputDir; // same dir

async function processImages() {
  try {
    const files = fs.readdirSync(inputDir);
    let counter = 1;
    
    for (const file of files) {
      if (file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.png')) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, `seo-gpb-feature-${counter}.webp`);
        
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
          
        console.log(`Converted ${file} to seo-gpb-feature-${counter}.webp`);
        fs.unlinkSync(inputPath); // remove original
        counter++;
      }
    }
    
    console.log('All images processed successfully.');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages();
