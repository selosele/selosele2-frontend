/** 인증·인가 Service */
class AuthService {

  constructor() {
  }

  /** JWT에서 사용자 정보 추출 */
  getUser() {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return null;
    }

    return JSON.parse(atob(accessToken.split('.')[1]));
  }

  /** JWT 가져오기 */
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  /** 1개의 권한 확인 */
  hasRole(role) {
    const user = this.getUser();

    for (const { roleId } of user.userRole) {
      return role === roleId;
    }
    
    return false;
  }

  /** 모든 권한이 있는지 확인 */
  hasRoleAll(...roles) {
    const user = this.getUser();

    return roles.every(v => user.userRole.filter(r => r.roleId === v).length > 0);
  }

  /** 권한이 1개라도 있는지 확인 */
  hasRoleOr(...roles) {
    const user = this.getUser();

    return roles.some(v => user.userRole.filter(r => r.roleId === v).length > 0);
  }
  
}

export const authService = new AuthService();
