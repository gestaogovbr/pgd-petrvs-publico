import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { LookupItem, LookupService } from 'src/app/services/lookup.service';
import { UtilService } from 'src/app/services/util.service';
import * as moment from 'moment';
import { CardItem } from 'src/app/components/kanban/docker/docker.component';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit {
  public form: FormGroup;
  public items: LookupItem[] = [];
  public disabled: boolean = true;

  public naoIniciadas: CardItem[] = [
    {id: "ni1", title: "Não iniciada 1", subTitle: "Texto não iniciado 1", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens"},
    {id: "ni2", title: "Não iniciada 2", subTitle: "Texto não iniciado 2", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens"},
    {id: "ni3", title: "Não iniciada 3", subTitle: "Texto não iniciado 3", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens"}
  ];
  public pausadas: CardItem[] = [
    {id: "p1", title: "Pausada 1", subTitle: "Texto 1", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens"}
  ];
  public iniciadas: CardItem[] = [
    {id: "i1", title: "iniciada 1", subTitle: "Texto iniciado 1", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens"},
    {id: "i2", title: "iniciada 2", subTitle: "Texto iniciado 2", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens"}
  ];
  public concluidas: CardItem[] = [];
  public avaliadas: CardItem[] = [
    {id: "a1", title: "avaliada 1", subTitle: "avaliado 1", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens"}
  ];

  constructor(
    public fh: FormHelperService, 
    public usuarioDao: UsuarioDaoService, 
    public lookup: LookupService,
    public util: UtilService
  ) {
    this.form = fh.FormBuilder({
      id: {default: ""},
      campo1: {default: ""},
      campo2: {default: new Date()},
      campo3: {default: new Date()},
      campo4: {default: ""},
      campo5: {default: true},
      datetime: {default: new Date()},
      rate: {default: 2},
      horas: {default: 150.5},
      label: {default: ""},
      icon: {default: null},
      color: {default: null},
      multiselect: {default: []}
      /*display: {default: "Mensagem de teste"},
      switch: {default: false},
      search: {default: ""},
      button: {default: ""},
      cor: {default: ""},
      text: {default: ""},
      textarea: {default: ""},
      datetime: {default: new Date()},
      radio: {default: "SIM"},
      select: {default: "PE"},
      label: {default: ""},
      icon: {default: null},
      color: {default: null}*/
    });
  }

  public gridItems = [
    { id: this.util.md5(), campo1: "campo1-1", campo2: new Date(), campo3: new Date(), campo4: "campo4-1", campo5: false},
    { id: this.util.md5(), campo1: "campo1-2", campo2: new Date(), campo3: new Date(), campo4: "campo4-2", campo5: false},
    { id: this.util.md5(), campo1: "campo1-3", campo2: new Date(), campo3: new Date(), campo4: "campo4-3", campo5: false},
    { id: this.util.md5(), campo1: "campo1-4", campo2: new Date(), campo3: new Date(), campo4: "campo4-4", campo5: false},
    { id: this.util.md5(), campo1: "campo1-5", campo2: new Date(), campo3: new Date(), campo4: "campo4-5", campo5: false}
  ];


/*   public testeRetorno(form: IIndexable): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const usuario = this.util.fill(new Usuario(), this.entity!);
      resolve(this.util.fillForm(usuario, this.form!.value));
    });
  } */
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    //this.form.controls.search.setValue("dfcb36c8-4784-4d3c-b4bb-d4e9c9b2e68c");
  }

  public addItemHandle(): LookupItem | undefined {
    let self = this;
    return {
      key: self.form.controls.label.value,
      value: self.form.controls.label.value,
      color: self.form.controls.color.value,
      icon: self.form.controls.icon.value
    };
  };

  public dataChange(event: Event) {
    console.log(moment(this.form.controls.datetime.value).format(UtilService.ISO8601_FORMAT));
  }

  public onAddItem(): IIndexable | undefined {
    return {
      id: this.util.md5(),
      campo1: "Qualquer " + (Math.random() * 1000),
      campo2: new Date(),
      campo3: new Date(),
      campo4: "Coisa Nova " + (Math.random() * 100000),
      campo5: false
    }
  }
}
