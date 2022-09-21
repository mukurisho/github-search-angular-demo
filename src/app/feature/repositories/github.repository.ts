import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class GithubRepository {

  constructor(private readonly http: HttpClient) { }

  getUser(): Observable<any> {
    let url = env.githubUrl;
    return this.http.get<any>(`${url}/user`);
  }
}
