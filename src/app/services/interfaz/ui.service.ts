import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }
  
  mostrarMensaje(titulo, texto, icono:SweetAlertIcon = 'success') {
    Swal.fire(titulo, texto, icono);
  }

}
