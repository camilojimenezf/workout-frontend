import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public recuerdame:boolean=false;
  public email:string;

  public auth2:any;

  constructor(
    public router:Router,
  ) { }

  ngOnInit() {
    init_plugins();

    this.email=localStorage.getItem('email') || '';
    if(this.email.length>1){
      this.recuerdame=true;
    }
  }

  ingresar(forma: NgForm){

    if(forma.invalid){
      return;
    }
    
    //let usuario= new Usuario(null, forma.value.email, forma.value.password);

    // this._usuarioService.login(usuario, forma.value.recuerdame).subscribe(
    //   response =>{
    //     this.router.navigate(['/dashboard']);
    //   }
    // );
    
    //this.router.navigate(['/dashboard']);
  }

}
