/** 값이 비었는지 확인 */
export const isEmpty = (value) => {
  return null === value || undefined === value || '' === value;
};

/** 값이 있는지 확인 */
export const isNotEmpty = (value) => {
  return !isEmpty(value);
};

/** 문자열 값이 비었는지 확인 */
export const isBlank = (value) => {
  return isEmpty(value) || 0 === value.trim().length;
};

/** 문자열 값이 있는지 확인 */
export const isNotBlank = (value) => {
  return !isBlank(value);
};

/** 값을 1개라도 포함하는지 확인 */
export const isIn = (target, ...values) => {
  return values.some(v => v === target);
};

/** 값이 배열인지 확인 */
export const isArray = (value) => {
  return Array.isArray(value);
};

/** 파일 용량 구하기 */
export const getFileSize = (bytes, decimals = 2) => {
  if (0 === bytes) {
    return '0 Byte';
  }

  const k = 1000;
  const dm = decimals;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
