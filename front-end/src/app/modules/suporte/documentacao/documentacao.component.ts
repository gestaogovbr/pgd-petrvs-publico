import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { MarkdownService } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-documentacao',
  templateUrl: './documentacao.component.html',
  styleUrls: ['./documentacao.component.scss'],
})
export class DocumentacaoComponent implements OnInit {
  content: string = '';
  items!: MenuItem[];

  constructor(
    public globals: GlobalsService,
    private markdownService: MarkdownService,
    private _httpClient:HttpClient
  ) {}

  ngOnInit(): void {
    this.openMd('docs/manual.md')
    document.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        const link = event.target as HTMLAnchorElement;
        const linkTarget = link.getAttribute('href');  
        if (linkTarget && linkTarget.endsWith('.md')) {
          event.preventDefault();
          this.openMd(linkTarget);
        }
      }
    });

    this.items = [
      {
        label: 'Início',
        icon: 'bi bi-house',
        target: 'docs/manual.md'
      },
      {
        label: 'Gestão',
        items: [
          {
            label: 'Avaliação (Planos de entrega e trabalho)',
            icon: 'bi bi-star',
            target: 'docs/Gestao/avaliacao.md'   
          },
          {
            label: 'Planejamento Institucional',
            icon: 'bi bi-journals',
            target: 'docs/Gestao/planejamento_institucional.md'   
          },
          {
            label: 'Planos de entrega',
            icon: 'bi bi-list-columns-reverse',
            target: 'docs/Gestao/plano_entrega.md',
            items: [
              {
                label: 'Entregas',
                target: 'docs/Gestao/plano_entrega_entrega.md'   
              },
            ]
          },
          {
            label: 'Planos de Trabalho',
            icon: 'bi bi-list-stars',
            target: 'docs/Gestao/plano_trabalho.md',
            items: [
              {
                label: 'Consolidação',
                target: 'docs/Gestao/plano_trabalho_consolidacao.md'   
              },
            ]   
          },          
        ],
      },
      {
        label: 'Geral',
        items: [
          {
            label: 'Informações Complementares',
            target: 'docs/Geral/informacoes-complementares.md'
          },
        ],
      },
      {
        label: 'Configurações',
        items: [
          {
            label: 'Entidade',
            icon: 'bi bi-bookmark-heart',
            target: 'docs/Configuracoes/entidade.md' 
          },
          {
            label: 'Perfil',
            icon: 'bi bi-fingerprint',
            target: 'docs/Configuracoes/perfil.md' 
          },
          {
            label: 'Preferência',
            icon: 'bi bi-gear',
            target: 'docs/Configuracoes/preferencia.md' 
          },
          {
            label: 'Unidade',
            icon: 'bi bi-unity',
            target: 'docs/Configuracoes/unidade.md' 
          },
          {
            label: 'Usuário',
            icon: 'bi bi-people',
            target: 'docs/Configuracoes/usuario.md' 
          },
        ],
      },      
    ];

    this.items = this.addCommand(this.items, (e: any) => this.openMd(e.item?.target));
  }

  addCommand(items: MenuItem[], commandFunction: any) {
    return items.map((item) => {
      const newItem = { ...item, command: commandFunction };
      if (item.items) {
        newItem.items = this.addCommand(item.items, commandFunction);
      }
      return newItem;
    });
  }

  
  async openMd(file: string | undefined){
    if(file){
      let markdownRaw = await this._httpClient.get(file, {
        responseType: 'text'
    }).toPromise();
      if(markdownRaw){
        this.content = this.markdownService.parse(markdownRaw)
      }
    }
  }

}
