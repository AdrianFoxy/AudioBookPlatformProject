import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { anonGuard } from '../core/guards/anon.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [anonGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [anonGuard]}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
