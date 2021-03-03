import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Question } from './models/question';
import { ProfileComponent } from './profile/profile.component';
import { QuestionNotFoundComponent } from './question-not-found/question-not-found.component';
import { QuestionComponent } from './questions/question/question.component';
import { QuestionsComponent } from './questions/questions.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path:'',component:HomeComponent},  
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent},
  {path:'questions/:searchtext',component:QuestionsComponent},
  {path:'question/:id',component:QuestionComponent},
  {path:'noquestionsfound',component:QuestionNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
