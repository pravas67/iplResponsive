import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentComponent } from './tournament/tournament.component';
import { PlayerComponent } from './player/player.component';
import { TeamComponent } from './team/team.component';
import { IplComponent } from './ipl.component';


const routes: Routes = [
  {
    path:'',
    component:IplComponent,
    children:[
      {
        path:'',
        component:TournamentComponent
      },
      {
        path:'tournament',
        component:TournamentComponent
      },
      {
        path:'players',
        component:PlayerComponent
      },{
        path:'teams',
        component:TeamComponent,
        
      },{
        path:'teams/:label',
        component:TeamComponent,
        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IplRoutingModule { }
