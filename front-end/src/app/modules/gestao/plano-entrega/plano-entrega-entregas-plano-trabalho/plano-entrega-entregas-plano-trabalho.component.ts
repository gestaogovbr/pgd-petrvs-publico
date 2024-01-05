import { Component, Injector, Input, ViewChild } from '@angular/core';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { PlanoTrabalhoEntregaDaoService } from 'src/app/dao/plano-trabalho-entrega-dao.service';
import { PlanoTrabalhoEntrega } from 'src/app/models/plano-trabalho-entrega.model';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { PlanoTrabalhoService } from '../../plano-trabalho/plano-trabalho.service';
import { AccordionComponent } from 'src/app/components/accordion/accordion.component';

@Component({
  selector: 'plano-entrega-entregas-plano-trabalho',
  templateUrl: './plano-entrega-entregas-plano-trabalho.component.html',
  styleUrls: ['./plano-entrega-entregas-plano-trabalho.component.scss']
})
export class PlanoEntregaEntregasPlanoTrabalhoComponent extends PageFrameBase {  
  @ViewChild('accordionUser', { static: false }) public accordionUser?: AccordionComponent;

  @Input() set entregaId(value: string) {
    if(this._entregaId != value) {
      this._entregaId = value;
    }
  }  
  get entregaId(): string {
    return this._entregaId;
  }

  private _entregaId!: string;
  public PlanoTrabalhoDao: PlanoTrabalhoDaoService;
  public PlanoTrabalhoEntregaDao: PlanoTrabalhoEntregaDaoService;
  public planoTrabalhoService: PlanoTrabalhoService;

  public PlanosTrabalho!: PlanoTrabalho[];
  public items: Usuario[] = [];
  public loader: boolean = false;
  

  constructor(public injector: Injector){
    super(injector);
    this.PlanoTrabalhoDao = injector.get<PlanoTrabalhoDaoService>(PlanoTrabalhoDaoService);
    this.PlanoTrabalhoEntregaDao = injector.get<PlanoTrabalhoEntregaDaoService>(PlanoTrabalhoEntregaDaoService);
    this.planoTrabalhoService = injector.get<PlanoTrabalhoService>(PlanoTrabalhoService);
    this.join = ["plano_trabalho.usuario","plano_entrega_entrega.plano_entrega.unidade"];
    this.groupBy = [{ field: "plano_trabalho.usuario", label: "Usuário"}];
  }


  ngOnInit(): void {
    super.ngOnInit();
    this.loadData();
  }

  public loadData() {
    this.loader = true;
    this.cdRef.detectChanges();
    try {
      this.PlanoTrabalhoEntregaDao.query({where: [["plano_entrega_entrega_id", "==", this._entregaId]], join: this.join}).asPromise().then(response => {

        response.forEach((item) => {
          const usuario: Usuario = item.plano_trabalho!.usuario!;
          if (usuario) {
            const usuarioId = usuario.id;
            let usuarioExistente = this.items.find((u) => u.id === usuarioId);
            if (!usuarioExistente) {
              usuarioExistente = {
                ...usuario,
                planos_trabalho: [],
                initialization(data) {                  
                },
              };
              this.items.push(usuarioExistente);
            }

            const planoTrabalhoId = item.plano_trabalho!.id;
            let planoTrabalho = usuarioExistente.planos_trabalho!.find(
              (pt) => pt.id === planoTrabalhoId
            );

            if (!planoTrabalho) {
              planoTrabalho = {
                ...item.plano_trabalho!,
                entregas: [],
                initialization(data) {                  
                },
              };
              usuarioExistente.planos_trabalho!.push(planoTrabalho);
            }
            const entrega: PlanoTrabalhoEntrega = {
              ...item,
              initialization(data) {
                
              },
            };
            planoTrabalho.entregas.push(entrega);
          }
        });

      }).finally(() => {
        this.loader = false;
        this.cdRef.detectChanges();
      })
    } catch  (e){
      console.log("Erro")
    }
  }

  public totalForcaTrabalho(entregas: PlanoTrabalhoEntrega[] = []): number {
    const forca = entregas.map(x => x.forca_trabalho * 1).reduce((a, b) => a + b, 0);
    return Math.round(forca * 100) / 100;
  }

  public planoAtivo(planos: PlanoTrabalho[]): PlanoTrabalho {
    const planoAtivo = planos.find((plano) => plano.status === "ATIVO");
    return planoAtivo || {} as PlanoTrabalho;
  }
}
