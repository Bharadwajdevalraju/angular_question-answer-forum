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
        const question=this.questions.find(q=>{
            return q.id===id;
        });
        return question;
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