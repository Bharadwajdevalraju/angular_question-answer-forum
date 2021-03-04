import { DatePipe } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute ,Params, Router } from '@angular/router';
import { Answer } from 'src/app/models/answer';
import { Question } from 'src/app/models/question';
import { User } from 'src/app/models/user';
import {QuestionsService } from '../../services/questions.service'


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  providers:[DatePipe]
})
export class QuestionComponent implements OnInit {

  answer=""

  question:Question

  canAnswer:boolean=false;

  user:User;
  

  constructor(private questionsService:QuestionsService,private route:ActivatedRoute,private datepipe: DatePipe,private router:Router) { }

  ngOnInit(): void {

    this.user=JSON.parse(localStorage.getItem('user'))
    if(this.user!=null){
      this.canAnswer=true;
    }
    this.route.params.subscribe((params:Params)=>{
      var id=params['id'];
      this.questionsService.findQuestionById(+id).then(data=>this.question=data);
    });
  }

  addAnswer(){
     let date:Date=new Date();
     let latest_date =this.datepipe.transform(date, 'dd-MM-yyyy');
     const  answer:Answer=new Answer(1,this.answer,this.user.firstname,latest_date,this.question.id);
     this.questionsService.addAnswer(answer,this.question.id);
     this.reloadComponent();
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/question',this.question.id]);
   }

}
