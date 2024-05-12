import Swal from 'sweetalert2';

const selectAlert = async ({
  title = 'Select field validation',
  inputOptions = {},
  text = 'Select a option',
  inputPlaceHolder = 'Select a option',
  icon = 'question',
}) => {
  return await Swal.fire({
    icon,
    title,
    text,
    input: 'select',
    inputOptions,
    inputPlaceholder: inputPlaceHolder,
    showCancelButton: true,
  });
};

const loadingAlert = async ({
  title = 'Loading',
  text = 'Please wait',
  flag = true,
}) => {
  if (!flag) {
    return Swal.close();
  }
  return await Swal.fire({
    title,
    text,
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

function alertConfirm({
  title = 'Are you sure?',
  text = "You won't be able to revert this!",
  confirmButtonText = 'Yes, delete it!',
  confirmButtonColor = '#3085d6',
  cancelButtonText = 'Cancel',
  cancelButtonColor = '#d33',
}) {
  return new Promise((resolve) => {
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: cancelButtonColor,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    }).then((result) => {
      resolve(result.isConfirmed);
    });
  });
}

export { selectAlert, loadingAlert, alertConfirm };
