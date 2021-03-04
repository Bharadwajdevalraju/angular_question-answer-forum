import { Component, OnInit ,ViewChild ,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {

  @ViewChild('email',{static:true}) email:ElementRef;
  @ViewChild('password',{static:true}) password:ElementRef;
  @ViewChild('firstname',{static:true}) firstname:ElementRef;
  @ViewChild('lastname',{static:true}) lastname:ElementRef;

  message=""

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  register(){
      const user:User=new User(1,this.password.nativeElement.value,this.lastname.nativeElement.value,this.email.nativeElement.value,this.password.nativeElement.value);
      if(this.userService.addUser(user)){
        localStorage.setItem("user",JSON.stringify(user));
        this.router.navigate(['profile']);
      }else{
        this.message="registration failed ( email already exists! )"
      }
    }

}
