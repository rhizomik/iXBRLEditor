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
      var auxiliar: string;
      editor.addButton('tag', {
          type:'menubutton',
          text: 'tag',
          menu: [{
            text: 'Importe neto de la Cifra de Negocios',
            onclick: function(){ 
              this.auxiliar = 'Importe neto de la Cifra de Negocios';
              const selectedRange = editor.selection.getRng(true);
              if (selectedRange.cloneContents().textContent.length > 0) {
                return this.doTagging(this.auxiliar, selectedRange);
              } else {
                alert("Sorry, select some text to tag");
              }
              console.log(selectedRange);
            }    
          },{
            text:'Variación de existencias de productos terminados y en curso de fabricación',
            onclick: function(){ 
              this.auxiliar = 'Variación de existencias de productos terminados y en curso de fabriación';
              const selectedRange = editor.selection.getRng(true);
              if (selectedRange.cloneContents().textContent.length > 0) {
                return this.doTagging(this.auxiliar, selectedRange);
              } else {
                alert("Sorry, select some text to tag");
              }
              console.log(selectedRange);
            }    
          },{
            text:'Trabajos realizados por la empresa para su activo',
            onclick: function(){ 
              this.auxiliar = 'Trabajos realizados por la empresa para su activo';
              const selectedRange = editor.selection.getRng(true);
              if (selectedRange.cloneContents().textContent.length > 0) {
                return this.doTagging(this.auxiliar, selectedRange);
              } else {
                alert("Sorry, select some text to tag");
              }
              console.log(selectedRange);
            }    
          }]
        });
      }
    }

  ngOnInit() {
  }

  doTagging(aux, selected){
    const highlightNode = document.createElement("span");
    const xbrlNode = document.createElement("ix:nonfraction");
+     xbrlNode.setAttribute('id','xbrl');
+     xbrlNode.setAttribute('name', aux);
+     xbrlNode.setAttribute('unit', 'EUR')
    highlightNode.style.cssText = "background-color: yellow";
    try {
      selected.surroundContents(xbrlNode);
      selected.surroundContents(highlightNode);
    } catch (e) {
      alert("Sorry, select just one text piece to tag");
    }
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
