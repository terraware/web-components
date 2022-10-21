# https://amzn.github.io/style-dictionary

rm -r src/style-dictionary-dist/*
rm -r style-dictionary/json
mkdir -p style-dictionary/json/system
mkdir -p style-dictionary/json/navbar
mkdir -p style-dictionary/json/button
mkdir -p style-dictionary/json/textfield
mkdir -p style-dictionary/json/progressCircle
mkdir -p style-dictionary/json/dialogBox
mkdir -p style-dictionary/json/message

cd style-dictionary
echo "Downloading json"
node download-json.js
echo
echo "Building style dictionary"
node build.js
echo
echo "Building theme"
node build-theme.js
