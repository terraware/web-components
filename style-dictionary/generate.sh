# https://amzn.github.io/style-dictionary

rm -r src/style-dictionary-dist/*
rm -r style-dictionary/json
mkdir -p style-dictionary/json/

cd style-dictionary
echo "Downloading json"
node download-json.js
echo
echo "Building style dictionary"
node build.js
echo
echo "Building theme"
node build-theme.mjs
