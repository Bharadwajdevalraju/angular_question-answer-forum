import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {

  @ViewChild('username',{static:true}) username:ElementRef;
  @ViewChild('password',{static:true}) password:ElementRef;

  warningMessage:string=""

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  authenticate(){

    this.warningMessage="";
    let username=this.username.nativeElement.value;
    let password=this.password.nativeElement.value;
    if(username==="" && password===""){
      this.warningMessage="username or password cannot be null";
    }
    let user:User =this.userService.login(username,password);
    if(user==null){
      this.warningMessage="invalid credentials";
    }else{
      localStorage.setItem("user",JSON.stringify(user));
      this.router.navigate(['/profile']);
    }
  }

}
