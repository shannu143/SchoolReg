import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { Router } from '@angular/router';
import { Teacher } from '../teacher';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  model: any = {};
  constructor(private techservice:TeacherService,private router:Router) { }

  ngOnInit() {
  }
  teacher:Teacher = new Teacher();
  onSubmit(form){
    this.techservice.postdata(form.value).subscribe(data => this.aftersave(data), error => console.log(error));
  }
  cnclAddTchr(){
    this.router.navigate(["/view-teacher"]);
  }
  aftersave(data){
    this.router.navigate(['view-teacher']);
  }
}
