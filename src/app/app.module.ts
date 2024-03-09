import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { NewprofessionalComponent } from './components/newprofessional/newprofessional.component';

import {PanelModule} from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api'
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule, DatePipe } from '@angular/common'; // Importa DatePipe aquí
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MyprofileComponent,
    NewprofessionalComponent
  ],
  imports: [
    SelectButtonModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CardModule,
    ReactiveFormsModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    PanelModule,
    DialogModule,
    MenubarModule,
    ConfirmDialogModule,
    InputTextModule,
    ToastModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
  ],
  providers: [
    DatePipe,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
