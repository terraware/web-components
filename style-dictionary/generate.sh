# https://amzn.github.io/style-dictionary

rm -r style-dictionary-dist
mkdir style-dictionary-dist

cd style-dictionary/system
curl https://terraformation.zeroheight.com/api/token_file/59958aac0858/share > colors.json
node build.js

cd ../button
curl https://terraformation.zeroheight.com/api/token_file/cb5cd890ddf4/share > typography.json
curl https://terraformation.zeroheight.com/api/token_file/2f90d49d4334/share > productive-colors.json
curl https://terraformation.zeroheight.com/api/token_file/5e072293caf0/share > passive-colors.json
curl https://terraformation.zeroheight.com/api/token_file/a170e0886291/share > destructive-colors.json
curl https://terraformation.zeroheight.com/api/token_file/cfb0cfaf26bf/share > size.json
node build.js
