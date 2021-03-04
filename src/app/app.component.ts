import { Component, DoCheck } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { QuestionsService } from './services/questions.service';
import {Question} from '../app/models/question'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  searchtext:string="";
  title = 'question-answer-forum';
  profileName="";

  disableLoginAndRegister:boolean=false;

  constructor(private router:Router,private questionsService:QuestionsService){

  }

  ngDoCheck() :void{
    let  user=JSON.parse(localStorage.getItem("user"));
    user==null?this.disableLoginAndRegister=false
    :this.disableLoginAndRegister=true;
    if(this.disableLoginAndRegister){
      this.profileName=user.firstname+" "+user.lastname
    }
  }
  
  onSearch(){
    this.router.navigate(['/questions',this.searchtext]);
    this.searchtext=""
  }

  onLogout(){
    localStorage.setItem("user",null);
    this.router.navigate(['/']);
    this.disableLoginAndRegister=false
  }


}
