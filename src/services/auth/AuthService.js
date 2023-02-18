import jwtDecode from 'jwt-decode';

/** 인증·인가 Service */
class AuthService {

  constructor() {
  }

  /** JWT에서 사용자 정보 추출 후 반환 */
  getUser() {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return null;
    }

    return jwtDecode(accessToken);
  }

  /** Access Token 반환 */
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  /** Access Token 세팅 */
  setAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  /** Access Token 제거 */
  removeAccessToken() {
    localStorage.removeItem('accessToken');
  }

  /** 액세스 토큰의 남은 시간을 반환 */
  getAccessTokenRemaningTime() {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return null;
    }

    const decodedToken = jwtDecode(accessToken);
    const expirationTime = decodedToken.exp;

    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTime = expirationTime - currentTime;

    return remainingTime;
  }

  /** 유효한 액세스 토큰인지 확인 */
  isValidAccessToken(time = 0) {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return null;
    }

    const remainingTime = this.getAccessTokenRemaningTime();

    return remainingTime > time;
  }

  /** 1개의 권한 확인 */
  hasRole(role) {
    const user = this.getUser();
    if (!user) return false;

    for (const { roleId } of user.userRole) {
      return role === roleId;
    }
    
    return false;
  }

  /** 모든 권한이 있는지 확인 */
  hasRoleAll(...roles) {
    const user = this.getUser();
    if (!user) return false;

    return roles.every(v => user.userRole.filter(r => r.roleId === v).length > 0);
  }

  /** 권한이 1개라도 있는지 확인 */
  hasRoleOr(...roles) {
    const user = this.getUser();
    if (!user) return false;

    return roles.some(v => user.userRole.filter(r => r.roleId === v).length > 0);
  }

  /** 로그아웃 */
  async logout(store, http, router, e) {
    const res = await store.dispatch('Auth/LOGOUT', http);
        
    if ('ok' === res) {
      router.push({
        path: '/',
        query: { e },
      });
    }
  }
  
}

export const authService = new AuthService();
