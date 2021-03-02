import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './questions/question/question.component';
import { QuestionsComponent } from './questions/questions.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path:'',component:HomeComponent},  
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'questions',component:QuestionsComponent},
  {path:'question',component:QuestionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
