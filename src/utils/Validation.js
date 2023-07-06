export const checkRouteValidation = (pathname, currDocument) => {
  if (pathname.startsWith('/documents') === false) {
    return false;
  }
  if (currDocument === null) {
    return false;
  }

  return true;
}