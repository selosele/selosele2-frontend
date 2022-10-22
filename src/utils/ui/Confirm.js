import Swal from 'sweetalert2';

/**
 * Confirm 유틸
 */
class Confirm {
  _confirm = null;

  constructor() {
    this._confirm = Swal.mixin({
			showCancelButton: true,
			confirmButtonText: '예',
			cancelButtonText: '아니오',
		});
  }

  success(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: msg,
				icon: 'success',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  error(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: msg,
				icon: 'error',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  warning(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: msg,
				icon: 'warning',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  info(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: msg,
				icon: 'info',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  question(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: msg,
				icon: 'question',
			}).then(result => resolve(result.isConfirmed));
		});
  }
	
}

const confirm = new Confirm();

export default confirm;
