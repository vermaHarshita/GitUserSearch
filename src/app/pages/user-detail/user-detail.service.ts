import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserDetail } from './user-detail.reducer';

@Injectable()
export class UserDetailService {
  constructor(private httpClient: HttpClient) { }
  retrieveUserDetail(symbol: string): Observable<UserDetail> {
    return this.httpClient
      .get('https://api.github.com/users/' + symbol)
      .pipe(
        map((user: any) => (
          {
            id: user.login,
            name: user.name,
            company: user.company,
            blog: user.blog,
            location: user.location,
            bio: user.bio,
            public_repos: user.public_repos,
            public_gists: user.public_gists,
            followers: user.followers,
            following: user.following,
            avatar_url: user.avatar_url,
            html_url: user.html_url
          }
        ))
      );
  }
}
