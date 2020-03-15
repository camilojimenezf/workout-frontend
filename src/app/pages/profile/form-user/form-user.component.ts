import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { infoUser } from '../../../models/interfaces';
import { User } from '../../../models/user';
import { UiService } from '../../../services/interfaz/ui.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styles: []
})
export class FormUserComponent implements OnInit {

  form: FormGroup;
  private infoUser: infoUser;
  public user;

  constructor(
    private userService: UserService,
    private uiService: UiService
  ) { 
    this.infoUser = this.userService.getInfoUser();
  }

  ngOnInit() {
    this.form = new FormGroup({
      nombre: new FormControl(null, {
          validators: [Validators.required]
      }),
      apellido: new FormControl(null, {
          validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.min(6)]
      }),
      password2: new FormControl( null, {
        validators: [Validators.min(6)]
      }),
      telefono: new FormControl(null, {
        validators: [Validators.required]
      }),
    }, 
    {
      validators:this.passwordIguales
    });

    this.obtenerUser(this.infoUser.id);
  }

  obtenerUser(id) {
    this.userService.getUser(id).subscribe( (user:User) => {
      this.user = user;
      console.log(this.user);
      this.cargarUser();
    })
  }

  passwordIguales: ValidatorFn = (group: FormGroup):ValidationErrors | null => {
    return group.get('password').value === group.get('password2').value
       ? null : {'passwordNoIguales': true};
  }

  sonIguales(campo1: string, campo2:string){
      
    return (group: FormGroup)=>{

      let pass1= group.controls[campo1].value;
      let pass2= group.controls[campo2].value;

      if(pass1===pass2){
        return null;
      }

      return {
        sonIguales: true,
      };
    };
  }

  cargarUser() {
    this.form.setValue({
      nombre: this.user.name, 
      apellido: this.user.surname, 
      email: this.user.email,
      telefono: this.user.phone,
      password: '',
      password2: ''
    }); 
  }

  guardarUser() {
    if (this.form.invalid) {
      this.uiService.mostrarMensaje('Error','Ingrese datos válidos', 'error');
      return;
    }
    let user = new User(this.form.value.nombre, this.form.value.surname, this.form.value.email,
      this.form.value.password, this.infoUser.role, this.form.value.telefono);

    this.userService.updateUser(this.infoUser.id, user).subscribe( resp => {
      if ( resp ) {
        this.obtenerUser(this.infoUser.id);
      }
    });
  }
}
