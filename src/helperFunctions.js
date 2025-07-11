export function getObjectKeys(obj, excludeKey = 'id') {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return [];
  }
  return Object.keys(obj).filter((key) => key !== excludeKey);
}
export function toISODate(dateStr) {
  // dateStr: "01/01/1990"
  if (!dateStr) return '';
  const [day, month, year] = dateStr.split('/');
  if (!day || !month || !year) return '';
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

export function fromISODate(isoStr) {
  // isoStr: "1990-01-01"
  if (!isoStr) return '';
  const [year, month, day] = isoStr.split('-');
  if (!year || !month || !day) return '';
  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
}
