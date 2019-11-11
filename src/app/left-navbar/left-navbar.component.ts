import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.css']
})
export class LeftNavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  selected='home';
  gotoHome(){
    this.router.navigate(['home']);
  }
  gotoTeachers(){
    this.router.navigate(['view-teacher']);
  }
  gotoStudents(){
    this.router.navigate(['view-student']);
  }

}
