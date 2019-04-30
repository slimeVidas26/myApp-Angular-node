import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
// add HTTP_INTERCEPTORS 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiService } from './api.service';
import { UsersService } from './users.service';

import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { PrivateComponent } from './private.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users.component';

// import token interceptor service
// > ng g s token-interceptor
import { TokenInterceptorService } from './token-interceptor.service';
// import route guard 
// > ng g guard auth
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PrivateComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    UsersService,
    AuthGuard, // import auth guard
    // add unique provider definition to enable interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
