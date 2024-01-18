import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  public selectedEmployeeData:any = {};
  public selectedEmployeeDocs:any = {};
  constructor(private utilService:UtilService){}

  ngOnInit(): void {
    if(typeof window !== 'undefined'){
      this.selectedEmployeeData = localStorage.getItem('selected-emp');
      this.selectedEmployeeDocs = localStorage.getItem('emp-docs');
      if(this.selectedEmployeeData){
        this.utilService.setSelectedEmpData(JSON.parse(this.selectedEmployeeData));
      }
      if(this.selectedEmployeeDocs){
        this.utilService.setEmpDocs(JSON.parse(this.selectedEmployeeDocs));
      }
    }
  }

}
