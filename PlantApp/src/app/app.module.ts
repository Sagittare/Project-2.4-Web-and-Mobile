import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { PlantComponent } from './plant/plant.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthService } from './auth.service';
import { JwtInterceptor} from './jwt.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './auth-guard.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TileComponent } from './tile/tile.component';
import { UserManipulatorService } from './user-manipulator.service';
import { DataService } from './data.service';
import { GridAssemblerComponent } from './grid-assembler/grid-assembler.component';
import { PlantAdderComponent } from './plant-adder/plant-adder.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    MainComponent,
    PlantComponent,
    SettingsComponent,
    TileComponent,
    GridAssemblerComponent,
    PlantAdderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() { 
        return localStorage.getItem('token');
        } 
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    JwtInterceptor,
    AuthService,
    AuthGuardService,
    JwtHelperService,
    UserManipulatorService,
    DataService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
