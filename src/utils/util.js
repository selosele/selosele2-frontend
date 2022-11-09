// 값이 비었는지 확인
export const isEmpty = (value) => {
  return null === value || undefined === value || '' === value;
};

// 값이 있는지 확인
export const isNotEmpty = (value) => {
  return !isEmpty(value);
};

// 값을 1개라도 포함하는지 확인
export const isIn = (target, ...values) => {
  return values.some(v => v === target);
};
