export function getObjectKeys(obj, excludeKey = 'id') {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return [];
  }
  return Object.keys(obj).filter((key) => key !== excludeKey);
}
