import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Params } from '@angular/router';
import { Question } from 'src/app/models/question';
import {QuestionsService } from '../../services/questions.service'


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question:Question

  constructor(private questionsService:QuestionsService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    var id=this.route.snapshot.params['id'];  
    this.question=this.questionsService.findQuestionById(+id);
    this.questionsService.questionEmitter.subscribe(question=>{
      this.question=question;
    });
    // this.route.params.subscribe((params:Params)=>{
    //   var id=params['id'];
    //   this.question=this.questionsService.findQuestionById(+id);
    // });
  }

}
