import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public selectedEmployee = {};
  public employeeDocs = {};
  constructor() { }

  setSelectedEmpData(empObj:any){
    this.selectedEmployee = empObj;
  }

  getSelectedEmpData(){
    if(Object.keys(this.selectedEmployee).length){
      return this.selectedEmployee;
    }else{
      const data:any = window.localStorage.getItem("selected-emp")
      return JSON.parse(data);
    }  
  }

  setEmpDocs(docs:{}){
    this.employeeDocs = docs;
  }

  getEmpDocs(){
    if(Object.keys(this.employeeDocs).length){
      return this.employeeDocs;
    }else{
      const data:any = localStorage.getItem("emp-docs")
      return JSON.parse(data);
    }
  }
}
