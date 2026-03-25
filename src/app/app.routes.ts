import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './student/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { TeacherDashboardComponent } from './teacher/dashboard/dashboard.component';
import { CreateProjectComponent } from './teacher/create-project/create-project.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'teacher-dashboard', component: TeacherDashboardComponent, canActivate: [AuthGuard] },
    { path: 'teacher/create', component: CreateProjectComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
