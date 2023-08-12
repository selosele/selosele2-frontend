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
  alertSuccess(title, text = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: text,
				icon: 'success',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Alert 오류 타입 */
  alertError(title, text = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: text,
				icon: 'error',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Alert 경고 타입 */
  alertWarning(title, text = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: text,
				icon: 'warning',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Alert 정보 타입 */
  alertInfo(title, text = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: text,
				icon: 'info',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Alert 질문 타입 */
  alertQuestion(title, text = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: text,
				icon: 'question',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Confirm 성공 타입 */
  confirmSuccess(title, text = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: text,
				icon: 'success',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Confirm 오류 타입 */
  confirmError(title, text = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: text,
				icon: 'error',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Confirm 경고 타입 */
  confirmWarning(title, text = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: text,
				icon: 'warning',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Confirm 정보 타입 */
  confirmInfo(title, text = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: text,
				icon: 'info',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Confirm 질문 타입 */
  confirmQuestion(title, text = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: text,
				icon: 'question',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  /** Toast 성공 타입 */
  toastSuccess(title) {
    this._toast.fire({
      icon: 'success',
      title: title,
    });
  }

  /** Toast 오류 타입 */
  toastError(title) {
    this._toast.fire({
      icon: 'error',
      title: title,
    });
  }

  /** Toast 경고 타입 */
  toastWarning(title) {
    this._toast.fire({
      icon: 'warning',
      title: title,
    });
  }

  /** Toast 정보 타입 */
  toastInfo(title) {
    this._toast.fire({
      icon: 'info',
      title: title,
    });
  }

  /** Toast 질문 타입 */
  toastQuestion(title) {
    this._toast.fire({
      icon: 'question',
      title: title,
    });
  }
	
}

export const messageUtil = new MessageUtil();
