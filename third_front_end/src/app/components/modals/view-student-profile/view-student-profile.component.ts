import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-view-student-profile',
  templateUrl: './view-student-profile.component.html',
  styleUrls: ['./view-student-profile.component.scss']
})
export class ViewStudentProfileComponent implements OnInit {
  student: any;
  faculty: any;
  loadingPage = true;

  constructor(
    private dialogRef: MatDialogRef<ViewStudentProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: any,
    private studentService: StudentService
  ) { }

  ngOnInit() {

    // console.log(this.Data);
    // this.id = this.Data.id;
    // this.entity = this.Data.entity;
    // if(this.entity == 'student') {
    //   this.loadStudent();
    // }

    if (this.Data.entity == 'student') {
      this.student = this.Data.user;
    }else if (this.Data.entity == 'faculty') {
      this.faculty = this.Data.user;
    }

    this.loadingPage = false;
  }


  // loadStudent() {
  //   this.studentService.getStudentByUserId(this.id)
  //     .then((res) => {
  //       console.log(res);
  //       this.student = res.student;
  //       this.loadingPage = false;
  //     })
  //     .catch((e) => {

  //     })
  // }

}
