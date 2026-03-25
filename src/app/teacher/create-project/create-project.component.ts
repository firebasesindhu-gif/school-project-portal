import { Component } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-project',
  imports: [CommonModule, FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {

  dataSource: any = {
    title: "",
    membersText: "",
    description: ""
  }
  flags: any = {
    isCreationInProgress: false
  }

  constructor(private service: TeacherService, private router: Router,
    private dialogRef: MatDialogRef<CreateProjectComponent>) { }

  create() {
    this.flags.isCreationInProgress = true;
    if (!this.dataSource.title || !this.dataSource.membersText) {
      alert("Please provide all the required fields to create the project");
      this.flags.isCreationInProgress = false;
    } else {
      const members = this.dataSource.membersText.split(",").map((m: any) => m.trim());
      const data = {
        title: this.dataSource.title,
        members: members,
        description: this.dataSource.description,
        createdAt: new Date(),
        status: "created",
        createdBy: localStorage.getItem("email")
      };
      this.service.createProject(data)
        .subscribe(() => {
          alert("Project Created");
          this.flags.isCreationInProgress = false;
          this.dialogRef.close("success");
          // this.router.navigate(["teacher-dashboard"]);
        }, (error: any) => {
          alert(error);
        });
    }
  }

  close() {
    this.dialogRef.close();
  }

}