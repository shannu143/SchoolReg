import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import * as CanvasJS from '/canvasjs.min';
import {Courses} from '../courseenum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  options: any;
  courseSelected: any = 0;
  teacherSelected: any = 0;
  students:any =[];
  TotalStudent:any = [];
  constructor(private studentservice: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }
  coursechng() {
    this.studentservice.getTechbyCourse(this.courseSelected).subscribe(data => this.options = data, error => console.log(error));
  }
  getStudentsList() {
    this.studentservice.getstudentbycat(this.courseSelected, this.teacherSelected).subscribe(data => this.students = data, error => console.log(error));
  }
  getStudents(){
    this.studentservice.getStudentBycourse().subscribe(data => {
      this.TotalStudent = data;
      let total =0;
      for(let i=0;i<this.TotalStudent.length;i++){
        total = total+this.TotalStudent[i][0];
      }
      var dataPoints =[];
      for(let i=0;i<this.TotalStudent.length;i++){
        var obj ={};
          obj["y"] = this.TotalStudent[i][0];
          if(this.TotalStudent[i][1] == 1){
            obj["label"] = "JAVA";
          }else if(this.TotalStudent[i][1] == 2){
            obj["label"] = "NODEJS";
          }else if(this.TotalStudent[i][1] == 3){
            obj["label"] = "SPRING";
          }
          else if(this.TotalStudent[i][1] == 4){
            obj["label"] = "ANGULAR";
          }else{
            obj["label"] = "Hibernate";
          }
          dataPoints.push(obj);
      }
      this.prepareChart(dataPoints,"pie","chartContainer","Student Course ");
      this.prepareChart(dataPoints,"column","chartContainer1","");
      console.log(dataPoints);
    },error=>console.log(error));
  }
  prepareChart(dataPoint,type,renderdiv,text){
    let chart = new CanvasJS.Chart(renderdiv, {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: text
      },
      data: [{
        type: type,
        dataPoints: dataPoint
      }]
    });
     
    chart.render();
  }

}
