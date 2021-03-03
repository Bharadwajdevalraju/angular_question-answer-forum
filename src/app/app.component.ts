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

  disableLoginAndRegister:boolean=false;

  constructor(private router:Router,private questionsService:QuestionsService){

  }

  ngDoCheck() :void{
    JSON.parse(localStorage.getItem("user"))==null?this.disableLoginAndRegister=false
    :this.disableLoginAndRegister=true;
  }
  
  onSearch(){
    this.router.navigate(['/questions',this.searchtext]);
  }

  onLogout(){
    localStorage.clear();
    this.router.navigate(['/']);
    this.disableLoginAndRegister=false
  }


}
