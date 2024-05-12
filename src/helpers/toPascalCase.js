/** @format */

function toPascalCaseByWord(inputString) {
  return inputString.replace(/\b\w/g, (match) => match.toUpperCase());
}

export { toPascalCaseByWord };
