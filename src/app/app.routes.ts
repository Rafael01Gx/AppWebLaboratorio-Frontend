import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/services/auth-guard/auth-guard.service';
import { DashboardComponent } from './pages/manage-accounts/manage-accounts.component';
import { OsPageComponent } from './pages/os-page/os-page.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { AnalisesComponent } from './pages/analises/analises.component';
import { AguardandoAutorizacaoComponent } from './components/componentes-analise/aguardando-autorizacao/aguardando-autorizacao.component';
import { AguardandoAnaliseComponent } from './components/componentes-analise/aguardando-analise/aguardando-analise.component';
import { AnaliseEmAnamentoComponent } from './components/componentes-analise/analise-em-anamento/analise-em-anamento.component';
import { AnalisesFinalizadasComponent } from './components/componentes-analise/analises-finalizadas/analises-finalizadas.component';
import { ManageOsComponent } from './pages/manage-os/manage-os.component';
import { OsAguardandoAutorizacaoComponent } from './components/componentes-ordem-de-servico/os-aguardando-autorizacao/os-aguardando-autorizacao.component';
import { GerenciarOsAguardandoAutorizacaoComponent } from './components/componentes-ordem-de-servico/gerenciar/gerenciar-os-aguardando-autorizacao/gerenciar-os-aguardando-autorizacao.component';
import { GerenciarOsAutorizadasComponent } from './components/componentes-ordem-de-servico/gerenciar/gerenciar-os-autorizadas/gerenciar-os-autorizadas.component';
import { GerenciarOsEmExecucaoComponent } from './components/componentes-ordem-de-servico/gerenciar/gerenciar-os-em-execucao/gerenciar-os-em-execucao.component';
import { GerenciarOsFinalizadasComponent } from './components/componentes-ordem-de-servico/gerenciar/gerenciar-os-finalizadas/gerenciar-os-finalizadas.component';

export const routes: Routes = [
   {
      path: '',
      component: HomeComponent,
      canActivate:[AuthGuard]
     },
   {
    path: 'login',
    component: LoginComponent
   },
   {
      path: 'criarconta',
      component: SignupComponent
     }
     ,
   {
      path: 'gerenciar-contas',
      component: DashboardComponent
     },
     {
      path: 'ordens-de-servico',
      component: OsPageComponent
     },
     {
      path: 'perfil',
      component: UserProfileComponent
     },
     { path: 'gerenciar-os', component: ManageOsComponent, children: [
      { path: '', redirectTo: 'aguardando-autorizacao', pathMatch: 'full' },
      { path: 'aguardando-autorizacao', component: GerenciarOsAguardandoAutorizacaoComponent },
      { path: 'aguardando-analise', component: GerenciarOsAutorizadasComponent },
      { path: 'os-em-andamento', component: GerenciarOsEmExecucaoComponent },
      { path: 'finalizadas', component: GerenciarOsFinalizadasComponent },
    ]
  },
     {
      path: 'configuracoes',
      component: ConfiguracoesComponent
     },
     { path: 'analises', component: AnalisesComponent, children: [
      { path: '', redirectTo: 'aguardando-autorizacao', pathMatch: 'full' },
      { path: 'aguardando-autorizacao', component: AguardandoAutorizacaoComponent },
      { path: 'aguardando-analise', component: AguardandoAnaliseComponent },
      { path: 'analise-em-andamento', component: AnaliseEmAnamentoComponent },
      { path: 'finalizadas', component: AnalisesFinalizadasComponent },
    ]
  }
];
