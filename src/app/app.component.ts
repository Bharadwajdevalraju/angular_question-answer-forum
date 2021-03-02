import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchtext:string="";
  title = 'question-answer-forum';

  constructor(private router:Router){}
  onSearch(){
    this.router.navigate(['/questions']);
  }
}
