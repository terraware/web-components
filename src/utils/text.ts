const isWhitespaces = (str: string) => str.match(/^\s+$/);

export const titleCase = (str: string) => {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

export default isWhitespaces;
