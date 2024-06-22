/** 스로틀링 스크롤 이벤트 타입 */
export const THROTTLE_SCROLL_EVENT_TYPE = 'optimizedScroll';

/** 주어진 이벤트를 스로틀링하여 이벤트 핸들러가 애니메이션 프레임당 한 번만 실행되도록 한다. */
export function throttle(type, name, obj = window) {
  let running = false;
  const func = function() {
    if (running) return;
    running = true;
    requestAnimationFrame(function() {
      obj.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  };
  obj.addEventListener(type, func);
}
