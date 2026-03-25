import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { environment } from '../../../environments/environment';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CreateProjectComponent } from '../create-project/create-project.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatCardModule, MatToolbarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class TeacherDashboardComponent implements OnInit {

  projects: any[] = [];
  dataSource: any = {};

  constructor(private firestore: Firestore, private router: Router, private service: TeacherService,
    private dialog: MatDialog) { }

  // ngOnInit() {
  //   this.dataSource.userName = localStorage.getItem("userName");
  //   const ref = collection(this.firestore, "projects");
  //   collectionData(ref, { idField: 'id' })
  //     .subscribe((data: any) => {
  //       this.projects = data;
  //       this.projects.forEach((project: any, index: any) => {
  //         project.serialNumber = index + 1;
  //       })
  //     });
  // }
  loadProjects() {
    this.service.getProjects()
      .subscribe((data: any) => {
        this.projects = data.map((p: any, index: any) => ({
          ...p,
          members: p.members || [],
          serialNumber: index + 1
        }));
      });
  }

  ngOnInit() {
    this.dataSource.userName = localStorage.getItem("userName");
    this.loadProjects();
  }

  openCreateProject() {
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // 🔄 Refresh projects list
        this.loadProjects();
      }
    });
  }

  upload(event: any, projectId: any) {
    if (!event.target.files && !event.target.files[0]) {
      alert("Select a file first");
      return;
    }
    this.service.upload(projectId, event.target.files[0])
      .subscribe((res: any) => {
        alert("Uploaded");
        this.loadProjects();
      });
  }


  previewProject(project: any) {
    let url = environment.nodejsBaseUrl + "/preview/" + project.projectId;
    window.open(url, "_blank");
  }

  publish(project: any) {
    this.service.publish(project.projectId)
      .subscribe((res: any) => {
        alert("Published!");
        this.loadProjects();
      });
  }

  onViewPublicUrl(project: any) {
    window.open(project.publicUrl, "_blank");
  }

  logout() {
    localStorage.clear();
    location.href = "/login";
  }
}
