/**
 * 권한 Service
 */
class AuthService {
  user = null;

  constructor() {
    this.user = this.getUser();
  }

  // JWT 토큰으로부터 사용자 정보 받아오기
  getUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return JSON.parse(atob(token.split('.')[1]));
  }

  // 1개의 권한 검증
  hasRole(role) {
    for (const r of this.user.roles) {
      return (role === r ? true : false);
    }
    return false;
  }

  // 파라미터의 모든 권한이 있는지 검증
  hasRoleAll(...roles) {
    return roles.filter(d => !this.user.roles.includes(d)).length > 0 ? false : true;
  }

  // 파라미터의 권한 중 1개라도 있는지 검증
  hasRoleOr(...roles) {
    return roles.filter(d => this.user.roles.includes(d)).length > 0 ? true : false;
  }
}

const authService = new AuthService();

export default authService;
