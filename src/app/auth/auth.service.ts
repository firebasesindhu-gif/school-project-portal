import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })

export class AuthService {

 constructor(private auth:Auth){}

 login(){
  return signInWithPopup(this.auth,new GoogleAuthProvider());
 }

 getUser(){

  return new Promise((resolve)=>{

   onAuthStateChanged(this.auth,(user)=>{

     resolve(user);

   });

  });

 }

 logout(){
  return this.auth.signOut();
 }

}