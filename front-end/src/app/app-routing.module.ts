import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ConfigComponent } from './modules/config/config.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginRetornoComponent } from './modules/login/login-retorno/login-retorno.component';
import { LoginComponent } from './modules/login/login.component';
import { RaioxPessoalComponent } from './modules/raio-x/raiox-pessoal/raiox-pessoal.component';
import { RaioxhomeComponent } from './modules/raio-x/raioxhome/raioxhome.component';
import { TesteFormComponent } from './modules/teste/teste-form/teste-form.component';
import { TesteComponent } from './modules/teste/teste.component';
import { ConfigResolver } from './resolvies/config.resolver';

const routes: Routes = [
  { path: 'teste', component: TesteComponent, resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Teste" } },
  { path: 'teste/calcula-tempo', component: TesteFormComponent, resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Teste - CalculaTempo" } },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { title: "Home" } },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Login Petrvs", login: true } },
  { path: 'login-retorno', component: LoginRetornoComponent, data: { title: "Retorno de login", login: true } },
  { path: 'config', component: ConfigComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Configurações", modal: true } },
  { path: 'uteis', loadChildren: () => import('./modules/uteis/uteis.module').then(m => m.UteisModule), canActivate: [AuthGuard] },
  { path: 'cadastros/afastamento', loadChildren: () => import('./modules/cadastros/afastamento/afastamento.module').then(m => m.AfastamentoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/atividade', loadChildren: () => import('./modules/cadastros/atividade/atividade.module').then(m => m.AtividadeModule), canActivate: [AuthGuard] },
  { path: 'cadastros/cidade', loadChildren: () => import('./modules/cadastros/cidade/cidade.module').then(m => m.CidadeModule), canActivate: [AuthGuard] },
  { path: 'cadastros/entrega', loadChildren: () => import('./modules/cadastros/entrega/entrega.module').then(m => m.EntregaModule), canActivate: [AuthGuard] },
  { path: 'cadastros/eixo-tematico', loadChildren: () => import('./modules/cadastros/eixo-tematico/eixo-tematico.module').then(m => m.EixoTematicoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/feriado', loadChildren: () => import('./modules/cadastros/feriado/feriado.module').then(m => m.FeriadoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/material-servico', loadChildren: () => import('./modules/cadastros/material-servico/material-servico.module').then(m => m.MaterialServicoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tarefa', loadChildren: () => import('./modules/cadastros/tarefa/tarefa.module').then(m => m.TarefaModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-atividade', loadChildren: () => import('./modules/cadastros/tipo-atividade/tipo-atividade.module').then(m => m.TipoAtividadeModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-avaliacao', loadChildren: () => import('./modules/cadastros/tipo-avaliacao/tipo-avaliacao.module').then(m => m.TipoAvaliacaoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-documento', loadChildren: () => import('./modules/cadastros/tipo-documento/tipo-documento.module').then(m => m.TipoDocumentoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-justificativa', loadChildren: () => import('./modules/cadastros/tipo-justificativa/tipo-justificativa.module').then(m => m.TipoJustificativaModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-modalidade', loadChildren: () => import('./modules/cadastros/tipo-modalidade/tipo-modalidade.module').then(m => m.TipoModalidadeModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-motivo-afastamento', loadChildren: () => import('./modules/cadastros/tipo-motivo-afastamento/tipo-motivo-afastamento.module').then(m => m.TipoMotivoAfastamentoModule), canActivate: [AuthGuard] },
  { path: 'cadastros/tipo-processo', loadChildren: () => import('./modules/cadastros/tipo-processo/tipo-processo.module').then(m => m.TipoProcessoModule), canActivate: [AuthGuard] },
  { path: 'gestao/programa', loadChildren: () => import('./modules/gestao/programa/programa.module').then(m => m.ProgramaModule), canActivate: [AuthGuard] },
  { path: 'gestao/demanda', loadChildren: () => import('./modules/gestao/demanda/demanda.module').then(m => m.DemandaModule), canActivate: [AuthGuard] },
  { path: 'gestao/planejamento', loadChildren: () => import('./modules/gestao/planejamento-institucional/planejamento.module').then(m => m.PlanejamentoModule), canActivate: [AuthGuard] },
  { path: 'gestao/plano-trabalho', loadChildren: () => import('./modules/gestao/plano/plano.module').then(m => m.PlanoModule), canActivate: [AuthGuard] },
  { path: 'gestao/plano-entrega', loadChildren: () => import('./modules/gestao/plano-entrega/plano-entrega.module').then(m => m.PlanoEntregaModule), canActivate: [AuthGuard] },
  { path: 'gestao/projeto', loadChildren: () => import('./modules/gestao/projeto/projeto.module').then(m => m.ProjetoModule), canActivate: [AuthGuard] },
  { path: 'configuracoes/preferencia', loadChildren: () => import('./modules/configuracoes/preferencia/preferencia.module').then(m => m.PreferenciaModule), canActivate: [AuthGuard] },
  { path: 'configuracoes/entidade', loadChildren: () => import('./modules/configuracoes/entidade/entidade.module').then(m => m.EntidadeModule), canActivate: [AuthGuard] },
  { path: 'configuracoes/perfil', loadChildren: () => import('./modules/configuracoes/perfil/perfil.module').then(m => m.PerfilModule), canActivate: [AuthGuard] },
  { path: 'configuracoes/unidade', loadChildren: () => import('./modules/configuracoes/unidade/unidade.module').then(m => m.UnidadeModule), canActivate: [AuthGuard] },
  { path: 'configuracoes/usuario', loadChildren: () => import('./modules/configuracoes/usuario/usuario.module').then(m => m.UsuarioModule), canActivate: [AuthGuard] },
  { path: 'listeners', loadChildren: () => import('./listeners/listeners.module').then(m => m.ListenersModule), canActivate: [AuthGuard] },
  { path: 'extension', loadChildren: () => import('./modules/extension/extension.module').then(m => m.ExtensionModule) },
  { path: 'relatorios', loadChildren: () => import('./modules/relatorios/relatorio.module').then(m => m.RelatorioModule), canActivate: [AuthGuard] },
  { path: 'logs', loadChildren: () => import('./modules/logs/log.module').then(m => m.LogModule), canActivate: [AuthGuard] },
  { path: 'rotinas', loadChildren: () => import('./modules/rotinas/rotina.module').then(m => m.RotinaModule), canActivate: [AuthGuard] },
  { path: 'raioxhome', component: RaioxhomeComponent, canActivate: [AuthGuard], data: { title: "Raio-X" } },
  { path: 'raioxhome/pessoal', component: RaioxPessoalComponent, canActivate: [AuthGuard], data: { title: "Dados Pessoais" } },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
