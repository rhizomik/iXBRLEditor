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
  content: string = 'Añade un documento para reemplazar esta muestra por su contenido...';
  customSettings: TinyMce.Settings | any;
  editor: TinyMce.Editor;

  constructor(private http:HttpClient, private urlService:UrlService) {
    this.customSettings = tinymceDefaultSettings();
    this.customSettings.plugins = 'autoresize fullscreen contextmenu';
    //this.customSettings.resize = 'both';
    this.customSettings.toolbar = 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | fullscreen | howToTag';
    this.customSettings.contextmenu_never_use_native = true;
    this.customSettings.contextmenu = 'perdidasYGanancias balance';
    this.customSettings.setup = this.setupTinyMCE.bind(this);
  }

  setupTinyMCE(editor) {
    this.editor = editor;
    this.editor.addButton('howToTag',{
      text:'Como añadir un tag?',
      onclick: function(){
        alert("Para añadir un tag -> 1)Subraya el valor del concepto que desea taggear 2)Click al botón derecho del ratón  3)Seleccionar el tag correspondiente al concepto");
      }
    });
    this.editor.addMenuItem('perdidasYGanancias', {
      text: 'Perdidas y Ganancias',
      menu: [{
        text:'Resultado de Explotación',
        menu:[{
          text: '1. Importe Neto de la Cifra de negocios',
          onclick: this.tagSelection.bind(this, 'Importe Neto de la cifra de negocios')
        },{
          text:'2. Variación de existencias de productos terminados y en curso de fabricación',
          onclick: this.tagSelection.bind(this, ' Variación de existencias de productos terminados y en curso de fabricación.')
        },{
          text:'3. Trabajos realizados por la empresa para su activo',
          onclick: this.tagSelection.bind(this, 'Trabajos realizados por la empresa para su activo')
        },{
          text:'4. Aprovisionamientos',
          onclick: this.tagSelection.bind(this, 'Aprovisionamientos')
        },{
          text:'5. Otros ingresos de explotación',
          onclick: this.tagSelection.bind(this, 'Otros ingresos de explotación')
        },{
          text:'6. Gastos de personal',
          onclick: this.tagSelection.bind(this, 'Gastos de personal')
        },{
          text:'7. Otros gastos de explotación',
          onclick: this.tagSelection.bind(this, 'Otros gastos de explotación')
        },{
          text:'8. Amortización del inmovilizado',
          onclick: this.tagSelection.bind(this, 'Amortización del inmovilizado')
        },{
          text:'9. Imputación de subvenciones de inmovilizado no financiero y otras',
          onclick: this.tagSelection.bind(this, 'Imputación de subvenciones de inmovilizado no financiero y otras')
        },{
          text:'10.  Excesos de provisiones',
          onclick: this.tagSelection.bind(this, 'Excesos de provisiones')
        },{
          text:'11. Deterioro y resultado por enajenaciones del inmovilizado',
          onclick: this.tagSelection.bind(this, 'Deterioro y resultado por enajenaciones del inmovilizado')
        }
        ]},{
        text:'Resultado Financiero',
        menu: [{
          text:'12. Ingresos financieros',
          onclick: this.tagSelection.bind(this, 'Ingresos financieros')
        },{
          text:'13. Gastos financieros',
          onclick: this.tagSelection.bind(this, 'Gastos financieros')
        },{
          text:'14. Variación de valor razonable en instrumentos financieros',
          onclick: this.tagSelection.bind(this, 'Variación de valor razonable en instrumentos financieros')
        },{
          text:'15. Diferencias de cambio',
          onclick: this.tagSelection.bind(this, 'Diferencias de cambio')
        },{
          text:'16. Deterioro y resultado por enajenaciones de instrumentos financieros',
          onclick: this.tagSelection.bind(this, 'Deterioro y resultado por enajenaciones de instrumentos financieros')
        }
        ]},{
        text: 'Resultado del Ejercicio',
        menu:[{
          text:'17. Impuestos sobre beneficios',
          onclick: this.tagSelection.bind(this, 'Impuestos sobre beneficios')
        }]       
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
          alert('Lo siento, selecciona solo un valor para taggear');
        }
      } else {
        alert("Lo siento, selecciona algun valor para taggear");
      }
      console.log(selectedRange);
  }

  getUrl(){
    this.urlService.getFileByUrl(this.url).subscribe(
      res => {
        this.content = res;
        console.log(this.content);
      },
      err => console.error('Error en el observador: ' + err),
      () => console.log('El observador ha obtenido una notificacion completa'));
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
}
