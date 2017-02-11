import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'demo', loadChildren: './+demo#DemoSignInModule'},
  { path: '**',    component: NoContentComponent },
];
