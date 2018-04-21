import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UrlService {

  url: string;
  data: any;
  content: string = 'Load a file to replace this sample text with its content...';

  constructor(private http: HttpClient) { }

  private parseUrl(res: Response){
    console.log(this.url);
    this.data = res.text();
    console.log(this.data);
    this.content = this.data;
    return this.data;
  }

  getFileByUrl(input){
    console.log(input);
    return this.http.get(input).map(this.parseUrl);
  }
}
