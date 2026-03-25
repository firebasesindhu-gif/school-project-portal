import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.auth.login().then((res: any) => {
      const email = res.user.email;
      if (email === "saikrishna.2105@gmail.com") {
        localStorage.setItem("email", email);
        localStorage.setItem("userName", email.split("@")[0]);
        localStorage.setItem("isTeacher", "true");
        this.router.navigate(['/teacher-dashboard']);
      } else if (email.endsWith("@sindhuschool.com")) {
        localStorage.setItem("email", email);
        localStorage.setItem("userName", email.split("@")[0]);
        localStorage.setItem("isTeacher", "false");
        this.router.navigate(['/dashboard']);
      } else {
        alert("Use school email only");
      }
    });
  }
}
