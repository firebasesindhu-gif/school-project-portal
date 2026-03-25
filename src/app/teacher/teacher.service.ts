import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class TeacherService {

  private nodejsBaseUrl = environment.nodejsBaseUrl;
  constructor(private firestore: Firestore, private http: HttpClient) { }

  createProject(data: any) {
    return this.http.post(`${this.nodejsBaseUrl}/create-project`, data);
    // const ref = collection(this.firestore, "projects");
    // return collection(this.firestore, "projects")
    //   .doc(id)   // 👈 YOUR CUSTOM ID
    //   .set(data);
    // return addDoc(ref, data);
  }

  publish(projectId: string) {
    return this.http.post(
      `${this.nodejsBaseUrl}/publish/${projectId}`,
      {}
    );
  }

  getProjects() {
    return this.http.get(`${this.nodejsBaseUrl}/projects`);
  }

  upload(projectId: string, file: File) {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post(
      `${this.nodejsBaseUrl}/upload/${projectId}`,
      fd
    );
  }

}