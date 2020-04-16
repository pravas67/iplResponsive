import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamPlayers } from '../models/ipl.model';
import { HttpClient } from '@angular/common/http';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartSelectEvent } from 'ng2-google-charts';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  team = "Select Team";
  teamPlayers: TeamPlayers[] = [];
  selectedRole: TeamPlayers[] = [];
  public pieChart: GoogleChartInterface;
  chart: any;
  socket: any;
  base_url = "https://ipl2020-stat.herokuapp.com/ipl2020/team/";
  displayedColumns: string[] = ['name', 'role', 'price', 'label'];
  dataSource = new MatTableDataSource();
  
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private http: HttpClient, private acRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.acRoute.paramMap.subscribe(paramMap => {
      // console.log('paramap', paramMap.get("label"));
      this.team = paramMap.get("label");
    })
  }
  getTeamPlayers() {
    this.base_url = this.base_url + this.team;
    this.http.get(this.base_url).subscribe(res => {
      this.teamPlayers = [];
      for (let i = 0; i < res["length"]; i++) {
        this.teamPlayers.push(res[i]);
      }
      this.dataSource = new MatTableDataSource<TeamPlayers>(this.teamPlayers);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      setTimeout(() => this.dataSource.sort = this.sort);
      // console.log("dataSource.paginator", this.dataSource);
      let map_Role_Price = new Map();
      this.teamPlayers.forEach(e => {
        if (!map_Role_Price.get(e.role)) {
          map_Role_Price.set(e.role, e.price);
        } else {
          map_Role_Price.set(e.role, map_Role_Price.get(e.role) + e.price)
        }
      })
      let pieChartData = [];
      pieChartData.push(["Role", "Price"]);
      for (let [key, value] of map_Role_Price.entries()) {
        pieChartData.push([key, value]);
      }
      this.displayPieChart(pieChartData);
    });
    this.base_url = "https://ipl2020-stat.herokuapp.com/ipl2020/team/";
  }
  displayPieChart(data: any) {
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: data,
      options: { title: 'Role and Price chart ', width: 400, height: 300 }
    }
  }
  public select(event: ChartSelectEvent) {
    this.selectedRole = [];
    let ar = event["selectedRowValues"];
    let role = ar[0];
    this.base_url = this.base_url + '{team}/{role}?';
    let reqURL = `${this.base_url}teamLabel=${this.team}&role=${role}`;
    this.http.get(reqURL).subscribe(res => {
      for (let i = 0; i < res["length"]; i++) {
        this.selectedRole.push(res[i]);
      }
    })
    this.base_url = "https://ipl2020-stat.herokuapp.com/ipl2020/team/";
    // this.teamPlayers.forEach(e => {
    //   if (e.role === ar[0]) {
    //     this.selectedRole.push(e);
    //   }
    // })
  }


}
