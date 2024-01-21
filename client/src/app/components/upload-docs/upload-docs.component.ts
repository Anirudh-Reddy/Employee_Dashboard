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
  public assignvalues:any = {
    "Visa" : [],
    "Transcripts" : [],
    "IDs" : [],
    "Payslips" : []
  };
  public isLoading:boolean = false;
  public isDocsUploaded:boolean = true;
  constructor(
    private messageService: MessageService, 
    private utilService:UtilService,
    private router:Router,
    private fileUploadService: FileUploadService
    ){}
  
  ngOnInit(): void {
    this.selectedEmpData = this.utilService.getSelectedEmpData();
    this.retrievedFiles = this.utilService.getEmpDocs()!==null && Object.keys(this.utilService.getEmpDocs()).length ? this.utilService.getEmpDocs() : this.assignvalues;
    this.handleRetrievedFilesData();
    this.utilService.handleServiceCallObservable$.subscribe((res:boolean)=>{
      this.isLoading = res;
    })
  }

  handleRetrievedFilesData(){
    Object.keys(this.selectedFiles).forEach(key=>{
      if(this.retrievedFiles[key].length){
        this.retrievedFiles[key].forEach((file:any)=>{
          const filesExists = this.selectedEmpData.documents[key].find((fl:any)=>fl.originalname || fl.name == file.originalname);
          if(!filesExists) this.selectedEmpData.documents[key].push(file);
        })
      }
    })
  }

  onFileChange(event: any, fileType:string) {
    this.submitFlag = false;
    let file = event.target.files[0];
    let fileExists = this.uploadedFiles.length && (this.uploadedFiles.find((eachFile:any)=>eachFile.name==file.name) || this.isFileAlreadyUploaded(file));
    if(!fileExists){
      this.uploadedFiles.push(file);
      this.isDocsUploaded = false;
      this.selectedFiles[fileType].push(event.target.files[0].name)
      this.selectedEmpData.documents[fileType].push(event.target.files[0]);
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File Already Exists!!' });
    }
  }

  isFileAlreadyUploaded(file: any): boolean {
    return Object.keys(this.retrievedFiles).some(key =>
      this.retrievedFiles[key].some((fl: any) => fl.originalname === file.name)
    );
  }

  onBackClick(){
    this.router.navigate(['employeeInfo']);
  }

  onSubmit(){
    const formData = new FormData();
    this.uploadedFiles.forEach((file:any)=>{
            formData.append("files",file);
    })
    this.utilService.handleServiceCall(true);
    formData.append("doc_files",JSON.stringify({userId:this.selectedEmpData.id, selectedFiles:this.selectedFiles}))
    if(!this.utilService.isUpdated){
      this.fileUploadService.uploadFiles(formData).subscribe((res) => {
        console.log('Files uploaded successfully:', res);
        this.utilService.isUpdated = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Documents uploaded successfully!!' });
        this.submitFlag = true;
        this.utilService.handleServiceCall(false);
        window.scrollTo(0,0);
      },(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload files!!' });
        this.uploadedFiles = []
        this.utilService.handleServiceCall(false);
      });
    }else{
      this.fileUploadService.updateFiles(formData).subscribe((res) => {
        console.log('Files updated successfully:', res);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Documents uploaded successfully!!' });
        this.submitFlag = true;
        this.utilService.handleServiceCall(false);
        window.scrollTo(0,0);
      },(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update files!!' });
        this.uploadedFiles = []
        this.utilService.handleServiceCall(false);
      });
    }
    this.isDocsUploaded = true;
  }

  openDocs(){
    if(!this.isDocsUploaded){
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please click on submit to upload the documents!!' });
    }else if(!this.utilService.formSaved){
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please save the form!!' });
    }else{
      this.utilService.handleFileRetrieving('employee-docs');
    }
  }

  handleFormAndUploadChanges(route:string){
    this.handleFormAndUploadChanges('employee-docs');
    this.handleFormAndUploadChanges('employeeInfo');
  }

  removeFile(file:any,fileType:string,id:string){
    if(file.name!==undefined && !this.submitFlag){
      this.handleRemoveFile(file,fileType);
    }else{
      const payload = {
        filename : file.originalname || file.name,
        id : id,
        fileType : fileType
      }
      this.fileUploadService.removeFile(payload).subscribe(() => {
        console.log('File removed successfully from the server:', file);
        this.handleRemoveFile(file,fileType);
      }, (error) => {
        console.error('Failed to remove file from the server:', error);
      });
    }
    this.submitFlag = this.uploadedFiles.length ? false : true;
  }
  handleRemoveFile(file:any,fileType:string){
    let selectedEmpDataIdx = this.selectedEmpData.documents[fileType].findIndex((emp:any)=>emp.name === file.name);
    if(selectedEmpDataIdx>-1){
      this.selectedEmpData.documents[fileType].splice(selectedEmpDataIdx,1);
    }
    let uploadedFileIdx =  this.uploadedFiles.findIndex((uploadedFile: any) => uploadedFile.name === file.name);
    if (uploadedFileIdx > -1) {
      this.uploadedFiles.splice(uploadedFileIdx, 1);
    }
    let retrievedFileIdx = this.retrievedFiles[fileType].findIndex((fl:any)=>fl.originalname == file.name);
        if(retrievedFileIdx>-1){
          this.retrievedFiles[fileType].splice(retrievedFileIdx,1);
    }
    localStorage.setItem("emp-docs",JSON.stringify(this.retrievedFiles));
  }
}
