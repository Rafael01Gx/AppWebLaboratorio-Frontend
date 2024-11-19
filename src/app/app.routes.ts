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
import { ForgotPassowrdComponent } from './pages/forgot-passowrd/forgot-passowrd.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { NovaOsComponent } from './components/componentes-ordem-de-servico/nova-os/nova-os.component';
import { OsPendentesComponent } from './components/componentes-ordem-de-servico/os-pendentes/os-pendentes.component';
import { OsFinalizadasComponent } from './components/componentes-ordem-de-servico/os-finalizadas/os-finalizadas.component';
import { RelatorioDeAnaliseComponent } from './components/relatorio-de-analise/relatorio-de-analise.component';

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
     },
   {
      path: 'forgot-password',
      component: ForgotPassowrdComponent
     },
   {
      path: 'recovery-password/reset_password',
      component: RecoveryPasswordComponent
     },
   {
      path: 'gerenciar-contas',
      component: DashboardComponent,
      canActivate:[AuthGuard]
     },
     {
      path: 'perfil',
      component: UserProfileComponent,
      canActivate:[AuthGuard]
     },{
      path:'ordem-de-servico',component:OsPageComponent,children:[
      { path: '', redirectTo: 'nova-ordem-de-servico', pathMatch: 'full' },
      { path: 'nova-ordem-de-servico', component: NovaOsComponent },
      { path: 'aguardando-analise', component: OsPendentesComponent },
      { path: 'ordem-de-servico-concluidas', component: OsFinalizadasComponent }
      ],
      canActivate:[AuthGuard]
     },
     { path: 'gerenciar-os', component: ManageOsComponent, children: [
      { path: '', redirectTo: 'aguardando-autorizacao', pathMatch: 'full' },
      { path: 'aguardando-autorizacao', component: GerenciarOsAguardandoAutorizacaoComponent },
      { path: 'aguardando-analise', component: GerenciarOsAutorizadasComponent },
      { path: 'os-em-andamento', component: GerenciarOsEmExecucaoComponent },
      { path: 'finalizadas', component: GerenciarOsFinalizadasComponent },
    ],
    canActivate:[AuthGuard]
  },
  {
      path: 'configuracoes',
      component: ConfiguracoesComponent,
      canActivate:[AuthGuard]
  },
  {
    path: 'relatorio-de-analises',
    component: RelatorioDeAnaliseComponent,
    canActivate:[AuthGuard]
},
     { path: 'analises', component: AnalisesComponent, children: [
      { path: '', redirectTo: 'aguardando-autorizacao', pathMatch: 'full' },
      { path: 'aguardando-autorizacao', component: AguardandoAutorizacaoComponent },
      { path: 'aguardando-analise', component: AguardandoAnaliseComponent },
      { path: 'analise-em-andamento', component: AnaliseEmAnamentoComponent },
      { path: 'finalizadas', component: AnalisesFinalizadasComponent },
    ],
    canActivate:[AuthGuard]
  }
];
