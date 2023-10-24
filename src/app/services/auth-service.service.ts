import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegisterForm } from '../models/userRegisterForm';
import { Observable } from 'rxjs';
import { UserTokenDTO } from '../models/userTokenDTO';
import { environment } from 'src/environments/environment.development';
import { UserLoginForm } from '../models/userLoginForm';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private readonly _http: HttpClient
  ) { }

  register(user: UserRegisterForm): Observable<UserTokenDTO> {
    return this._http.post<UserTokenDTO>(
      environment.apiUrl + 'register',
      user
    );
  }

  login(user: UserLoginForm): Observable<UserTokenDTO> {
    return this._http.post<UserTokenDTO>(environment.apiUrl + 'login', user);
  }
}
