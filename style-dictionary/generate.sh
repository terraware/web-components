# https://amzn.github.io/style-dictionary

rm -r style-dictionary-dist
mkdir style-dictionary-dist
rm -r style-dictionary/json
mkdir -p style-dictionary/json/system
mkdir -p style-dictionary/json/navbar
mkdir -p style-dictionary/json/button
mkdir -p style-dictionary/json/textfield
mkdir -p style-dictionary/json/progressCircle
mkdir -p style-dictionary/json/dialogBox

cd style-dictionary
curl --parallel --parallel-immediate --parallel-max 8 --config zero-height-files.txt

node build.js
