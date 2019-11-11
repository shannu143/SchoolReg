import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Student } from '../student';
import { Address } from '../address';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private studentservice:StudentService,private router:Router) { }

  student : Student=new Student();
  address: Address=new Address();
  submitted = false;
  options:any;

  ngOnInit() {
    this.submitted=false;
  }

  studentsaveform=new FormGroup({
    name:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),
    email:new FormControl('',[Validators.required,Validators.email]),
    branch:new FormControl(),
    course_id:new FormControl(),
    teacher_id:new FormControl(),
    address:new FormGroup({
      area:new FormControl('',Validators.required),
      state:new FormControl('',Validators.required),
      city:new FormControl('',Validators.required),
      pincode:new FormControl()
    })
  });

  saveStudent(saveStudent){
    this.student=new Student();
    this.address= new Address();   
    this.student.name=this.StudentName.value;
    this.student.email=this.StudentEmail.value;
    this.student.branch=this.StudentBranch.value;
    this.student.course_id=this.studentsaveform.get('course_id').value;
    this.student.teacher_id=this.studentsaveform.get('teacher_id').value;
    this.address.area = this.studentsaveform.get('address').value['area'];
    this.address.state = this.studentsaveform.get('address').value['state'];
    this.address.city = this.studentsaveform.get('address').value['city'];
    this.address.pincode = this.studentsaveform.get('address').value['pincode'];
    this.student.address =this.address;
    this.submitted = true;
    this.save();
  }
  coursechng(){
    this.studentservice.getTechbyCourse(this.studentsaveform.get('course_id').value).subscribe(data=>this.options =data,error=>console.log(error));
  }
  save() {
     this.studentservice.createStudent(this.student)
       .subscribe(data => this.aftersave(data), error => console.log(error));
     this.student = new Student();
  }
  aftersave(data){
    //alert("dsdsds");
    this.router.navigate(['/view-student'])
  }
  get StudentName(){
    return this.studentsaveform.get('name');
  }

  get StudentEmail(){
    return this.studentsaveform.get('email');
  }

  get StudentBranch(){
    return this.studentsaveform.get('branch');
  }
 
  cnclAddStd(){
    this.router.navigate(["/view-student"]);
  }
  addStudentForm(){
    this.submitted=false;
    this.studentsaveform.reset();
  }
}
