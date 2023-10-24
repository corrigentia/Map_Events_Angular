import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService, RequestType } from './base.service';
import { EventDTO } from 'src/app/models/eventDTO';
import { EventForm } from 'src/app/models/EventForm';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EventService extends BaseService {
  private baseUrl: string = 'http://127.0.0.1:8080/api/events';
  urlPrevious: string = '';
  urlNext: string = '';

  /*
  constructor(private _http: HttpClient) {
    super();
  }
*/

  /*
  getEvents() {
    return this.httpC.get(this.baseUrl);
  }
*/
  previous(urlPrevious: string) {
    //console.log(urlPrevious);
    return this.http.get(urlPrevious);
  }

  next(urlNext: string) {
    //console.log(urlNext);
    return this.http.get(urlNext);
  }

  /*
  getImg(url : string){
    return this.httpC.get(url)
  }
  */

  model: object = { limit: 5 };

  getEvents(model: object): Observable<any[]> {
    return this.sendRequest('events', model, RequestType.Get);
  }

  getEventById(id: number,model: object): Observable<any[]> {
    return this.sendRequest('events/'+id, model, RequestType.Get);
  }

  insert(event: EventForm): Observable<EventDTO> {
    return this.http.post<EventDTO>(environment.apiUrl + 'events', event);
  }
}
