import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  tchrSrchElmnt='';
  teachers:any[];
  object:any[] =[];
  error=false;
  deleteMessage=false;
  constructor(private techservice:TeacherService,private router:Router) { }

  ngOnInit() {
   this.getcall();
  }
  getcall(){
    this.techservice.getdata().subscribe(data =>{
      this.teachers=data;
       this.object=data
    },error => console.log(error));
  }
  deleteTeacher(id){
    this.techservice.delete(id).subscribe(data => {
      this.getcall();
      this.deleteMessage = true;
    } ,error=>console.log(error));
  }
  addteacher(){
    this.router.navigate(["/add-teacher"]);
  }
  tchrSrchFncn(){
    this.object=[];
    this.tchrSrchElmnt == ""?this.object = this.teachers:this.teachers.filter(data =>
       {
         data.firstName.toLowerCase().includes(this.tchrSrchElmnt.toLowerCase())?this.object.push(data):this.error=true;
       });
  }
}
