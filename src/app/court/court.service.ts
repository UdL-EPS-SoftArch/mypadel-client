import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Court} from './Court';

@Injectable()
export class CourtService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // TODO: GET all courts
  getAllCourts(): Observable<Court[]> {
    return this.http.get(`${environment.API}/courts`)
      .map((res: Response) => res.json()._embedded.courts.map(json => new Court(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // TODO: GET court by id
  getCourt(id: string): Observable<Court> {
    return this.http.get(`${environment.API}/courts/${id}`)
      .map((res: Response) => new Court(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // TODO: POST a new court
  addAdmin(court: Court): Observable<Court> {
    const body = JSON.stringify(court);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.post(`${environment.API}/courts`, body, options)
      .map((res: Response) => new Court(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // TODO: PUT a court
  // TODO: DELETE a court
}
