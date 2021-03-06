import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';

import { LoginComponent } from './components/auth/login/login.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { FacultyProfileComponent } from './components/faculty-profile/faculty-profile.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { EditFacultyComponent } from './components/edit-faculty/edit-faculty.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ResearchComponent } from './components/research/research.component';
import { CalendarComponent } from './components/calendar/calendar_SP/calendar.component';
import { RedirectComponent } from './components/calendar/redirect/rediect.component';
import { CalendarSuccessComponent } from './components/calendar/success/calendarSuccess.component';
import {ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'studentProfile', component: StudentProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'facultyProfile', component: FacultyProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'editFacultyProfile', component: EditFacultyComponent, canActivate: [AuthGuard]
  },
  {
    path: 'research', component: ResearchComponent, canActivate: [AuthGuard]
  },  
  {
    path: 'shoppingCart', component: ShoppingCartComponent, canActivate: [AuthGuard]
  },
  {
    path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]
  },
  {
    path: 'redirect', component: RedirectComponent, canActivate: [AuthGuard]
  },
  {
    path: 'calendarSuccess', component: CalendarSuccessComponent, canActivate: [AuthGuard]
  },
  {
    path: 'candidate', component: CandidateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
