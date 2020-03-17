import { Component, OnInit } from '@angular/core';
import { RoutineService } from '../../../services/routine/routine.service';
import { UserService } from '../../../services/user/user.service';
import { infoUser } from '../../../models/interfaces';
import { Routine } from '../../../models/routine';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-routine',
  templateUrl: './list-routine.component.html',
  styles: []
})
export class ListRoutineComponent implements OnInit {

  private infoUser: infoUser;
  public routines: Routine[];

  constructor(
    private routineService: RoutineService,
    private userService: UserService
  ) { 
    this.infoUser = this.userService.getInfoUser();
  }

  ngOnInit() {
    this.obtenerRutinas();
  }

  obtenerRutinas(){
    this.routineService.getRoutinesByUser(this.infoUser.id).subscribe( (routines: Routine[]) => {
      this.routines = routines;
    })
  }

  eliminarRutina(id) {
    Swal.fire({
      title: 'Estas seguro que deseas eliminar esta rutina?',
      text: "Este cambio no puede ser revertido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.routineService.deleteRoutine(id).subscribe( resp => {
          console.log(resp);
          Swal.fire(
            'Eliminado!',
            'La rutina ha sido eliminada',
            'success'
          )
          this.obtenerRutinas();
        })
      }
    })
  }

}
