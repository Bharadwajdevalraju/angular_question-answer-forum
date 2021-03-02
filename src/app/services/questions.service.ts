import { HttpClient } from '@angular/common/http'; 
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question'


@Injectable()
export class QuestionsService {

    questions: Question[]=[];

    question:Question;

    questionsEmitter =new EventEmitter<Question[]>();

    questionEmitter =new EventEmitter<Question>();

    getAllQuestions(){
        return this.questions.slice();
    }

    findQuestionById(id:number){
        console.log('hii');
        this.getJSON().subscribe(data => {
           // this.questions.push(...data)
            //console.log(this.questions);
            this.questions.forEach(question => {
                if(question.id===id){
                    console.log(question);
                    this.questionEmitter.emit(this.question);
                    return question;
                }
            });
        });     
       return null;
    }

   constructor(private http: HttpClient) { 
    this.getJSON().subscribe(data => {
        this.questions.push(...data)
        this.questionsEmitter.emit(this.questions.slice());
    });     
    }

    

    public getJSON(): Observable<any> {
        return this.http.get("../../assets/questions.json");
    }
}