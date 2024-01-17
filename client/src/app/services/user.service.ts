import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public base_URL = 'https://employee-dashboard-0msz.onrender.com';
  // public base_URL = 'http://localhost:3000'
 
  constructor(private http : HttpClient) { }

  createUser(files:any):Observable<any>{
    return this.http.post<any>(`${this.base_URL}/users/create-user`, files);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.base_URL}/users`);
  }
  
  updateUser(id:string,userObj:any):Observable<any>{
    return this.http.post<any>(`${this.base_URL}/users/update-user/${id}`, userObj);
  }

  removeUser(id:string):Observable<any>{
    return this.http.delete<any>(`${this.base_URL}/users/delete-user/:id`);
  }
}
