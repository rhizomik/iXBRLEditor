import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class WorkComponent {
  filename: string;
  url: string;
  content: string = 'Load a file to replace this sample text with its content...';
  customSettings: TinyMce.Settings | any;
  editor: TinyMce.Editor;

  constructor(private http:HttpClient, private urlService:UrlService) {
    this.customSettings = tinymceDefaultSettings();
    this.customSettings.plugins = 'autoresize fullscreen contextmenu';
    this.customSettings.resize = 'both';
    this.customSettings.contextmenu_never_use_native = true;
    this.customSettings.contextmenu = 'negocio existencias';
    this.customSettings.setup = this.setupTinyMCE.bind(this);
  }

  setupTinyMCE(editor) {
    this.editor = editor;
    this.editor.addMenuItem('negocio', {
      text: 'Cifra de Negocios',
      menu: [{
        text: 'Importe Neto',
        onclick: this.tagSelection.bind(this, 'Cifra de Negocios Importe Neto')
      },{
        text: 'Importe Bruto',
        onclick: this.tagSelection.bind(this, 'Cifra de Negocios Importe Bruto')
      }]
    });
    this.editor.addMenuItem('existencias', {
      text: 'Variación de Existencias',
      menu: [{
        text: 'De Productos Terminados y en Curso de Fabricación',
        onclick: this.tagSelection.bind(this, 'Variación de Existencias de Productos Terminados y en Curso de Fabricación')
      }]
    });
  }

  tagSelection(tagName) {
      const selectedRange = this.editor.selection.getRng(true);
      if (selectedRange.cloneContents().textContent.length > 0) {
        const highlightNode = document.createElement('span');
        const xbrlNode = document.createElement('ix:nonfraction');
        xbrlNode.setAttribute('id', 'xbrl');
        xbrlNode.setAttribute('name', tagName);
        xbrlNode.setAttribute('unit', 'EUR');
        highlightNode.style.cssText = 'background-color: yellow';
        try {
          selectedRange.surroundContents(xbrlNode);
          selectedRange.surroundContents(highlightNode);
        } catch (e) {
          alert('Sorry, select just one text piece to tag');
        }
      } else {
        alert("Sorry, select some text to tag");
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
