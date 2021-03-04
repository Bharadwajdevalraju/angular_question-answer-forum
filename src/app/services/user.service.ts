import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable()
export class UserService implements OnInit{

    users:User[]=[]

    login(email:string,password:string):User{
        let user:User=this.users.find(u=>{
            return ( u.email===email && u.password===password )
        });
        if(user==null){
            console.log('user not found');
            let users:User[] =JSON.parse(localStorage.getItem("users"));
            console.log(users);
            users.forEach(u=>{
                console.log(u.email.trim().localeCompare(email.trim())==0 && u.password.trim().localeCompare(password.trim())==0)
                if(u.email.trim().localeCompare(email.trim())==0 && u.password.trim().localeCompare(password.trim())==0){
                    console.log(u)
                    user=u;
                }
            })
        }
        return user;
    }

    constructor(private  http: HttpClient){
        this.getJSON().subscribe(data=>{
            this.users.push(...data);
        });
    }

    ngOnInit():void{

    }

    public getJSON(): Observable<any> {
        return this.http.get("../../assets/users.json");
    }

    addUser(user:User):boolean{
        let users:User []=[]
        users=JSON.parse(localStorage.getItem("users"));
        if(users!=null){
        let existingUser=users.find((u)=>{
            return u.email.trim().localeCompare(user.email.trim())==0
        })
        if(existingUser!=null){
            console.log(existingUser);
            return false;
        }
        }else{
            users=[]
        }

            users.push(user)

        localStorage.setItem("users",null);
        localStorage.setItem("users",JSON.stringify(users));

        return true;
    }

}