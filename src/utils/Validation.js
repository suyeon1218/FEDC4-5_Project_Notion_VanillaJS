export const checkRoutValidation = (pathname, currDocument) => {
  if (pathname.startsWith('/') === false) {
    return false;
  }
  if (currDocument === null) {
    return false;
  }

  return true;
}