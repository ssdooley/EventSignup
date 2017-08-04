import { Injectable } from '@angular/core';
import * as toastr from 'toastr';

@Injectable()
export class ToastrService {
    constructor() {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "500",
            "timeOut": "3500",
            "extendedTimeOut": "300",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "fadeOut"
        };
    }

    alertSuccess(message: string, title: string) {
        toastr.success(message, title);
    }

    alertInfo(message: string, title: string) {
        toastr.info(message, title);
    }

    alertWarning(message: string, title: string) {
        toastr.warning(message, title);
    }

    alertDanger(message: string, title: string) {
        toastr.error(message, title);
    }
}