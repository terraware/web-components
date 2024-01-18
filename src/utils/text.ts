const isWhitespaces = (str: string) => str.match(/^\s+$/);

export const titleCase = (str: string) =>
        str.toLowerCase().split(' ').map((word) =>
        word.replace(word.charAt(0), word.charAt(0).toUpperCase()))
        .join(' ');

export default isWhitespaces;
