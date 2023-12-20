import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TestErrorComponent } from './core/errors/test-error/test-error.component';
import { NotFoundComponent } from './core/errors/not-found/not-found.component';
import { ServerErrorComponent } from './core/errors/server-error/server-error.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'test-error', component: TestErrorComponent },
  {path: 'not-found', component: NotFoundComponent },
  {path: 'server-error', component: ServerErrorComponent },
  {path: 'library', loadChildren: () => import('./library/library.module').then(m => m.LibraryModule)},
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: 'selection', loadChildren: () => import('./selection/selection.module').then(m => m.SelectionModule)},
  {path: 'user-profile', loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule)},
  {path: 'admin', component: AdminComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
