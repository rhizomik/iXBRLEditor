import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { UrlService} from '../url.service';
import 'rxjs/add/operator/map';

import { tinymceDefaultSettings } from 'angular-tinymce';
import * as TinyMce from 'tinymce';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  data: any;
  filename: string;
  url: string;
  auxiliar: Observable <any>;
  content: string = 'Load a file to replace this sample text with its content...';

  public customSettings: TinyMce.Settings | any;

  constructor(private http:HttpClient, private urlService: UrlService) {
    this.customSettings = tinymceDefaultSettings();
    this.customSettings.toolbar = 'link | bullist numlist outdent indent';
    this.customSettings.plugins = 'autoresize lists link';
    this.customSettings.resize = 'both';
  }

  ngOnInit() {
  }
  /*
  private parseUrl(res: Response){
    console.log(this.url);
    this.data = res.text();
    console.log(this.data);
    this.content = this.data;
    return this.data;
  }

  getFileByUrl(res: Response){
    console.log(this.url);
    return this.http.get(this.url).map(this.parseUrl);
  }
  */

  getUrl(){
    this.urlService.getFileByUrl(this.url).subscribe(
      res => {
        this.content = res;
        console.log(this.content);
      },
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification'));
  }

  loadFile(input) {
    let file = input.files[0];
    let reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.filename = file.name;
      this.content = event.target.result;
    }, false);

    reader.readAsText(file);
  }

  saveFile(){
    alert(this.content);
  }

}
