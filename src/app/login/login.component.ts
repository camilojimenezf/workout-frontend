import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user/user.service';

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
    private userService:UserService
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
    
    let usuario= {email: forma.value.email, password: forma.value.password, getToken: true};
  
    this.userService.login(usuario, forma.value.recuerdame).subscribe(
      response =>{
        console.log(response);
        //this.router.navigate(['/dashboard']);
      });

  }

}
