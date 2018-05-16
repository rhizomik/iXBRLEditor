import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UrlService {

  private PROXY = 'http://crossorigin.me/';

  constructor(private http: HttpClient) { }

  getFileByUrl(input): Observable<string>{
    console.log(input);
    return this.http.get(this.PROXY + input, { responseType: 'text' });
  }
}
