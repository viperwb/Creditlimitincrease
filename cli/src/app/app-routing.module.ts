import { ErrorComponent } from './error/error.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SuccessComponent } from './success/success.component';



const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'success/:id/:id1', component: SuccessComponent},
  {path: 'error', component: ErrorComponent},
  {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
