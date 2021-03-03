import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable()
export class UserService{

    users:User[]=[]

    login(email:string,password:string):User{
        const user:User=this.users.find(u=>{
            return ( u.email===email && u.password===password )
        });
        return user;
    }

    constructor(private  http: HttpClient){
        this.getJSON().subscribe(data=>{
            this.users.push(...data);
        });
    }

    public getJSON(): Observable<any> {
        return this.http.get("../../assets/users.json");
    }

}