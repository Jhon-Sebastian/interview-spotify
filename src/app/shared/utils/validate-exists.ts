export function validateExists(object: Object) {
  const exists = object !== undefined && object !== null;
  if (Array.isArray(object)) {
    return exists && object.length > 0;
  }
  if (typeof object === 'string') {
    return exists && object !== '';
  }
  return exists;
}
