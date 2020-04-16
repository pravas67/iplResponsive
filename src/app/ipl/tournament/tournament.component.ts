
import { Component, OnInit } from '@angular/core';
import { Team } from '../models/tournament.model';
import { TeamAmount } from '../models/teamAmount.model';
import { IplService } from 'src/app/ipl.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { Player } from '../models/player.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartSelectEvent } from 'ng2-google-charts';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
  displayedColumns: string[] = ['team', 'home', 'city', 'coach', 'label'];
  // displayedColumns: ['id', 'device', 'state', 'lastUpdate'];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  teams: Team[] = [];
  teamAmounts: TeamAmount[] = [];
  players: Player[] = [];
  public columnChart: GoogleChartInterface;
  public pieChart: GoogleChartInterface;
  selectedRole: Player[] = [];

  constructor(private iplService: IplService, private route: Router, private acRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.iplService.getTeamDetails().subscribe(res => {
      this.teams = res;
    });
    this.iplService.getAmountSpentByTeams().subscribe(res => {
      this.teamAmounts = res;
      this.teamAmounts.sort((t1, t2) => t1.amount - t2.amount)
      let columnChartData = [];
      columnChartData.push(["Team", "Amount"]);
      this.teamAmounts.forEach(t => {
        columnChartData.push([t.teamName, t.amount]);
      })
      // console.log("columnChartData", columnChartData);
      columnChartData.forEach(ele => {
        // console.log("columnChartData", columnChartData)
      })
      this.displayColumnChart(columnChartData);
    });
    this.roleCount();
  }

  roleCount() {
    this.iplService.getAllPlayers().subscribe(data => {
      this.players = data;
      let map_Role_Count = new Map();
      this.players.forEach(e => {
        if (!map_Role_Count.get(e.role)) {
          map_Role_Count.set(e.role, 1);
        } else {
          map_Role_Count.set(e.role, map_Role_Count.get(e.role) + 1)
        }
      })
      let pieChartData = [];
      pieChartData.push(["Role", "Count"]);
      for (let [key, value] of map_Role_Count.entries()) {
        pieChartData.push([key, value]);
      }
      this.displayPieChart(pieChartData);
    })
  }
  displayPieChart(data: any) {
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: data,
      options: { title: 'Role and Count chart '}
    }
  }
  displayColumnChart(data: any) {
    // console.log(data);
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: data,
      options: { title: 'Team and amount', width: 350, height: 300 }
    }
  }

  showTeamDetails(label: string) {
    console.log('label', label);
    this.route.navigate(['/team', label]);

  }
  public select(event: ChartSelectEvent) {
    this.selectedRole = [];
    this.players.forEach(e => {
      let ar = event["selectedRowValues"];
      if (e.role === ar[0]) {
        this.selectedRole.push(e);
      }
    })
  }
}