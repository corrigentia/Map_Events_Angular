import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './shared/shared.module';

import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { EventsComponent } from './events/events.component';
import { MenuComponent } from './menu/menu.component';
import { EventsFormsComponent } from './events/forms.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AuthInterceptor } from './shared/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { EventComponent } from './events/event.component';
//import { CurrencyMaskModule } from 'ng2-currency-mask';
//import { LocaleCurrencyInputModule } from 'locale-currency-input';
//import { AgmCoreModule } from '@agm/core';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    EventsFormsComponent,
    EventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    GoogleMapsModule,
    MatFormFieldModule,
    MatSelectModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
    //CurrencyMaskModule,
    //LocaleCurrencyInputModule,
    //AgmCoreModule.forRoot({
    //  apiKey: 'AIzaSyDyA48CHIxG5GRydSj33Eyourrl5hiDHoY',
    //}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    [MenuComponent],
    [EventsComponent],
    { provide: MAT_DATE_LOCALE, useValue: 'fr' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}


