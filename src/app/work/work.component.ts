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

  filename: string;
  url: string;
  auxiliar1: string = '<div class="mceNonEditable">' ;
  auxiliar2: string = '</div>';
  content: string = 'Load a file to replace this sample text with its content...';

  public customSettings: TinyMce.Settings | any;

  constructor(private http:HttpClient, private urlService:UrlService) {
    this.customSettings = tinymceDefaultSettings();
    this.customSettings.toolbar = 'link | bullist numlist outdent indent | fullscreen';
    this.customSettings.menubar = "view";
    this.customSettings.plugins = 'lists link autoresize noneditable fullscreen';
    this.customSettings.resize = 'both';
  }

  ngOnInit() {
  }

  getUrl(){
    this.urlService.getFileByUrl(this.url).subscribe(
      res => {
        this.content = this.auxiliar1 + res + this.auxiliar2;
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
      this.content = this.auxiliar1 + event.target.result + this.auxiliar2;
    }, false);

    reader.readAsText(file);
  }

  saveFile(){
    alert(this.content);
  }

}
