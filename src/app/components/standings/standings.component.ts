import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StandingsService } from "../../services/standings.service";
import { Team } from "src/app/models/team.model";
import { Observable } from "rxjs";
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandingsComponent implements OnInit, OnDestroy {
  @HostBinding('class') className = '';
  toggleControl = new FormControl(false);
  teams$!: Observable<Team[]>;
  sub: any;
  is_dark: boolean = false;
  mode_icon = 'light_mode';
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

  constructor(private standingService: StandingsService, private overlay: OverlayContainer) {
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

  toggle(x: boolean) {
    const darkClassName = 'darkMode';
    this.className = x ? darkClassName : '';
    if(x) {
      this.overlay.getContainerElement().classList.add(darkClassName);
      this.mode_icon = 'dark_mode';
    } else {
      this.overlay.getContainerElement().classList.remove(darkClassName);
      this.mode_icon = 'light_mode';
    }
  }

  telegram() {
    location.href = "https://t.me/technewsupdates0";
  }
}
