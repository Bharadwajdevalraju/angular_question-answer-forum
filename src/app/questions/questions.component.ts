import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router} from '@angular/router';
import { Question } from '../models/question';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questions:Question[];

  searchtext:string=""

  constructor(private questionsService:QuestionsService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.searchtext=this.route.snapshot.params["searchtext"];
     this.questions=this.questionsService.findByQuestionText(this.searchtext);
     
     this.route.params.subscribe((params:Params)=>{
      var search=params['searchtext'];
      this.questions=this.questionsService.findByQuestionText(search);
      console.log(this.questions);
      if(this.questions.length==0){
        this.router.navigate(['/noquestionsfound'],);
    }
    });
    
   
  }

}
