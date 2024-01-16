import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import employeeStaticData from '../../models/employees.json';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  employees: any[] = [];

  employeeForm: FormGroup = this.fb.group({
    selectedEmployee :[""],
  });

  employeeList: any[] = [];
  public isLoading :boolean = false;
  public selectedEmployeeData:any={};
  public retrievedFiles:any

  constructor(
     private fb: FormBuilder,
     private router: Router,
     private utilService:UtilService,
     private fileUploadService : FileUploadService
     ) {}

  ngOnInit() {
    this.employees = employeeStaticData;
  }

  filterEmployees(event: any) {
      this.employeeList = this.employees?.filter(emp=>emp.employeeName.toLowerCase().indexOf(event.query.toLowerCase())>-1)
  }

  onSubmit(){
    this.selectedEmployeeData = this.employeeForm.getRawValue().selectedEmployee;
    if(!this.selectedEmployeeData) return;

    localStorage.setItem("selected-emp",JSON.stringify(this.selectedEmployeeData));
    this.utilService.setSelectedEmpData(this.selectedEmployeeData)
    this.handleEmployeeFilesData();
  } 

  handleEmployeeFilesData(){
    this.isLoading = true;
    document.body.style.overflow = "hidden";
    this.fileUploadService.retrieveFiles(this.selectedEmployeeData.id).subscribe((res) => {
      console.log('Files retrieved successfully:', res);
      this.retrievedFiles = res.files;
      this.isLoading = false;
      document.body.style.overflow = ""; 
      this.utilService.setEmpDocs(res.files);
      if(typeof window !== 'undefined'){
        localStorage.setItem("emp-docs",JSON.stringify(res.files));
      }
      this.router.navigate(['employeeInfo']);
      this.utilService.isUpdated = true;
    },(err)=>{
      this.isLoading = false;
      console.error(err);
      document.body.style.overflow = ""; 
      this.utilService.isUpdated = false;
      this.router.navigate(['employeeInfo']);
      if(typeof window !== 'undefined'){
        localStorage.setItem("emp-docs",JSON.stringify({}));
      }
    })
  }

}
