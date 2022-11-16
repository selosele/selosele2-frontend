import Swal from 'sweetalert2';

/**
 * 메시지 유틸
 */
class MessageUtil {

  _alert = null;
  _confirm = null;
  _toast = null;

  constructor() {
    this._alert = Swal.mixin({});

    this._confirm = Swal.mixin({
			showCancelButton: true,
			confirmButtonText: '예',
			cancelButtonText: '아니오',
		});

    this._toast = Swal.mixin({
      toast: true,
      width: 450,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
    });
  }

  // Alert
  alertSuccess(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: msg,
				icon: 'success',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  alertError(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: msg,
				icon: 'error',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  alertWarning(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: msg,
				icon: 'warning',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  alertInfo(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: msg,
				icon: 'info',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  question(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: msg,
				icon: 'question',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  // Confirm
  confirmSuccess(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: msg,
				icon: 'success',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  confirmError(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: msg,
				icon: 'error',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  confirmWarning(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: msg,
				icon: 'warning',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  confirmInfo(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: msg,
				icon: 'info',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  confirmQuestion(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: msg,
				icon: 'question',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  // Toast
  toastSuccess(msg) {
    this._toast.fire({
      icon: 'success',
      title: msg,
    });
  }

  toastError(msg) {
    this._toast.fire({
      icon: 'error',
      title: msg,
    });
  }

  toastWarning(msg) {
    this._toast.fire({
      icon: 'warning',
      title: msg,
    });
  }

  toastInfo(msg) {
    this._toast.fire({
      icon: 'info',
      title: msg,
    });
  }

  toastQuestion(msg) {
    this._toast.fire({
      icon: 'question',
      title: msg,
    });
  }
	
}

const messageUtil = new MessageUtil();

export default messageUtil;
