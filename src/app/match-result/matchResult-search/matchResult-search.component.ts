///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatchResult} from '../MatchResult';
import {MatchResultService} from '../MatchResult.service';

@Component({
  selector: 'app-match-result-search',
  templateUrl: './matchResult-search.component.html'
})

export class MatchResultSearchComponent {
  @Input()
  matchResults: MatchResult[];
  @Output()
  onSearchited: EventEmitter<any> = new EventEmitter();

  public errorMessage: string;
  constructor(private matchResultService: MatchResultService,
              private route: ActivatedRoute) {
  }

  performSearch(searchTerm: number): void {
    this.matchResultService.getById(searchTerm).subscribe(
        matchResults => { this.onSearchited.emit(matchResults); },
      error => this.errorMessage = <any>error.message);
  }
}
