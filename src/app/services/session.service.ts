import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'
import { UserTokenDTO } from '../models/userTokenDTO';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _data$: BehaviorSubject<UserTokenDTO | undefined> = new BehaviorSubject<UserTokenDTO | undefined>(undefined);
  private storageKey: string = "currentUser"

  get data$(): Observable<UserTokenDTO | undefined> {
    return this._data$.asObservable();
  }

  get data(): UserTokenDTO | undefined {
    return this._data$.value;
  }

  constructor() {
    const json = localStorage.getItem(this.storageKey);
    if (json) {
      this._data$.next(JSON.parse(json));
    }
  }

  start(user: UserTokenDTO): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    this._data$.next(user);
  }

  stop(): void {
    localStorage.removeItem(this.storageKey);
    this._data$.next(undefined);
  }
}
