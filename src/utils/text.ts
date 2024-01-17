const isWhitespaces = (str: string) => str.match(/^\s+$/);

export const titleCase = (str: string) => {
    if(str.length){
        return str.toLowerCase().split(' ').map(function(word) {
        return word.replace(word[0], word[0].toUpperCase());
        }).join(' ');
    }
    return(str);
  }

export default isWhitespaces;
