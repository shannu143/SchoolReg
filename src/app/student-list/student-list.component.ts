import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { Observable, Subject } from "rxjs";
import { Address } from '../address';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private studentservice: StudentService, private route: Router) { }
  stdntSrchElmnt
  studentsArray: any[] = [];
  object:any[];
  //dtOptions: DataTables.Settings = {};
  //dtTrigger: Subject<any>= new Subject();


 // students: Observable<Student[]>;
  students:any[];
  student: Student = new Student();
  address: Address = new Address();
  deleteMessage = false;
  studentlist: any;
  isupdated = false;
  error = false;

  ngOnInit() {
    this.isupdated = false;
    /*  this.dtOptions = {
        pageLength: 6,
        stateSave:true,
        lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
        processing: true
      };   */
    this.studentservice.getStudentList().subscribe(data => {
      this.students = data;
      this.object=data;
      // this.dtTrigger.next();
    })
  }

  deleteStudent(id: number) {
    this.studentservice.deleteStudent(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage = true;
          this.studentservice.getStudentList().subscribe(data => {
            this.students = data
          })
        },
        error => console.log(error));
  }


  updateStudent(id: number) {
    this.studentservice.getStudent(id)
      .subscribe(
        data => {
          this.studentlist = data
        },
        error => console.log(error));
  }

  studentupdateform = new FormGroup({
    student_id: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    branch: new FormControl(),
    address: new FormGroup({
      address_id: new FormControl(),
      area: new FormControl(),
      state: new FormControl(),
      pincode: new FormControl(),
      city: new FormControl()
    })
  });

  updateStu(updstu) {
    this.student = new Student();
    this.student.student_id = this.StudentId.value;
    this.student.name = this.StudentName.value;
    this.student.email = this.StudentEmail.value;
    this.student.branch = this.StudentBranch.value;
    this.address.address_id = this.studentupdateform.get('address').value['address_id'];
    this.address.area = this.studentupdateform.get('address').value['area'];
    this.address.state = this.studentupdateform.get('address').value['state'];
    this.address.city = this.studentupdateform.get('address').value['city'];
    this.address.pincode = this.studentupdateform.get('address').value['pincode'];
    this.student.address = this.address;
    console.log(this.StudentBranch.value);


    this.studentservice.updateStudent(this.student.student_id, this.student).subscribe(
      data => {
        this.isupdated = true;
        this.studentservice.getStudentList().subscribe(data => {
          this.students = data
        })
      },
      error => console.log(error));
  }

  get StudentName() {
    return this.studentupdateform.get('name');
  }

  get StudentEmail() {
    return this.studentupdateform.get('email');
  }

  get StudentBranch() {
    return this.studentupdateform.get('branch');
  }

  get StudentId() {
    return this.studentupdateform.get('student_id');
  }

  changeisUpdate() {
    this.isupdated = false;
  }
  addstudent() {
    this.route.navigate(['/add-student']);
  }
  stdntSrchFncn() {
    this.object=[];
    this.stdntSrchElmnt == ""?this.object = this.students:this.students.filter(data =>
       {
         data.name.toLowerCase().includes(this.stdntSrchElmnt.toLowerCase())?this.object.push(data):this.error=true;
       });
  }
}
