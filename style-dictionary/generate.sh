# https://amzn.github.io/style-dictionary

rm -r style-dictionary-dist
mkdir style-dictionary-dist
rm -r style-dictionary/json
mkdir -p style-dictionary/json/system
mkdir -p style-dictionary/json/button

cd style-dictionary
curl https://terraformation.zeroheight.com/api/token_file/59958aac0858/share > json/system/colors.json
curl https://terraformation.zeroheight.com/api/token_file/cb5cd890ddf4/share > json/button/typography.json
curl https://terraformation.zeroheight.com/api/token_file/2f90d49d4334/share > json/button/productive-colors.json
curl https://terraformation.zeroheight.com/api/token_file/5e072293caf0/share > json/button/passive-colors.json
curl https://terraformation.zeroheight.com/api/token_file/a170e0886291/share > json/button/destructive-colors.json
curl https://terraformation.zeroheight.com/api/token_file/cfb0cfaf26bf/share > json/button/size.json
node build.js
