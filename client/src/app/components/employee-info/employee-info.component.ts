import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrl: './employee-info.component.scss'
})
export class EmployeeInfoComponent implements OnInit{

  public employeeForm:FormGroup= this.fb.group({
    id: ['', Validators.required],
    employeeName: ['', Validators.required],
    age: [0, Validators.required],
    DOB: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.pattern(/^\d{10}$/)],
    position: [''],
    address: [''],
    experience:[0]
  }); 
  public selectedEmployeeData:any={};
  public retrievedFiles:any
  public isLoading :boolean = false;
  public isFormEditable: boolean = false;
  public formAction:string = "Edit";
  constructor(
    private utilService:UtilService,
    private fb: FormBuilder,
    private router:Router,
    private userService:UserService,
    private messageService: MessageService){}

  ngOnInit(): void {
    this.selectedEmployeeData = this.utilService.getSelectedEmpData();
    this.selectedEmployeeData.DOB = this.formatDate(this.selectedEmployeeData.DOB);
    this.employeeForm.patchValue(this.selectedEmployeeData);
  }

  formatDate(date: string): string {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  }

  uploadDocs(){
    this.router.navigate(['uploadDocs']);
  }

  makeFormEditable(){
    if(this.isFormEditable){
      if(this.employeeForm.valid){
        this.onSubmitForm();
      }
    }
    this.isFormEditable = !this.isFormEditable;
    this.formAction = this.isFormEditable ? "Save" : "Edit";
  }

  onBackClick(){
    this.router.navigate(['home']);
  }

  onSubmitForm(){
    this.userService.updateUser(this.selectedEmployeeData._id,this.employeeForm.value).subscribe(res=>{
      console.log("user created : ",res);
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Form updated successfully!!' });
    })


  }
}
