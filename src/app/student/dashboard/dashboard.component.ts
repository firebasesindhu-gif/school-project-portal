import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/project.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatToolbarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  email: any;
  projects: any[] = [];
  dataSource: any = {
    userName: ""
  }

  constructor(private service: ProjectService) { }

  ngOnInit() {
    this.dataSource.userName = localStorage.getItem("userName");
    this.email = localStorage.getItem("email");
    this.loadProjects();
  }

  loadProjects() {
    this.service.getProjects(this.email)
      .subscribe((res: any) => {
        this.projects = res.map((p: any) => ({
          ...p,
          members: p.members || []
        }));
      });

  }

  selectFile(event: any, project: any) {
    project.file = event.target.files[0];
  }

  previewProject(project: any) {
    let url = environment.nodejsBaseUrl + "/preview/" + project.projectId;
    window.open(url, "_blank");
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

  onViewPublicUrl(project: any) {
    window.open(project.publicUrl, "_blank");
  }

  logout() {
    localStorage.clear();
    location.href = "/login";
  }
}
