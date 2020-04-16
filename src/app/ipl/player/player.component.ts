import { Component, OnInit, ViewChild } from '@angular/core';
import { IplService } from 'src/app/ipl.service';
import { Player } from '../models/player.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  players: Player[] = [];
  // maxPaidPlayers: Player[] = [];
  wicketKeepers: Player[] = [];
  batsman: Player[] = [];
  bowler: Player[] = [];
  allRounder: Player[] = [];
  displayedColumns: string[] = ['name', 'role', 'price', 'label'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private iplService: IplService) { }

  ngOnInit(): void {
    this.iplService.getAllPlayers().subscribe(data => {
      this.players = data;
      this.dataSource = new MatTableDataSource<Player>(this.players);
      this.players.sort((p1, p2) => p2.price - p1.price);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      setTimeout(() => this.dataSource.sort = this.sort);
    });
    this.iplService.getMaxPaidPlayers().subscribe(data => {
      let maxPaidPlayers = [];
      maxPaidPlayers = data;
      maxPaidPlayers.forEach(ele => {
        if (ele.role === "Wicket Keeper") {
          this.wicketKeepers = (ele.players);
        } else if (ele.role === "Batsman") {
          this.batsman = (ele.players);
        } else if (ele.role === "All-Rounder") {
          this.allRounder = (ele.players);
        } else if (ele.role === "Bowler") {
          this.bowler = (ele.players);
        }
      })
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
