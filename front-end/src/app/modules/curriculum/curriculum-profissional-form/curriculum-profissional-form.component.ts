import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';


@Component({
  selector: 'app-curriculum-profissional-form',
  templateUrl: './curriculum-profissional-form.component.html',
  styleUrls: ['./curriculum-profissional-form.component.scss']
})
export class CurriculumProfissionalFormComponent implements OnInit {

  constructor() { }

  //this.form = this.fh.FormBuilder({
   /** apresentese: { default: "" },
    estados: { default: "" },
    municipios: { default: "" },
    telefone: { default: "" },
    estadoCivil: { default: "" },
    radioFilhos: { default: false },
    qtsFilhos: { default: 0 },
    radioFalaIdioma: { default: false },
    idioma: { default: "" },
    idiomaFala: { default: "" },
    idiomaEscrita: { default: "" },
    idiomaEntendimento: { default: "" },
    idiomasM: { default: [] },
    radioGraduacao: { default: false },
    radioPretendeGraduacao: { default: false },
    area: { default: "" },
    curso: { default: "" },
    graduacao: { default: [] },
    radioPosGraduacao: { default: false },
    radioPretendePosGraduacao: { default: false },
    areaPos: { default: "" },
    cursoPos: { default: "" },
    posgraduacao: { default: [] },
    radioMestrado: { default: false },
    radioPretendeMestrado: { default: false },
    areaMestrado: { default: "" },
    cursoMestrado: { default: "" },
    mestrado: { default: [] },
    radioDoutorado: { default: false },
    radioPretendeDoutorado: { default: false },
    areaDoutorado: { default: "" },
    cursoDoutorado: { default: "" },
    doutorado: { default: [] },
    radioPosDoutorado: { default: false },
    radioPretendePosDoutorado: { default: false },
    areaPosDoutorado: { default: "" },
    cursoPosDoutorado: { default: "" },
    posdoutorado: { default: [] },**/


 // }, this.cdRef, this.validate);

  ngOnInit(): void {
  }

}
