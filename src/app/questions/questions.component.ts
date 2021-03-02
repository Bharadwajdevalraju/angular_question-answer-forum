import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questions:Question[];

  constructor(private questionsService:QuestionsService) { }

  ngOnInit(): void {
     this.questions=this.questionsService.getAllQuestions();
     this.questionsService.questionsEmitter.subscribe((questions:Question[])=>{
        this.questions=questions
     });
  }

}
