import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public selectedEmployee :any= {};
  public employeeDocsData = {};
  public isUserUpdated:boolean=false;
  public isformSaved:boolean=true;
  private handleServiceCall$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  public handleServiceCallObservable$: Observable<boolean> = this.handleServiceCall$.asObservable();
  constructor(private router: Router, private fileUploadService : FileUploadService) { }

  setSelectedEmpData(empObj:any){
    this.selectedEmployee = empObj;
  }

  getSelectedEmpData(){
    if(this.selectedEmployee!==null && Object.keys(this.selectedEmployee).length){
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
    if(this.employeeDocsData!==null && Object.keys(this.employeeDocsData).length){
      return this.employeeDocsData;
    }else{
      const data:any = typeof window !== 'undefined' ? localStorage.getItem("emp-docs") : null
      return JSON.parse(data);
    }
  }

  set isUpdated(val:boolean){
    this.isUserUpdated = val;
  }

  get isUpdated(){
    return this.isUserUpdated;
  }

  set formSaved(val:boolean){
    this.isformSaved = val;
  }

  get formSaved(){
    return this.isformSaved;
  }

  handleServiceCall(flag:boolean){
    this.handleServiceCall$.next(flag);
  }

  handleFileRetrieving(routeVal:string){
    document.body.style.overflow = "hidden";
    this.fileUploadService.retrieveFiles(this.selectedEmployee.id).subscribe((res) => {
      console.log('Files retrieved successfully:', res);
      this.isUpdated = res.created ? true : false;
      document.body.style.overflow = "";
      this.setEmpDocs(res.files);
      if(typeof window !== 'undefined'){
        localStorage.setItem("emp-docs",JSON.stringify(res.files));
      }
      this.handleServiceCall(false);
      this.router.navigate([routeVal]);
    },(err)=>{
      console.error(err);
      document.body.style.overflow = ""; 
      this.isUpdated = false;
      if(typeof window !== 'undefined'){
        localStorage.setItem("emp-docs",JSON.stringify({}));
      }
      this.handleServiceCall(false);
      this.router.navigate([routeVal]);
    })
  }
}
