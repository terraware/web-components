const isWhitespaces = (str: string) => str.match(/^\s+$/);

export const titleCase = (str: string) =>
        str.split(' ').map((word) => {
                if(word !== word.toUpperCase()){
                        let lowerCaseWord = word.toLowerCase();
                        return(lowerCaseWord.replace(lowerCaseWord.charAt(0), lowerCaseWord.charAt(0).toUpperCase()));
                }
                else{
                        return(word);
                }
        }).join(' ');

export default isWhitespaces;
