import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router} from '@angular/router';
import { Answer } from '../models/answer';
import { Question } from '../models/question';
import { User } from '../models/user';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers:[DatePipe]
})
export class QuestionsComponent implements OnInit {

  questions:Question[];

  canQuestion:boolean=false;

  user:User;

  question:string=""

  searchText=""

  questionDescription:string=""

  constructor(private questionsService:QuestionsService,private route:ActivatedRoute,private router:Router,private datepipe:DatePipe) { }

  ngOnInit(): void {

    this.user=JSON.parse(localStorage.getItem('user'))
    if(this.user!=null){
      this.canQuestion=true;
    }
        
     this.route.params.subscribe((params:Params)=>{
      var search=params['searchtext'];
      this.searchText=search
      this.questionsService.findByQuestionText(search).then(questions=>this.questions=questions);
      console.log(this.questions);
      if(this.questions.length==0){
        this.router.navigate(['/noquestionsfound'],);
    }
    });
  }

  async addQuestion(){
    let date:Date=new Date();
     let latest_date =this.datepipe.transform(date, 'dd-MM-yyyy');
    length=this.questionsService.getAllQuestions.length;
    let answers:Answer[]=[]
    const question:Question=new Question(length+1,this.question,this.questionDescription,this.user.firstname,latest_date,answers);
    this.questionsService.addQuestion(question);
    this.reloadComponent();
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/questions',this.searchText]);
   }

}
