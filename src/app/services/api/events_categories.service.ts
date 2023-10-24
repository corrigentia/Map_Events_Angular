import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService, RequestType } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class EventCategoriesService extends BaseService {
  private baseUrl: string = 'http://127.0.0.1:8080/api/events_categories';

  /*
  constructor(private httpC: HttpClient) {
    super();
  }
*/

  /*
  getEvents() {
    return this.httpC.get(this.baseUrl);
  }
*/


  model: object = { limit: 5 };

  getEvents_Categories(): Observable<any[]> {
    return this.sendRequest('events_categories', this.model, RequestType.Get);
  }
}
