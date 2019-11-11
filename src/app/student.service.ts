import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private baseUrl = 'http://localhost:8044/api';

  constructor(private http:HttpClient) { }

  getStudentList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students-list`);
  }

  createStudent(student: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'/save-student', student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-student/${id}`, { responseType: 'text' });
  }

  getStudent(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/student/${id}`);
  }

  updateStudent(id: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update-student/${id}`, value);
  }
  getTechbyCourse(course_id:number):Observable<any>{
     return this.http.get(`${this.baseUrl}/t/${course_id}`);
  }
  getstudentbycat(course_id:number,teacher_id:number){
    return this.http.get(`${this.baseUrl}/s/${course_id}/${teacher_id}`);
  }
  getStudentBycourse(){
    return this.http.get(`${this.baseUrl}/Count`);
  }
  
}                                           