import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from './ipl/models/tournament.model';
import { TeamAmount } from './ipl/models/teamAmount.model';
import { Player } from './ipl/models/player.model';

@Injectable({
  providedIn: 'root'
})
export class IplService {
  base_url="https://ipl2020-stat.herokuapp.com/ipl2020/team/";

  constructor(private http:HttpClient) { }

  getTeamDetails():Observable<Team[]>{
    console.log("getTeamDetails");
    return this.http.get<Team[]>(`${this.base_url}all`);
  }
  getAmountSpentByTeams():Observable<TeamAmount[]>{
    return this.http.get<TeamAmount[]>(`${this.base_url}totalamount`);
  }
  getAllPlayers():Observable<Player[]>{
    return this.http.get<Player[]>(`${this.base_url}players/all`);
  }
  getMaxPaidPlayers():Observable<Player[]>{
    return this.http.get<Player[]>(`${this.base_url}maxamoutbyrole`);
  }
}
