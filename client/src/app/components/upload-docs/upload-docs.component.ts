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
  constructor(
    private messageService: MessageService, 
    private utilService:UtilService,
    private router:Router,
    private fileUploadService: FileUploadService
    ){}
  
  ngOnInit(): void {
    this.selectedEmpData = this.utilService.getSelectedEmpData();
    }

  onFileChange(event: any, fileType:string) {
    this.submitFlag = false;
    let file = event.target.files[0];
    let fileExists = this.uploadedFiles.find((eachFile:any)=>eachFile.name==file.name);
    if(!fileExists){
      const docObj= {
        name: file.name,
        type: file.type,
        "file_type": fileType
    };
      this.selectedFiles[fileType].push(event.target.files[0].name)
      this.uploadedFiles.push(file);
    }else{
      alert('file exists already ')
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
    this.fileUploadService.uploadFiles(formData).subscribe((res) => {
      console.log('Files uploaded successfully:', res);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Documents uploaded successfully!!' });
      this.submitFlag = true;
      setTimeout(()=>this.onBackClick(),1000);     
    });
  }

}
