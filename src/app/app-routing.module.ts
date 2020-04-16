import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    redirectTo:'ipl',
    pathMatch:'full'
  },

  {
    path:'ipl',
    loadChildren:()=>import("./ipl/ipl.module").then(m=>m.IplModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
