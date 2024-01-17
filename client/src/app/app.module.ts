import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';
import { EmployeeDocsComponent } from './components/employee-docs/employee-docs.component';
import { AccordionModule } from 'primeng/accordion';
import { UploadDocsComponent } from './components/upload-docs/upload-docs.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EmployeeInfoComponent,
    EmployeeDocsComponent,
    UploadDocsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    ToggleButtonModule,
    ButtonModule,
    AccordionModule,
    FileUploadModule,
    ToastModule,
    TooltipModule,
    DialogModule,
    ProgressSpinnerModule,
    InputMaskModule
  ],
  providers: [
    MessageService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
