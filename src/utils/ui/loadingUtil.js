import store from '@/store';

/** 로딩 레이어를 표출한다. */
export function startLoading() {
  store.commit('Loading/SET_IS_LOADING', true, { root: true });
}

/** 로딩 레이어를 삭제한다. */
export function stopLoading() {
  store.commit('Loading/SET_IS_LOADING', false, { root: true });
}
