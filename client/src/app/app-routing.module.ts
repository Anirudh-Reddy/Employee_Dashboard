import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';
import { EmployeeDocsComponent } from './components/employee-docs/employee-docs.component';
import { UploadDocsComponent } from './components/upload-docs/upload-docs.component';

const routes: Routes = [
  { path:'home' , component:HomeComponent},
  { path:'employeeInfo' , component:EmployeeInfoComponent},
  { path:'employee-docs' , component:EmployeeDocsComponent},
  { path:'uploadDocs' , component:UploadDocsComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
