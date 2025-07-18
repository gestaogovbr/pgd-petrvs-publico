import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ConfigComponent } from './modules/config/config.component';
import { LoginRetornoComponent } from './modules/login/login-retorno/login-retorno.component';
import { LoginComponent } from './modules/login/login.component';


import { ConfigResolver } from './resolvies/config.resolver';
import { LoginUnicoComponent } from "./modules/login/login-unico/login-unico.component";
import { PanelGuard } from "./guards/panel.guard";
import { PanelLoginComponent } from "./modules/panel/panel-login/panel-login.component";
import {TesteImpersonateComponent} from "./modules/teste/teste-impersonate/teste-impersonate.component";

const routes: Routes = [
  { path: 'panel-login', component: PanelLoginComponent },
  { path: 'panel', loadChildren: () => import('./modules/panel/panel.module').then(m => m.PanelModule), canActivate: [PanelGuard] },
  { path: 'impersonate', component: TesteImpersonateComponent, resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Teste - Impersonate" } },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Login Petrvs", login: true } },
  { path: 'login-retorno', component: LoginRetornoComponent, data: { title: "Retorno de login", login: true } },
  { path: 'login-unico', component: LoginUnicoComponent, data: { title: "Retorno de login" } },
  { path: 'config', component: ConfigComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Configurações", modal: true } },
  { path: 'suporte', loadChildren: () => import('./modules/suporte/suporte.module').then(m => m.SuporteModule), resolve: { config: ConfigResolver } },
  { path: 'uteis', loadChildren: () => import('./modules/uteis/uteis.module').then(m => m.UteisModule), canActivate: [AuthGuard] },
  { path: 'cadastros/cidade', loadChildren: () => import('./modules/cadastros/cidade/cidade.module').then(m => m.CidadeModule), canActivate: [AuthGuard] },
  { path: 'cadastros/cliente', loadChildren: () => import('./modules/cadastros/cliente/cliente.module').then(m => m.ClienteModule), canActivate: [AuthGuard] },
  { path: 'cadastros/entrega', loadChildren: () => import('./modules/cadastros/entrega/entrega.module').then(m => m.EntregaModule), canActivate: [AuthGuard] },
  { path: 'cadastros/eixo-tematico', loadChildren: () => import('./modules/cadastros/eixo-tematico/eixo-tematico.module').then(m => m.EixoTematicoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/feriado', loadChildren: () => import('./modules/cadastros/feriado/feriado.module').then(m => m.FeriadoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/material-servico', loadChildren: () => import('./modules/cadastros/material-servico/material-servico.module').then(m => m.MaterialServicoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/templates', loadChildren: () => import('./modules/uteis/templates/template.module').then(m => m.TemplateModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-tarefa', loadChildren: () => import('./modules/cadastros/tipo-tarefa/tipo-tarefa.module').then(m => m.TipoTarefaModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-atividade', loadChildren: () => import('./modules/cadastros/tipo-atividade/tipo-atividade.module').then(m => m.TipoAtividadeModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-avaliacao', loadChildren: () => import('./modules/cadastros/tipo-avaliacao/tipo-avaliacao.module').then(m => m.TipoAvaliacaoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-cliente', loadChildren: () => import('./modules/cadastros/tipo-cliente/tipo-cliente.module').then(m => m.TipoClienteModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-documento', loadChildren: () => import('./modules/cadastros/tipo-documento/tipo-documento.module').then(m => m.TipoDocumentoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-justificativa', loadChildren: () => import('./modules/cadastros/tipo-justificativa/tipo-justificativa.module').then(m => m.TipoJustificativaModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-modalidade', loadChildren: () => import('./modules/cadastros/tipo-modalidade/tipo-modalidade.module').then(m => m.TipoModalidadeModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-motivo-afastamento', loadChildren: () => import('./modules/cadastros/tipo-motivo-afastamento/tipo-motivo-afastamento.module').then(m => m.TipoMotivoAfastamentoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-processo', loadChildren: () => import('./modules/cadastros/tipo-processo/tipo-processo.module').then(m => m.TipoProcessoModule), canActivate: [AuthGuard] },
  { path: 'gestao/afastamento', loadChildren: () => import('./modules/gestao/afastamento/afastamento.module').then(m => m.AfastamentoModule), canActivate: [AuthGuard] },
  { path: 'gestao/programa', loadChildren: () => import('./modules/gestao/programa/programa.module').then(m => m.ProgramaModule), canActivate: [AuthGuard] },
  { path: 'gestao/cadeia-valor', loadChildren: () => import('./modules/gestao/cadeia-valor/cadeia-valor.module').then(m => m.CadeiaValorModule), canActivate: [AuthGuard] },
  { path: 'gestao/atividade', loadChildren: () => import('./modules/gestao/atividade/atividade.module').then(m => m.AtividadeModule), canActivate: [AuthGuard] },
  { path: 'gestao/planejamento', loadChildren: () => import('./modules/gestao/planejamento-institucional/planejamento.module').then(m => m.PlanejamentoModule), canActivate: [AuthGuard] },
  { path: 'gestao/plano-trabalho', loadChildren: () => import('./modules/gestao/plano-trabalho/plano-trabalho.module').then(m => m.PlanoTrabalhoModule), canActivate: [AuthGuard] },
  { path: 'gestao/plano-entrega', loadChildren: () => import('./modules/gestao/plano-entrega/plano-entrega.module').then(m => m.PlanoEntregaModule), canActivate: [AuthGuard] },
  { path: 'gestao/desdobramento', loadChildren: () => import('./modules/gestao/desdobramento/desdobramento.module').then(m => m.DesdobramentoModule), canActivate: [AuthGuard] },
  { path: 'gestao/produto', loadChildren: () => import('./modules/gestao/produto/produto.module').then(m => m.ProdutoModule), canActivate: [AuthGuard] },
  { path: 'gestao/solucao', loadChildren: () => import('./modules/gestao/solucoes/solucao.module').then(m => m.SolucaoModule), canActivate: [AuthGuard] },
  { path: 'execucao/plano-entrega', loadChildren: () => import('./modules/gestao/plano-entrega/plano-entrega.module').then(m => m.PlanoEntregaModule), canActivate: [AuthGuard] },
  { path: 'avaliacao/plano-entrega', loadChildren: () => import('./modules/gestao/plano-entrega/plano-entrega.module').then(m => m.PlanoEntregaModule), canActivate: [AuthGuard] },
  { path: 'avaliacao/plano-trabalho', loadChildren: () => import('./modules/gestao/plano-trabalho/plano-trabalho.module').then(m => m.PlanoTrabalhoModule), canActivate: [AuthGuard] },
  { path: 'configuracoes/preferencia', loadChildren: () => import('./modules/configuracoes/preferencia/preferencia.module').then(m => m.PreferenciaModule), canActivate: [AuthGuard] },
  { path: 'configuracoes/entidade', loadChildren: () => import('./modules/configuracoes/entidade/entidade.module').then(m => m.EntidadeModule), canActivate: [AuthGuard] },
  { path: 'configuracoes/perfil', loadChildren: () => import('./modules/configuracoes/perfil/perfil.module').then(m => m.PerfilModule), canActivate: [AuthGuard] },
  { path: 'configuracoes/unidade', loadChildren: () => import('./modules/configuracoes/unidade/unidade.module').then(m => m.UnidadeModule), canActivate: [AuthGuard] },
  { path: 'configuracoes/usuario', loadChildren: () => import('./modules/configuracoes/usuario/usuario.module').then(m => m.UsuarioModule), canActivate: [AuthGuard] },
  { path: 'consultas', loadChildren: () => import('./modules/consultas/consultas.module').then(m => m.ConsultasModule), canActivate: [AuthGuard] },
  { path: 'relatos/lotacao', loadChildren: () => import('./modules/relatos/lotacao/relato-lotacao.module').then(m => m.RelatoLotacaoModule), canActivate: [AuthGuard] },
  { path: 'listeners', loadChildren: () => import('./listeners/listeners.module').then(m => m.ListenersModule), canActivate: [AuthGuard] },
  { path: 'extension', loadChildren: () => import('./modules/extension/extension.module').then(m => m.ExtensionModule) },
  { path: 'logs', loadChildren: () => import('./modules/logs/log.module').then(m => m.LogModule), canActivate: [AuthGuard] },
  { path: 'rotinas', loadChildren: () => import('./modules/rotinas/rotina.module').then(m => m.RotinaModule), canActivate: [AuthGuard] },
  { path: 'relatorios', loadChildren: () => import('./modules/relatorios/relatorio.module').then(m => m.RelatorioModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }