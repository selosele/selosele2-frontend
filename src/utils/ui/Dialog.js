import Swal from 'sweetalert2';

/**
 * Dialog 유틸
 */
class Dialog {
	_alert = null;
  _confirm = null;

  constructor() {
		this._alert = Swal.mixin({});

    this._confirm = Swal.mixin({
			showCancelButton: true,
			confirmButtonText: '예',
			cancelButtonText: '아니오',
		});
  }

	alert(title, msg, icon = '') {
		return new Promise((resolve, reject) => {
			this._alert.fire({
				title: title,
				text: msg,
				icon: icon,
			}).then(result => resolve(result.isConfirmed));
		});
	}

  confirm(title, msg, icon = 'success') {
    return new Promise((resolve, reject) => {
			this._confirm.fire({
				title: title,
				text: msg,
				icon: icon,
			}).then(result => resolve(result.isConfirmed));
		});
  }
	
}

const dialog = new Dialog();

export default dialog;
