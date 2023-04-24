import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from '../dao/dao-base.service';
import { Base } from '../models/base.model';
import { FullRoute } from './navigate.service';
import { Type } from 'typescript';
import { AfastamentoDaoService } from '../dao/afastamento-dao.service';

export type EntityItem = {
    table: string,
    codigo: string,
    icon: string,
    nome: string,
    dao: DaoBaseService<Base>,
    selectRoute: FullRoute
};

@Injectable({
  providedIn: 'root'
})
export class EntityService {

    public list: EntityItem[];
    
    public constructor(public injector: Injector) {
        this.list = [
            {table: 'afastamentos', codigo: 'MOD_XXX', icon: 'bi-XXXX', nome: 'Afastamento', dao: injector.get<AfastamentoDaoService>(AfastamentoDaoService), selectRoute: {route: ['cadastros', 'afastamento']}},
            {table: 'afastamentos', codigo: 'MOD_XXX', icon: 'bi-XXXX', nome: 'Afastamento', dao: injector.get<AfastamentoDaoService>(AfastamentoDaoService), selectRoute: {route: ['cadastros', 'afastamento']}},
            {table: 'afastamentos', codigo: 'MOD_XXX', icon: 'bi-XXXX', nome: 'Afastamento', dao: injector.get<AfastamentoDaoService>(AfastamentoDaoService), selectRoute: {route: ['cadastros', 'afastamento']}},
            {table: 'afastamentos', codigo: 'MOD_XXX', icon: 'bi-XXXX', nome: 'Afastamento', dao: injector.get<AfastamentoDaoService>(AfastamentoDaoService), selectRoute: {route: ['cadastros', 'afastamento']}},
        ];
    }
   
}