import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Template } from "../models/template.model";

@Injectable({
  providedIn: 'root'
})
export class TemplateDaoService extends DaoBaseService<Template> {

  constructor(protected injector: Injector) {
    super("Template", injector);
    this.searchFields = ["titulo"];
  }
}

