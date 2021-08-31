# https://amzn.github.io/style-dictionary

rm -r style-dictionary-dist
mkdir style-dictionary-dist
rm -r style-dictionary/json
mkdir -p style-dictionary/json/system
mkdir -p style-dictionary/json/button
mkdir -p style-dictionary/json/navbar

cd style-dictionary
curl https://terraformation.zeroheight.com/api/token_file/9e72dacc74ba/share > json/system/colors-neutral.json
curl https://terraformation.zeroheight.com/api/token_file/eea82bea776a/share > json/system/colors-primary.json
curl https://terraformation.zeroheight.com/api/token_file/6314661a280a/share > json/system/colors-secondary.json
curl https://terraformation.zeroheight.com/api/token_file/16bdf3d3fd23/share > json/system/colors-semantic.json
curl https://terraformation.zeroheight.com/api/token_file/4c841c034e3c/share > json/system/typography-color.json
curl https://terraformation.zeroheight.com/api/token_file/383b3df56337/share > json/system/typography-font.json
curl https://terraformation.zeroheight.com/api/token_file/c51547b17edb/share > json/system/typography-composite.json
curl https://terraformation.zeroheight.com/api/token_file/27fbda37a0d5/share > json/system/size-and-space.json
curl https://terraformation.zeroheight.com/api/token_file/e1207808261b/share > json/system/color-iconography.json
curl https://terraformation.zeroheight.com/api/token_file/2adb63d624f6/share > json/system/size-iconography.json
curl https://terraformation.zeroheight.com/api/token_file/381a96fe2ed1/share > json/navbar/navbar-text-composite.json
curl https://terraformation.zeroheight.com/api/token_file/193dc5a8d136/share > json/navbar/color-navbar.json
curl https://terraformation.zeroheight.com/api/token_file/decd4c60f4f9/share > json/navbar/size-navbar.json
curl https://terraformation.zeroheight.com/api/token_file/c4a77df9398c/share > json/navbar/color-divider.json
curl https://terraformation.zeroheight.com/api/token_file/f789865ce7b7/share > json/navbar/size-divider.json
curl https://terraformation.zeroheight.com/api/token_file/bbbf7422d220/share > json/button/button-typography-composite.json
curl https://terraformation.zeroheight.com/api/token_file/2f90d49d4334/share > json/button/color-button.json
curl https://terraformation.zeroheight.com/api/token_file/cfb0cfaf26bf/share > json/button/color-size-and-space-button.json


node build.js
