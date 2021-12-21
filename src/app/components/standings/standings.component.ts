import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { StandingsService } from "../../services/standings.service";
import { Team } from "src/app/models/team.model";
import { Observable } from "rxjs";

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandingsComponent implements OnInit, OnDestroy {
  teams$!: Observable<Team[]>;
  sub: any;
  columnsToDisplay = [
    "name",
    "position",
    "playedGames",
    "won",
    "draw",
    "lost",
    "goalsFor",
    "goalsAgainst",
    "goalDifference",
    "points"
  ];

  constructor(private standingService: StandingsService) {
  }

  ngOnInit(): void {
    this.sub = this.standingService.fetchStandings("premierLeague");
    console.log(this.sub);
    this.teams$ = this.standingService.teams;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getStandings(league: string) {
    this.sub = this.standingService.fetchStandings(league);
  }
}
