import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-employee-docs',
  templateUrl: './employee-docs.component.html',
  styleUrl: './employee-docs.component.scss'
})
export class EmployeeDocsComponent implements OnInit{
  public visible: boolean = false;
  public selectedDocs:any = [];
  public documentType:string = '';
  public retrievedFiles:any = {};
  constructor(private utilService:UtilService,private router:Router, private fileUploadService: FileUploadService){}

  ngOnInit(): void {
    this.retrievedFiles = this.utilService.getEmpDocs();
  }

  handleDocs(docType:string){
    this.visible = true;
    this.selectedDocs = this.retrievedFiles[docType] ? this.retrievedFiles[docType] : [];
    this.documentType = docType == "IDs" ? "Identity Proofs" : docType;

  }

  onBackClick(){
    this.router.navigate(['employeeInfo']);
  }

}
