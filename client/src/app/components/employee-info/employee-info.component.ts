import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router:Router){}

  ngOnInit(): void {
    this.selectedEmployeeData = this.utilService.getSelectedEmpData();
    this.employeeForm.patchValue(this.selectedEmployeeData);
  }

  uploadDocs(){
    this.router.navigate(['uploadDocs']);
  }

  onBackClick(){
    this.router.navigate(['home']);
  }
}
