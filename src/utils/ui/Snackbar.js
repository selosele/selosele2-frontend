import Swal from 'sweetalert2';

/**
 * Snackbar 유틸
 */
class Snackbar {
  snackbar = null;

  constructor() {
    this.snackbar = Swal.mixin({
      toast: true,
      width: 400,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
    });
  }

  success(msg) {
    this.snackbar.fire({
      icon: 'success',
      title: msg
    });
  }

  error(msg) {
    this.snackbar.fire({
      icon: 'error',
      title: msg
    });
  }

  warning(msg) {
    this.snackbar.fire({
      icon: 'warning',
      title: msg
    });
  }

  info(msg) {
    this.snackbar.fire({
      icon: 'info',
      title: msg
    });
  }

  question(msg) {
    this.snackbar.fire({
      icon: 'question',
      title: msg
    });
  }
}

const snackbar = new Snackbar();

export default snackbar;
