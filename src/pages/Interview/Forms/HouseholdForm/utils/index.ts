export const parseData = () => { };
const validateCheckbox = (checkArray: string[]): string[] | boolean => Array.isArray(checkArray) && checkArray.length === 0 ? false : checkArray;
