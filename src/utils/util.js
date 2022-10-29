// 값을 1개라도 포함하는지 확인
export const isIn = (target, ...values) => {
  return values.some(v => v === target);
};
