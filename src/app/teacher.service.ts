import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from './teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = 'http://localhost:8044/api/teacher';

  constructor(private http:HttpClient) { }

  postdata(teacher:Teacher):Observable<object>{
    console.log(teacher);
    return this.http.post<Teacher>(this.baseUrl, teacher);
  }
  getdata():Observable<any> {
      return this.http.get(this.baseUrl);
  }
  delete(id):Observable<any>{
    return this.http.delete(this.baseUrl+`/${id}`);
  }
  

}
