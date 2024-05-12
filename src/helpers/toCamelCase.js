/** @format */

export function toCamelCase(inputString) {
  return inputString.replace(
    /(?:^\w|[A-Z]|\b\w|\s+)/g,
    function (match, index) {
      if (+match === 0) return "";
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    }
  );
}
