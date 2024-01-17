import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import employeeStaticData from '../../models/employees.json';
import { UtilService } from '../../services/util.service';
import { UserService } from '../../services/user.service';

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

  public employeeList: any[] = [];
  public isLoading :boolean = false;
  public selectedEmployeeData:any={};
  public retrievedFiles:any
  public documentObj = {
    documentsList:["Visa","Transcripts","IDs","Payslips"],
    documents:{
            "Visa":[],
            "Transcripts":[],
            "IDs":[],
            "Payslips":[]
      }
  }

  constructor(
     private fb: FormBuilder,
     private utilService:UtilService,
     private userService:UserService
     ) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(res=>{
      this.employees = res.map((emp:any)=>({...emp,...this.documentObj}));
    })
    this.utilService.handleServiceCallObservable$.subscribe((res:boolean)=>{
      this.isLoading = res;
    })
  }

  filterEmployees(event: any) {
      this.employeeList = this.employees?.filter(emp=>emp.employeeName.toLowerCase().indexOf(event.query.toLowerCase())>-1)
  }

  onSubmit(){
    this.selectedEmployeeData = this.employeeForm.getRawValue().selectedEmployee;
    if(!this.selectedEmployeeData || !this.selectedEmployeeData.id) {
      alert("Enter valid name"),
      this.employeeForm.get('selectedEmployee')?.patchValue('');
      return;
    }
    this.utilService.handleServiceCall(true);
    localStorage.setItem("selected-emp",JSON.stringify(this.selectedEmployeeData));
    this.utilService.setSelectedEmpData(this.selectedEmployeeData);
    this.utilService.handleFileRetrieving('employeeInfo');
  }

}
