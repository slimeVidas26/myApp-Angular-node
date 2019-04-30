import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { PrivateComponent } from './private.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users.component';

// load auth guard
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'private',
        component: PrivateComponent,
        canActivate: [AuthGuard],
        data: {
            minLevelAllowed: 1
        }
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: {
            minLevelAllowed: 2
        }
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
        data: {
            minLevelAllowed: 2
        }
       
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
