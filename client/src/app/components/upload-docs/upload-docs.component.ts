import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload-docs',
  templateUrl: './upload-docs.component.html',
  styleUrl: './upload-docs.component.scss'
})
export class UploadDocsComponent implements OnInit{
  public selectedEmpData:any = {};
  public uploadedFiles:any[] = [];
  public selectedFiles:any = {
    "Visa" : [],
    "Transcripts" : [],
    "IDs" : [],
    "Payslips" : []
  };
  public submitFlag:boolean=true;
  public retrievedFiles:any;
  public toUpdate:boolean=false;
  public uploadedFileNames:any = {
    "Visa" : [],
    "Transcripts" : [],
    "IDs" : [],
    "Payslips" : []
  };
  public isLoading:boolean = false;
  constructor(
    private messageService: MessageService, 
    private utilService:UtilService,
    private router:Router,
    private fileUploadService: FileUploadService
    ){}
  
  ngOnInit(): void {
    this.selectedEmpData = this.utilService.getSelectedEmpData();
    this.retrievedFiles = Object.keys(this.utilService.getEmpDocs()).length ? this.utilService.getEmpDocs() : this.selectedFiles;
    this.handleRetrievedFilesData();
    this.utilService.handleServiceCallObservable$.subscribe((res:boolean)=>{
      this.isLoading = res;
    })
  }

  handleRetrievedFilesData(){
    Object.keys(this.selectedFiles).forEach(key=>{
      if(this.retrievedFiles[key].length){
        this.retrievedFiles[key].forEach((file:any)=>{
          const filesExists = this.selectedEmpData.documents[key].find((fl:any)=>fl.originalname==file.originalname)
          if(!filesExists) this.selectedEmpData.documents[key].push(file);
        })
      }
    })
  }

  onFileChange(event: any, fileType:string) {
    this.submitFlag = false;
    let file = event.target.files[0];
    let fileExists = this.uploadedFiles.find((eachFile:any)=>eachFile.name==file.name);
    if(!fileExists){
      this.uploadedFiles.push(file);
      this.selectedFiles[fileType].push(event.target.files[0].name)
      this.selectedEmpData.documents[fileType].push(event.target.files[0]);
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File Already Exists!!' });
    }
  }

  onBackClick(){
    this.router.navigate(['employeeInfo']);
  }

  onSubmit(){
    const formData = new FormData();
    this.uploadedFiles.forEach((file:any)=>{
            formData.append("files",file);
    })
    formData.append("doc_files",JSON.stringify({userId:this.selectedEmpData.id, selectedFiles:this.selectedFiles}))
    if(!this.utilService.isUpdated){
      this.fileUploadService.uploadFiles(formData).subscribe((res) => {
        console.log('Files uploaded successfully:', res);
        this.utilService.isUpdated = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Documents uploaded successfully!!' });
        this.submitFlag = true;
        window.scrollTo(0,0);
      });
    }else{
      this.fileUploadService.updateFiles(formData).subscribe((res) => {
        console.log('Files updated successfully:', res);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Documents uploaded successfully!!' });
        this.submitFlag = true;
        window.scrollTo(0,0);
      });
    }
  }

  openDocs(){
    this.utilService.handleFileRetrieving('employee-docs');
  }
}
