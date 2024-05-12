/** @format */

import Swal from "sweetalert2";
import toastr from "toastr";

const footerAlert = "Clinica suyanet";
class Alert {
  alertEmpty(titulo_principal, texto, tipo) {
    Swal.fire({
      icon: tipo,
      title: titulo_principal,
      allowOutsideClick: false,
      text: texto,
      confirmButtonText: '<i className="fa fa-check"></i> Aceptar',
      showCloseButton: true,
      focusConfirm: true,
      footer: footerAlert,
    });
  }
  loading_reload(flag = true, text = "Cargando") {
    let myalert;
    if (flag) {
      myalert = Swal.fire({
        title: `¡${text}...!`,
        html: "Por favor espere...",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close(myalert);
    }
  }

  async QuestionYesNo(title, text, focus = 1, type = "question") {
    return await Swal.fire({
      title: title,
      text: text,
      icon: type,
      showCancelButton: true,
      confirmButtonColor: "#278eb6",
      cancelButtonColor: "#93908F",
      confirmButtonText: '<i className="fa fa-check"></i> SI',
      cancelButtonText: '<i className="fa fa-times-circle"></i> NO',
      focusCancel: focus === 1 ? true : false,
      focusConfirm: focus === 2 ? true : false,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        return true;
      } else {
        return false;
      }
    });
  }

  toast_error(text, position = "center") {
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: `toast-top-${position}`,
      preventDuplicates: true,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "6000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
    toastr.error(text);
  }
  toast_warning(text, position = "center") {
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: `toast-top-${position}`,
      preventDuplicates: true,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "6000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
    toastr.warning(text);
  }
  toast_info(text, position = "center") {
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: `toast-top-${position}`,
      preventDuplicates: true,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "6000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
    toastr.info(text);
  }

  toast_success(text, timer = 2000) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: text,
    });
  }
}
export default new Alert();
