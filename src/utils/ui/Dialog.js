import Swal from 'sweetalert2';

/**
 * Dialog 유틸
 */
class Dialog {
	alr = null;
  cfr = null;

  constructor() {
		this.alr = Swal.mixin({});

    this.cfr = Swal.mixin({
			showCancelButton: true,
			confirmButtonText: '예',
			cancelButtonText: '아니오',
		});
  }

	alert(title, msg, icon = '') {
		return new Promise((resolve, reject) => {
			this.alr.fire({
				title: title,
				text: msg,
				icon: icon,
			}).then(result => resolve(result.isConfirmed));
		});
	}

  confirm(title, msg, icon = 'success') {
    return new Promise((resolve, reject) => {
			this.cfr.fire({
				title: title,
				text: msg,
				icon: icon,
			}).then(result => resolve(result.isConfirmed));
		});
  }
	
}

const dialog = new Dialog();

export default dialog;
