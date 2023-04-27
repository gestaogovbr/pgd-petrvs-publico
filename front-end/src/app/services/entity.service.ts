import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from '../dao/dao-base.service';
import { Base } from '../models/base.model';
import { FullRoute } from './navigate.service';
import { Type } from 'typescript';
import { AfastamentoDaoService } from '../dao/afastamento-dao.service';
import { LexicalService } from './lexical.service';

export type EntityItem = {
    collection: string,
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
    public lex: LexicalService;

    public constructor(public injector: Injector) {
        this.lex = injector.get<LexicalService>(LexicalService);
        this.list = [
            {collection: 'afastamentos', codigo: 'MOD_XXX', icon: 'bi-XXXX', nome: 'Afastamento', dao: injector.get<AfastamentoDaoService>(AfastamentoDaoService), selectRoute: {route: ['cadastros', 'afastamento']}},
            {collection: 'afastamentos', codigo: 'MOD_XXX', icon: 'bi-XXXX', nome: 'Afastamento', dao: injector.get<AfastamentoDaoService>(AfastamentoDaoService), selectRoute: {route: ['cadastros', 'afastamento']}},
        ];
    }
   
    public getLabel(collection: string): string | undefined {
        let entity = this.list.find(x => x.collection == collection);
        return entity ? this.lex.noun(entity.nome) : undefined;
    }

    public getIcon(collection: string): string | undefined {
        return this.list.find(x => x.collection == collection)?.icon;
    }

}