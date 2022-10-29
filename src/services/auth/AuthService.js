/**
 * 권한 Service
 */
class AuthService {
  user = null;
  
  constructor() {
    this.user = this.getUser();
  }

  // JWT로부터 사용자 정보 받아오기
  getUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return JSON.parse(atob(token.split('.')[1]));
  }

  // 1개의 권한 확인
  hasRole(role) {
    for (const { roleId } of this.user.userRole) {
      return role === roleId;
    }
    return false;
  }

  // 모든 권한이 있는지 확인
  hasRoleAll(...roles) {
    return roles.every(v => this.user.userRole.filter(r => r.roleId === v).length > 0);
  }

  // 권한 1개라도 있는지 확인
  hasRoleOr(...roles) {
    return roles.some(v => this.user.userRole.filter(r => r.roleId === v).length > 0);
  }
  
}

const authService = new AuthService();

export default authService;
