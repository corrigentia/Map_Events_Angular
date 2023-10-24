import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";

import { GoogleMapDemo } from './google-map/google-map-demo';
import { EventsFormsComponent } from './events/forms.component';
import { adminGuard } from './shared/admin.guard';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  //{ path: 'login', component: LoginComponent },
  { path: 'googlemap', component: GoogleMapDemo },
  {
    path: 'events/add',
    component: EventsFormsComponent,
    canActivate: [adminGuard],
  },
  /*
  {
    path: 'demos',
    component: DemoComponent,
    children: [
      { path: 'bindings', component: BindingsComponent },
      {
        path: 'privateAccess',
        component: PrivateCompoComponent,
        canActivate: [privateAccessGuard],
      },
      { path: 'types', component: TypagesComponent },
    ],
  },*/
  /*
  {
    path: 'exercices',
    //canActivateChild: [privateAccessChildGuard],
    component: ExerciceComponent,
    children: [
      { path: 'chrono', component: ChronoComponent },
      { path: 'pipeCustom', component: PipeCustomComponent },
      { path: 'cartv1', component: CartV1Component },
      { path: 'customDirective', component: ExosCustomDirectiveComponent },
      { path: 'cartv2', component: ListArticlesComponent },
      { path: 'cartv3', component: CartV3Component },
    ],
  },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
