import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';
import {Observable} from 'rxjs/Observable';
import {CustomMatch} from './custom-match';
import { environment } from '../../environments/environment';
import {Match} from '../match/Match';
import {Player} from '../player/player';
import {MatchJoinRequest} from '../match-join-request/MatchJoinRequest';
@Injectable()
export class CustomMatchService {
  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {}
  // GET /customMatches
  getAllCustomMatches(): Observable<CustomMatch[]> {
    return this.http.get(`${environment.API}/customMatches`)
      .map((res: Response) => res.json()._embedded.customMatches.map(json => new CustomMatch(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }
  // POST /customMatches
  addCustomMatch(customMatch: CustomMatch): Observable<CustomMatch> {
    const body = JSON.stringify(customMatch);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.post(`${environment.API}/customMatches`, body, options)
      .map((res: Response) => new CustomMatch(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /customMatches /id
  getCustomMatch(id: string): Observable<CustomMatch> {
    return this.http.get(`${environment.API}/customMatches/${id}`)
      .map((res: Response) => new CustomMatch(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /customMatches /id / matchCreator
  getCreatorMatch(id: string): Observable<Player> {
    return this.http.get(`${environment.API}/customMatches/${id}/matchCreator`)
      .map((res: Response) => new Player(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PUT /customMatches/id
  updateCustomMatch(customMatch: CustomMatch): Observable<CustomMatch> {
    const body = JSON.stringify(customMatch);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.put(`${environment.API}${customMatch.uri}`, body, options)
      .map((res: Response) => new CustomMatch(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }
  getCustomMatchByStartDate(from: string, to: string): Observable<Response> {
    // from = from.split(".")[0]+"Z";
    // to = to.split(".")[0]+"Z";
    return this.http.get(`${environment.API}/matches/search/findByStartDateBetween?from=${from}&to=${to}`)
      .map((res: Response) => res.json()._embedded.matches.map(json => new Match(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /customMatch/{id}
  deleteCustomMatch(customMatch: CustomMatch): Observable<Response> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.delete(`${environment.API}${customMatch.uri}`, options)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json()));
  }


  getMatchJoinRequestByCustomMatch(id: number): Observable<MatchJoinRequest[]> {
    return this.http.get(`${environment.API}/customMatches/${id}/matchJoinRequests`)
      .map((res: Response) => res.json()._embedded.matchJoinRequests.map(json => new MatchJoinRequest(json)))
      .catch((error: any) => Observable.throw(error.json()));

  }
}
