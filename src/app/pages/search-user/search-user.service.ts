import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Users } from './search-user.reducer';
import { Todo } from '../todos/todos.reducer';

@Injectable()
export class SearchUserService {
  constructor(private httpClient: HttpClient) { }


  retrieveUser(symbol: string): Observable<Users> {
    let self = this;
    return this.httpClient
      .get('https://api.github.com/search/users?q=' + symbol)
      .pipe(
        map((user: any) => (
          {
            incomplete_results: user.incomplete_results,
            total_count: user.total_count,
            items: user.items.map(
              (item: any) =>
                Object.assign(item, {favourite: false})
            )
          }
        ))
      );
  }

}
