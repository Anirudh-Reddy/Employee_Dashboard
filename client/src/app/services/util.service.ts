import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public selectedEmployee = {};
  public employeeDocsData = {};
  constructor() { }

  setSelectedEmpData(empObj:any){
    this.selectedEmployee = empObj;
  }

  getSelectedEmpData(){
    if(Object.keys(this.selectedEmployee).length){
      return this.selectedEmployee;
    }else{
      const data:any = typeof window !== 'undefined' ? localStorage.getItem("selected-emp") : null
      return JSON.parse(data);
    }  
  }

  setEmpDocs(docs:{}){
    this.employeeDocsData = docs;
  }

  getEmpDocs(){
    if(Object.keys(this.employeeDocsData).length){
      return this.employeeDocsData;
    }else{
      const data:any = typeof window !== 'undefined' ? localStorage.getItem("emp-docs") : null
      return JSON.parse(data);
    }
  }
}
