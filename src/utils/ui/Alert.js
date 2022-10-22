import Swal from 'sweetalert2';

/**
 * Alert 유틸
 */
class Alert {
  _alert = null;

  constructor() {
    this._alert = Swal.mixin({});
  }

  success(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: msg,
				icon: 'success',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  error(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: msg,
				icon: 'error',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  warning(title, msg = '') {
    return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: msg,
				icon: 'warning',
			}).then(result => resolve(result.isConfirmed));
		});
  }

  info(title, msg = '') {
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
	
}

const alert = new Alert();

export default alert;
