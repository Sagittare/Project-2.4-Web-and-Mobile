import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { TileComponent } from './tile/tile.component';
import { SettingsComponent } from './settings/settings.component';
import { GridAssemblerComponent } from './grid-assembler/grid-assembler.component';

const routes: Routes = [ 
  {path: '', children: [
    {path: 'main', 
    component: MainComponent,
    children: [
      {path: 'plants', component: GridAssemblerComponent}
    ]},
    {path: 'login', component: LoginComponent},
    {path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService]
    }
  ]},
  {path: '**', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
