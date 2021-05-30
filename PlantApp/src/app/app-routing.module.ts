import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: '', children: [
    {path: 'main', component: MainComponent},
    {path: 'login', component: LoginComponent},
    {path: 'settings', component: SettingsComponent}
  ]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
