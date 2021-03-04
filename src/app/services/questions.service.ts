import { HttpClient } from '@angular/common/http'; 
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Answer } from '../models/answer';
import { Question } from '../models/question'


@Injectable()
export class QuestionsService implements OnInit{

    questions: Question[]=[];

    question:Question;

    questionsEmitter =new EventEmitter<Question[]>();


    getAllQuestions(){
        return this.questions.slice();
    }

    async findQuestionById(id:number){
        let question;
        await this.getData();    

        question= this.questions.find(q=>{
                          console.log(typeof q.id)
                          return q.id==id;                
                      });
        let answers:Answer []=JSON.parse(localStorage.getItem("answers"));
        if(answers!=null){
        const  answersToBeAdded : Answer []=answers.filter(ans=>{
            return question.id==ans.questionId;
        })
        question.answers.push(...answersToBeAdded);
        }
        return question;
        
    }

    async getData(){
        this.questions=[]
        this.questions.push(...await this.getJSON());
        // let quests:Question[]=JSON.parse(localStorage.getItem("questions"))
        // if(quests!=null){
        //     this.questions.push(...quests);
        // }
    }

   constructor(private http: HttpClient) { 
    }

    ngOnInit():void{
    }

    async findByQuestionText(searchtext:string){
        let questions;
       
        let answers:Answer []=JSON.parse(localStorage.getItem("answers"));
       await this.getData();
    //    let storedquestions:Question []=JSON.parse(localStorage.getItem("questions"));
    //    if(storedquestions!=null){
    //        this.questions.push(...storedquestions);
    //        console.log(storedquestions);
    //    }
       if(answers!=null){
           this.questions.forEach(question=>{
        const  answersToBeAdded : Answer []=answers.filter(ans=>{
            return question.id==ans.questionId;
        })
        question.answers.push(...answersToBeAdded);});
        }
         questions=this.questions.filter(q=>{
              return q.question.includes(searchtext);        
        });

        
       
        return questions;
       
    }

    addAnswer(answer:Answer,questionId:number){
        let answers:Answer []=[];
        let strAnswers=JSON.parse(localStorage.getItem("answers"))
        if(strAnswers!=null){
        answers.push(...JSON.parse(localStorage.getItem("answers")));
        }
        answers.push(answer);
        localStorage.setItem("answers",null);
        localStorage.setItem("answers",JSON.stringify(answers));
    }

    async addQuestion(question:Question){
        let questions:Question []=[];
        await this.getData();
        let id=this.questions.length
        let strquestions=JSON.parse(localStorage.getItem("questions"))
        if(strquestions!=null){
            questions.push(...JSON.parse(localStorage.getItem("questions")));
            id+=questions.length
        }
        question.id=id+1
        questions.push(question);
        localStorage.setItem("questions",null);
        localStorage.setItem("questions",JSON.stringify(questions));
    }
    

    public getJSON(): Promise<any> {
        return this.http.get("../../assets/questions.json").toPromise();        ;
    }
}