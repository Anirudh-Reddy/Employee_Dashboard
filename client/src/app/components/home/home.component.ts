import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import employeeStaticData from '../../models/employees.json';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';

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

  constructor(private fb: FormBuilder, private router: Router,private utilService:UtilService) {}

  ngOnInit() {
    this.employees = employeeStaticData;
  }

  filterEmployees(event: any) {
      this.employeeList = this.employees?.filter(emp=>emp.employeeName.toLowerCase().indexOf(event.query.toLowerCase())>-1)
  }

  onSubmit(){
    const selectedEmpData = this.employeeForm.getRawValue().selectedEmployee;
    if(!selectedEmpData) return;

    window.localStorage.setItem("selected-emp",JSON.stringify(selectedEmpData));
    this.utilService.setSelectedEmpData(selectedEmpData)
    this.router.navigate(['employeeInfo'])
  } 
}
