import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : User;

  constructor(private route:Router) { 

  }

  ngOnInit(): void {
  this. user =JSON.parse(localStorage.getItem("user"));
  if(this.user==null){
      this.route.navigate(['/']);
  }
  }

}
