import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  content: string = 'Load a file to replace this sample text with its content...';
  
  public customSettings: TinyMce.Settings | any;
  constructor(private http:HttpClient, private urlService:UrlService) {
    this.customSettings = tinymceDefaultSettings();
    this.customSettings.toolbar = 'link | bullist numlist outdent indent | fullscreen | tag';
    this.customSettings.plugins = 'lists link autoresize fullscreen';
    this.customSettings.resize = 'both';
    this.customSettings.setup =  function(editor: TinyMce.Editor) { 
        editor.addButton('tag', {
          type:'button',
          text: 'tag',
          onclick: function() {
            const selectedRange = editor.selection.getRng(true);
            console.log(selectedRange);
            if (selectedRange.cloneContents().textContent.length > 0) {
              const highlightNode = document.createElement("span");
              const xbrlNode = document.createElement("ix:nonfraction");
              xbrlNode.setAttribute('id','xbrl');
              xbrlNode.setAttribute('name', 'Pèrdues i Guanys: Import Net de la Xifra de Negocis');
              xbrlNode.setAttribute('unit', 'EUR')
              highlightNode.style.cssText = "background-color: yellow";
              try {
                selectedRange.surroundContents(xbrlNode);
                selectedRange.surroundContents(highlightNode);
              } catch (e) {
                alert("Sorry, select just one text piece to tag");
              }
            } else {
              alert("Sorry, select some text to tag");
            }
          }
        })
    }
  }

  ngOnInit() {
  }

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
