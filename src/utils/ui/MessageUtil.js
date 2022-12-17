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

  /** Alert 성공 타입 */
  alertSuccess(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: msg,
				icon: 'success',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Alert 오류 타입 */
  alertError(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: msg,
				icon: 'error',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Alert 경고 타입 */
  alertWarning(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: msg,
				icon: 'warning',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Alert 정보 타입 */
  alertInfo(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: msg,
				icon: 'info',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Alert 질문 타입 */
  alertQuestion(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: msg,
				icon: 'question',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Confirm 성공 타입 */
  confirmSuccess(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: msg,
				icon: 'success',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Confirm 오류 타입 */
  confirmError(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: msg,
				icon: 'error',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Confirm 경고 타입 */
  confirmWarning(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: msg,
				icon: 'warning',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Confirm 정보 타입 */
  confirmInfo(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: msg,
				icon: 'info',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Confirm 질문 타입 */
  confirmQuestion(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: msg,
				icon: 'question',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Toast 성공 타입 */
  toastSuccess(msg) {
    this._toast.fire({
      icon: 'success',
      title: msg,
    });
  }

  /** Toast 오류 타입 */
  toastError(msg) {
    this._toast.fire({
      icon: 'error',
      title: msg,
    });
  }

  /** Toast 경고 타입 */
  toastWarning(msg) {
    this._toast.fire({
      icon: 'warning',
      title: msg,
    });
  }

  /** Toast 정보 타입 */
  toastInfo(msg) {
    this._toast.fire({
      icon: 'info',
      title: msg,
    });
  }

  /** Toast 질문 타입 */
  toastQuestion(msg) {
    this._toast.fire({
      icon: 'question',
      title: msg,
    });
  }
	
}

export const messageUtil = new MessageUtil();
