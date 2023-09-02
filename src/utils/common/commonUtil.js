/** 값이 비었는지 확인 */
export function isEmpty(value) {
  return null === value || undefined === value || '' === value;
}

/** 값이 있는지 확인 */
export function isNotEmpty(value) {
  return !isEmpty(value);
}

/** 문자열 값이 비었는지 확인 */
export function isBlank(value) {
  return isEmpty(value) || 0 === value.trim().length;
}

/** 문자열 값이 있는지 확인 */
export function isNotBlank(value) {
  return !isBlank(value);
}

/** 값을 1개라도 포함하는지 확인 */
export function isIn(target, ...value) {
  return value.some(v => v === target);
}

/** 값이 배열인지 확인 */
export function isArray(value) {
  return Array.isArray(value);
}

/** 배열에 중복된 값이 있는지 확인 (객체 배열은 사용 불가) */
export function arrayHasDuplicateValue(value) {
  const setCollection = new Set(value.map(d => d.trim()));
  
  return setCollection.size < value.map(d => d.trim).length;
}

/** 파일 용량 구하기 */
export function getFileSize(bytes, decimals = 2) {
  if (0 === bytes) {
    return '0 Byte';
  }

  const k = 1000;
  const dm = decimals;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/** form values -> JSON 변환 */
export function getFormValues(form) {
  return Object.fromEntries(new FormData(form));
}
