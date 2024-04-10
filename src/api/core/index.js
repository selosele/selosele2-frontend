import { isNotBlank, messageUtil } from '@/utils';
import store from '@/store';
import router from '@/routes';
import axios from 'axios';

const http = axios.create({
  baseURL: '/api',
  headers: {
    'Cache-Control': 'no-cache',
  }
});

http.interceptors.request.use(
  config => {

    /** 액세스 토큰 */
    const accessToken = window.localStorage.getItem('accessToken');

    if (isNotBlank(accessToken)) {
      config.headers['Authorization']= `Bearer ${accessToken}`;
      store.commit('Auth/SET_ACCESS_TOKEN', accessToken);
    }

    if (store.state.Loading.useLoading && !store.state.Loading.isInitialLoading) {
      store.commit('Loading/SET_IS_LOADING', false);
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;

http.interceptors.response.use(
  response => {
    if (store.state.Loading.useLoading && !store.state.Loading.isInitialLoading) {
      store.commit('Loading/SET_IS_LOADING', true);
    }

    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (!store.state.Loading.isInitialLoading) {
      store.commit('Loading/SET_IS_LOADING', true);
    }

    if (isNotBlank(error?.response?.data?.type) && 'biz' === error?.response?.data?.type) {
      // 비즈니스 로직 예외 처리
      messageUtil.toastError(error.response.data?.message);
    } else {
      // JWT 만료 시 오류 발생 메시지는 사용자 입장에서 '조용한 갱신'이라고 느껴지지 않음
      //messageUtil.toastError('오류가 발생했습니다.');
    }

    // 권한 오류 및 JWT 만료 시
    if (401 === error?.response?.status && !originalRequest._retry) {
      if (!isRefreshing) {
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { data } = await http.post('/auth/refresh');
          const newAccessToken = data.accessToken;
          
          store.commit('Auth/SET_ACCESS_TOKEN', newAccessToken);
      
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          originalRequest._retry = false;
          isRefreshing = false;

          return http(originalRequest); // try~catch 블록 바깥에서 return을 하면 HTTP 요청 순서가 꼬이게 됨
        } catch (error) {
          console.error('Error refreshing access token:', error);
          
          // 강제 로그아웃
          store.dispatch('Auth/LOGOUT');
          
          return Promise.reject(error);
        }
      }
    }

    // 404 오류
    if (404 === error?.response?.status) {
      router.push('/error');
    }

    return Promise.reject(error);
  }
);

export { http };
