import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  public base_URL = 'https://employee-dashboard-0msz.onrender.com'
  //'http://localhost:3000'

  constructor(private http : HttpClient) { }
  uploadFiles(files:FormData):Observable<any>{
  return this.http.post<any>(`${this.base_URL}/uploadFiles`, files);
  }

  retrieveFiles(id:string): Observable<any> {
    return this.http.get<any>(`${this.base_URL}/uploadFiles/retrieve/${id}`);
  }
  
}