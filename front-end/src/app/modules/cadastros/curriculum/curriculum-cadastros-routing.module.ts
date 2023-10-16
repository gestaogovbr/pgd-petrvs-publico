import { NgModule } from '@angular/core';
import { RouterModule,  Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  
  { path: 'areaatividadeexterna',loadChildren: () => import('./area-atividade-externa/area-atividade-externa.module').then(m => m.AreaAtividadeExternaModule), canActivate: [AuthGuard] },
  { path: 'areaconhecimento',loadChildren: () => import('./area-conhecimento/area-conhecimento.module').then(m => m.AreaConhecimentoModule), canActivate: [AuthGuard] },
  { path: 'curso',loadChildren: () => import('./curso/curso.module').then(m => m.CursoModule), canActivate: [AuthGuard] },
  { path: 'tipocurso',loadChildren: () => import('./tipo-curso/tipo-curso.module').then(m => m.TipoCursoModule), canActivate: [AuthGuard] },
  { path: 'centrotreinamento',loadChildren: () => import('./centro-treinamento/centro-treinamento.module').then(m => m.CentroTreinamentoModule), canActivate: [AuthGuard] },
  { path: 'funcao',loadChildren: () => import('./funcao/funcao.module').then(m => m.FuncaoModule), canActivate: [AuthGuard] },
  { path: 'grupoespecializado',loadChildren: () => import('./grupo-especializado/grupo-especializado.module').then(m => m.GrupoEspecializadoModule), canActivate: [AuthGuard] },
  { path: 'materia',loadChildren: () => import('./materia/materia.module').then(m => m.MateriaModule), canActivate: [AuthGuard] },
  { path: 'cargo',loadChildren: () => import('./cargo/cargo.module').then(m => m.CargoModule), canActivate: [AuthGuard] },
  { path: 'funcao',loadChildren: () => import('./funcao/funcao.module').then(m => m.FuncaoModule), canActivate: [AuthGuard] },
  { path: 'areatematica',loadChildren: () => import('./area-tematica/area-tematica.module').then(m => m.AreaTematicaModule), canActivate: [AuthGuard] },
  { path: 'capacidadetecnica',loadChildren: () => import('./capacidade-tecnica/capacidade-tecnica.module').then(m => m.CapacidadeTecnicaModule), canActivate: [AuthGuard] },
  { path: 'questionario',loadChildren: () => import('./questionario/questionario.module').then(m => m.QuestionarioModule), canActivate: [AuthGuard] },

 ]; 
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  
  export class CurriculumCadastrosRoutingModule { }