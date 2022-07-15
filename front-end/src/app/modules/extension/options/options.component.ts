import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormHelperService } from 'src/app/services/form-helper.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  public form: FormGroup;
  private webBrowser: any;
  private config: any;

  constructor(private fh: FormHelperService) {
    this.webBrowser = (chrome || browser);
    this.form = this.fh.FormBuilder({
      desenvolvimento: {default: false},
      useLocal: {default: false},
      homologacao: {default: false},
      baseUrl: {default: ""},
      servidorUrl: {default: ""}
    });
  }

  ngOnInit(): void {
    this.webBrowser.storage.sync.get(['petrvs'], (result: any) => {
      this.config = result.petrvs || {};
      this.form.patchValue(this.config);
    });
  }

  public salvar() {
    const values = this.form.value;
    const newValues = Object.assign(this.config, values);
    this.webBrowser.storage.sync.set({petrvs: newValues}, () => {
      alert("Salvo com sucesso!");
      window.close();
    });
  }

  public cancelar() {
    window.close();
  }

}
