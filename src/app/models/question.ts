import { Answer } from "./answer";

export class Question{
    constructor(public id:number,public question:string,public questionDescription:string,public createdBy:string,public createdOn:string,answers:Answer[]){}

}