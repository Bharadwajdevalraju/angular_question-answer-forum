import { Answer } from "./answer";

export class Question{
    constructor(public id:number,question:string,questionDescription:string,createdBy:string,answers:Answer[]){}

}