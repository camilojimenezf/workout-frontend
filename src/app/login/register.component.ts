import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UiService } from '../services/interfaz/ui.service';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';


declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  forma:FormGroup;

  constructor(
    public router: Router,
    private uiService: UiService,
    private userService: UserService
  ) { }

  ngOnInit() {
    init_plugins();

    this.forma= new FormGroup({
      nombre: new FormControl( null, Validators.required),
      apellido: new FormControl( null, Validators.required),
      correo: new FormControl( null, [Validators.required,Validators.email]),
      password: new FormControl( null, Validators.required),
      password2: new FormControl( null, Validators.required),
      condiciones: new FormControl( false),
      role: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required)
    }, 
    {
      validators:this.passwordIguales
    });

    this.forma.setValue({
      nombre:'David',
      apellido: 'Laid',
      correo:'david@gmail.com',
      password:'123456',
      password2:'123456',
      condiciones:true,
      role: 'ATLHETE',
      telefono: 98989898
    });

    this.userService.obtenerUsers().subscribe( response => {
      console.log(response);
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

  registrarUsuario(){
    if(this.forma.invalid){
      return;
    }
    console.log(this.forma);
    if(this.forma.value.condiciones===false){
      this.uiService.mostrarMensaje('Error', 'Debe aceptar los terminos', 'warning');
      return;
    } 
    
    let usuario= new User(
      this.forma.value.nombre,
      this.forma.value.apellido,
      this.forma.value.correo,
      this.forma.value.password,
      this.forma.value.role,
      this.forma.value.telefono
    ); 

    this.userService.crearUser(usuario).subscribe(
      response => {
        console.log(response);
      }
    ); 
  }
}
