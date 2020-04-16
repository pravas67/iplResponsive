import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IplRoutingModule } from './ipl-routing.module';
import { IplComponent } from './ipl.component';
import { TournamentComponent } from './tournament/tournament.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [IplComponent, TournamentComponent, TeamComponent, PlayerComponent],
  imports: [
    CommonModule,
    IplRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2GoogleChartsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class IplModule { }
