import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/Util-components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/User-components/login-page/login-page.component';
import { RegisterPageComponent } from './components/User-components/register-page/register-page.component';
import { OfficialCategoriesPageComponent } from './components/test-components/official-categories-page/official-categories-page.component';
import { OfficialTestPageComponent } from './components/test-components/official-test-page/official-test-page.component';
import { ForgotPasswordComponent } from './components/User-components/forgot-password/forgot-password.component';
import { UserAccountComponent } from './components/User-components/user-account/user-account.component';
import { EducationMaterialsComponent } from './components/Util-components/education-materials/education-materials.component';
import { AdminDashboardComponent } from './components/User-components/admin-dashboard/admin-dashboard.component';

import { TestHistoryPageComponent } from './components/test-components/test-history-page/test-history-page.component';
import { OfficialTestConstructorPageComponent } from './components/test-components/official-test-constructor-page/official-test-constructor-page.component';
const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'landing-page', component: LandingPageComponent },
  {
    path: 'official-categories/:subCat',
    component: OfficialCategoriesPageComponent,
  },
  { path: 'official-test/:subCat/:year', component: OfficialTestPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'user-account', component: UserAccountComponent },
  { path: 'education-materials', component: EducationMaterialsComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'test-history', component: TestHistoryPageComponent },
  {
    path: 'official-test-constructor',
    component: OfficialTestConstructorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponent = [
  LandingPageComponent,
  LoginPageComponent,
  RegisterPageComponent,
  LandingPageComponent,
  ForgotPasswordComponent,
  UserAccountComponent,
  OfficialCategoriesPageComponent,
  OfficialTestPageComponent,
  EducationMaterialsComponent,
  AdminDashboardComponent,
  TestHistoryPageComponent,
  OfficialTestConstructorPageComponent,
];
