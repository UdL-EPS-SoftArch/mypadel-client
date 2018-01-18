import {FilterMatchStrategy} from './FilterMatchStrategy';
import {Observable} from 'rxjs/Observable';
import {PrivateMatchService} from '../../private-match/private-match.service';
import {PrivateMatch} from '../../private-match/PrivateMatch';

export class FilterPrivateMatchStrategy extends FilterMatchStrategy {
  public errorMessage: string;

  constructor(private privateMatchService: PrivateMatchService) {
    super();
  }

  filterMatch(): Observable<PrivateMatch[]> {
    return this.privateMatchService.getAllPrivateMatches().map(
      matches => matches,
      error => this.errorMessage = <any>error.message);
  }

}
