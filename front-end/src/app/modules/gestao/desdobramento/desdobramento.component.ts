import { Component, Injector, OnInit } from '@angular/core';
import { PageBase } from '../../base/page-base';
import { TreeNode } from 'primeng/api';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';

@Component({
  selector: 'app-desdobramento',
  templateUrl: './desdobramento.component.html',
  styleUrls: ['./desdobramento.component.scss']
})
export class DesdobramentoComponent extends PageBase implements OnInit {

  public typeObject: string  = ''
  public idObject: string  = ''
  data: TreeNode[] = [
    {
        label: 'F.C Barcelona',
        expanded: true,
        children: [
            {
                label: 'Argentina',
                expanded: true,
                styleClass: 'bg-success text-white',
                children: [
                    {
                        label: 'Argentina'
                    },
                    {
                        label: 'France'
                    }
                ]
            },
            {
                label: 'France',
                expanded: true,
                children: [
                    {
                        label: 'France'
                    },
                    {
                        label: 'Morocco'
                    }
                ]
            }
        ]
    }
];

  public programaDao: ProgramaDaoService;

  constructor(public injector: Injector) {
    super(injector);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.typeObject = this.urlParams?.get('type') || ""
    this.idObject = this.urlParams?.get('id') || ""
    switch (this.typeObject) {
      case 'programa':
        this.carregaPrograma()
        break;
    
      default:
        break;
    }
    
  }

  carregaPrograma(){
    this.programaDao.getById(this.idObject)
  }



  
}
