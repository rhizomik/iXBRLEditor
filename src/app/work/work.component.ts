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
  auxMoneda: string;
  auxPeriodo: string;
  constructor(private http:HttpClient, private urlService:UrlService) {
    this.customSettings = tinymceDefaultSettings();
    this.customSettings.plugins = 'autoresize fullscreen contextmenu';
    this.customSettings.resize = 'both';
    this.customSettings.toolbar = 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | fullscreen | howToTag moneda periodo';
    this.customSettings.contextmenu_never_use_native = true;
    this.customSettings.contextmenu = 'perdidasYGanancias balance';
    this.customSettings.setup = this.setupTinyMCE.bind(this);
  }

  setupTinyMCE(editor){
    var that = this;
    this.auxMoneda = 'EUR';
    this.auxPeriodo = 'Periodo'
    this.editor = editor;
    this.editor.addButton('howToTag',{
      text:'Como añadir un tag?',
      onclick: function(){
        alert("Para añadir un tag -> 0) Seleccione la moneda y el periodo sobre el cual trabaja este documento  1)Subraya el valor del concepto que desea taggear 2)Click al botón derecho del ratón  3)Seleccionar el tag correspondiente al concepto");
      }
    });
    this.editor.addButton('periodo',{
      type:'menubutton',
      text: that.auxPeriodo,
      menu:[{
        text:'2018',
        menu:[{
          text:'Trimestral',
          menu:[{
            text:'Periodo: 2018 Primer Trimestre',
            onclick: function () {
              that.auxPeriodo = '2018-1Trimestre';
            }
          },{
            text:'Periodo: 2018  Segundo Trimestre',
            onclick: function () {
              that.auxPeriodo = '2018-2Trimestre';
            }
          },{
            text:'Periodo: 2018 Tercer Trimestre',
            onclick: function () {
              that.auxPeriodo = '2018-3Trimestre';
            }
          },{
            text:'Periodo: 2018 Cuarto Trimestre',
            onclick: function () {
              that.auxPeriodo = '2018-4Trimestre';
            }
          }]
        },{
          text:'Semestral',
          menu:[{
            text:'Periodo: 2018 Primer Semestre',
            onclick: function () {
              that.auxPeriodo = '2018-1Semestre';
            }
          },{
            text:'Periodo: 2018  Segundo Semestre',
            onclick: function () {
              that.auxPeriodo = '2018-2Semestre';
            }
          }]
        },{
          text:'Anual',
          menu:[{
            text:'Periodo: 2018',
            onclick: function () {
              that.auxPeriodo = '2018';
            }
          }]
        }] 
      },{
        text:'2017',
        menu:[{
          text:'Trimestral',
          menu:[{
            text:'Periodo: 2017 Primer Trimestre',
            onclick: function () {
              that.auxPeriodo = '2017-1Trimestre';
            }
          },{
            text:'Periodo: 2017  Segundo Trimestre',
            onclick: function () {
              that.auxPeriodo = '2017-2Trimestre';
            }
          },{
            text:'Periodo: 2017 Tercer Trimestre',
            onclick: function () {
              that.auxPeriodo = '2017-3Trimestre';
            }
          },{
            text:'Periodo: 2017 Cuarto Trimestre',
            onclick: function () {
              that.auxPeriodo = '2017-4Trimestre';
            }
          }]
        },{
          text:'Semestral',
          menu:[{
            text:'Periodo: 2017 Primer Semestre',
            onclick: function () {
              that.auxPeriodo = '2017-1Semestre';
            }
          },{
            text:'Periodo: 2017  Segundo Semestre',
            onclick: function () {
              that.auxPeriodo = '2017-2Semestre';
            }
          }]
        },{
          text:'Anual',
          menu:[{
            text:'Periodo: 2017',
            onclick: function () {
              that.auxPeriodo = '2017';
            }
          }]
        }] 
      }]
    });
    this.editor.addButton('moneda',{
      type:'listbox',
      text:'Moneda',
      onselect: function() {
        that.auxMoneda = this.value();
      },
      values:[
        {text:'Moneda: Dolares ($)', value:'USD'},
        {text:'Moneda: Euros (€)', value:'EUR'},
        {text:'Moneda: Libras (£)', value:'GBP'}
      ],
      onPostRender: function(){
        this.value('EUR');
      }
    });
    this.editor.addMenuItem('perdidasYGanancias', {
      text: 'Pérdidas y Ganancias',
      menu: [{
        text:'Resultado de Explotación',
        menu:[{
          text: '1. Importe neto de la Cifra de negocios',
          onclick: this.tagSelection.bind(this, 'Importe neto de la cifra de negocios')
        },{
          text:'2. Variación de existencias de productos terminados y en curso de fabricación',
          onclick: this.tagSelection.bind(this, 'Variación de existencias de productos terminados y en curso de fabricación')
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
    this.editor.addMenuItem('balance', {
      text: 'Balance',
      menu: [{
        text:'Activo',
        menu:[{
          text:'Activo No Corriente',
          menu:[{
            text: '1. Inmovilizado intangible',
            onclick: this.tagSelection.bind(this, 'Inmovilizado intangible')
            },{
            text:'2. Inmovilizado material',
            onclick: this.tagSelection.bind(this, 'Inmovilizado material')
            },{
            text:'3. Inversiones inmobiliarias',
            onclick: this.tagSelection.bind(this, 'Inversiones inmobiliarias')
            },{
            text:'4. Inversiones en empresas del grupo y asociadas a largo plazo',
            onclick: this.tagSelection.bind(this, 'Inversiones en empresas del grupo y asociadas a largo plazo')
            },{
            text:'5. Inversiones financieras a largo plazo',
            onclick: this.tagSelection.bind(this, 'Inversiones financieras a largo plazo')
            },{
            text:'6. Activos por Impuesto diferido',
            onclick: this.tagSelection.bind(this, 'Activos por impuesto diferido')
            }]
          },{
          text:'Activo Corriente',
          menu:[{
            text: '1. Existencias',
            onclick: this.tagSelection.bind(this, 'Existencias')
            },{
            text:'2. Deudores comerciales y otras cuentas a cobrar',
            onclick: this.tagSelection.bind(this, 'Deudores comerciales y otras cuentas a cobrar')
            },{
            text:'3.  Inversiones en empresas del grupo y asociadas a corto plazo',
            onclick: this.tagSelection.bind(this, 'Inversiones en empresas del grupo y asociadas a corto plazo')
            },{
            text:'4. Inversiones financieras a corto plazo',
            onclick: this.tagSelection.bind(this, 'Inversiones financieras a corto plazo')
            },{
            text:'5.  Periodificaciones a corto plazo',
            onclick: this.tagSelection.bind(this, ' Periodificaciones a corto plazo')
            },{
            text:'6. Efectivo y otros activos líquidos equivalentes',
            onclick: this.tagSelection.bind(this, 'Efectivo y otros activos líquidos equivalentes')
            }]
          }]
        },{
        text:'Patrimonio Neto',
        menu:[{
          text:'Fondos propios',
          menu:[{
            text: '1. Capital',
            onclick: this.tagSelection.bind(this, 'Capital')
            },{
            text:'2. Prima de emisión',
            onclick: this.tagSelection.bind(this, 'Prima de emisión')
            },{
            text:'3. Reservas',
            onclick: this.tagSelection.bind(this, 'Reservas')
            },{
            text:'4.  (Acciones y participaciones en patrimonio propias)',
            onclick: this.tagSelection.bind(this, ' (Acciones y participaciones en patrimonio propias)')
            },{
            text:'5. Resultados de ejercicios anteriores',
            onclick: this.tagSelection.bind(this, 'Resultados de ejercicios anteriores')
            },{
            text:'6. Otras aportaciones de socios',
            onclick: this.tagSelection.bind(this, 'Otras aportaciones de socios')
            },{
            text:'7. Resultado del ejercicio',
            onclick: this.tagSelection.bind(this, 'Resultado del ejercicio')
            },{
            text:'8. (Dividendo a cuenta)',
            onclick: this.tagSelection.bind(this, '(Dividendo a cuenta)')
            }]
          },{
            text:'Subvenciones, donaciones y legados recibidos',
            onclick: this.tagSelection.bind(this, 'Subvenciones, donaciones y legados recibidos')
          }]
        },{
        text:'Pasivo No Corriente',
        menu:[{
          text: '1. Provisiones a largo plazo',
          onclick: this.tagSelection.bind(this, 'Provisiones a largo plazo')
          },{
          text:'2. Deudas a largo plazo',
          onclick: this.tagSelection.bind(this, ' Deudas a largo plazo')
          },{
          text:'3. Deudas con empresas del grupo y asociadas a largo plazo',
          onclick: this.tagSelection.bind(this, 'Deudas con empresas del grupo y asociadas a largo plazo')
          },{
          text:'4. Pasivos por impuesto diferido',
          onclick: this.tagSelection.bind(this, 'Pasivos por impuesto diferido')
          },{
          text:'5. Periodificaciones a largo plazo',
          onclick: this.tagSelection.bind(this, 'Periodificaciones a largo plazo')
          }]
        },{
        text:'Pasivo Corriente',
        menu:[{
          text: '1. Provisiones a corto plazo',
          onclick: this.tagSelection.bind(this, 'Provisiones a corto plazo')
          },{
          text:'2. Deudas a corto plazo',
          onclick: this.tagSelection.bind(this, ' Deudas a corto plazo')
          },{
          text:'3. Deudas con empresas del grupo y asociadas a corto plazo',
          onclick: this.tagSelection.bind(this, 'Deudas con empresas del grupo y asociadas a corto plazo')
          },{
          text:'4. Acreedores comerciales y otras cuentas a pagar',
          onclick: this.tagSelection.bind(this, 'Acreedores comerciales y otras cuentas a pagar')
          },{
          text:'5. Periodificaciones a corto plazo',
          onclick: this.tagSelection.bind(this, 'Periodificaciones a corto plazo')
          }]        
        }]
    });
  }

  tagSelection(tagName) {
      const selectedRange = this.editor.selection.getRng(true);
      if (selectedRange.cloneContents().textContent.length > 0) {
        const highlightNode = document.createElement('span');
        const xbrlNode = document.createElement('ix:nonfraction');
        var popup = 'id: xbrl  nombre:' + tagName + '  moneda:' + this.auxMoneda + '  periodo:' + this.auxPeriodo;
        xbrlNode.setAttribute('id', 'xbrl');
        xbrlNode.setAttribute('name', tagName);
        xbrlNode.setAttribute('unit', this.auxMoneda);
        xbrlNode.setAttribute('periodo', this.auxPeriodo);
        highlightNode.style.cssText = 'background-color: yellow';
        highlightNode.setAttribute('title', popup);
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
