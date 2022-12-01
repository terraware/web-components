# https://amzn.github.io/style-dictionary

rm -r src/style-dictionary-dist2/*
rm -r style-dictionary2/json
mkdir -p style-dictionary2/json/

cd style-dictionary2
echo "Downloading json"
node download-json.js
echo
echo "Building style dictionary"
node build.js
echo
echo "Building theme"
node build-theme.mjs
