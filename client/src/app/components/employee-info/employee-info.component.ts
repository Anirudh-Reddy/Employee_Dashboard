import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrl: './employee-info.component.scss'
})
export class EmployeeInfoComponent implements OnInit{

  public employeeForm:FormGroup= this.fb.group({
    id: ['', Validators.required],
    employeeName: ['', Validators.required],
    age: ['', Validators.required],
    DOB: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.pattern(/^\d{10}$/)],
    position: [''],
    address: [''],
    experience:[0]
  }); 
  public selectedEmployeeData:any={};
  public retrievedFiles:any
  public isLoading :boolean = false;
  constructor(
    private utilService:UtilService,
    private fb: FormBuilder,
    private router:Router,
    private fileUploadService:FileUploadService){}

  ngOnInit(): void {
    this.selectedEmployeeData = this.utilService.getSelectedEmpData();
    this.employeeForm.patchValue(this.selectedEmployeeData);
  }

  uploadDocs(){
    this.router.navigate(['uploadDocs']);
  }
  
  openDocs(){
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
      this.router.navigate(['employee-docs']);
    },(err)=>{
      this.isLoading = false;
      console.error(err);
      document.body.style.overflow = ""; 
      this.router.navigate(['employee-docs']);
      if(typeof window !== 'undefined'){
        localStorage.setItem("emp-docs",JSON.stringify({}));
      }
    })
  }

  onBackClick(){
    this.router.navigate(['home']);
  }
}
