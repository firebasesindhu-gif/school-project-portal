import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Firestore, collection, query, where, collectionData } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })

export class ProjectService {

  baseUrl = environment.nodejsBaseUrl;

  constructor(private http: HttpClient, private storage: Storage, private firestore: Firestore) {}

  getProjects(email: string) {
    return this.http.get(`${this.baseUrl}/projects/${email}`)
    // const ref = collection(this.firestore, "projects");
    // const q = query(ref, where("members", "array-contains", email));
    // return collectionData(q, { idField: "id" });
  }

  // 🔥 Upload ZIP
  upload(projectId: string, file: File) {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post(
      `${this.baseUrl}/upload/${projectId}`,
      fd
    );
  }

  // 🔥 Publish
  publish(projectId: string) {
    return this.http.post(
      `${this.baseUrl}/publish/${projectId}`,
      {}
    );
  }

  // 🔥 Get Project Details
  getProject(projectId: string) {
    return this.http.get(
      `${this.baseUrl}/project/${projectId}`
    );
  }

}