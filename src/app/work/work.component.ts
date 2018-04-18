import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  filename: string;
  url: string = 'Load an url to replace this sample text with its content...';
  auxiliar: Observable<any>;
  content: string = 'Load a file to replace this sample text with its content...';

  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

  getUrl(url){
    this.auxiliar = this.http.get<any>(url).map(data => data.text());
  }

  saveUrl(){
    alert(this.auxiliar);
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
