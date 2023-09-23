import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { TeacherAuthGuard } from './guards/teacher-auth.guard';
import { StudentAuthGuard } from './guards/student-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('src/app/pages/main/home/home.module').then((module) => module.HomeModule) },
  { path: 'notice', loadChildren: () => import('src/app/pages/main/notice/notice.module').then((module) => module.NoticeModule) },
  { path: 'admit-card', loadChildren: () => import('src/app/pages/main/admit-card/admit-card.module').then((module) => module.AdmitCardModule), },
  { path: 'result', loadChildren: () => import('src/app/pages/main/result/result.module').then((module) => module.ResultModule), },

  //  Student Routing Section
  { path: 'student/signup', loadChildren: () => import('src/app/pages/auth/student-auth/student-signup/student-signup.module').then((module) => module.StudentSignupModule) },
  { path: 'student/login', loadChildren: () => import('src/app/pages/auth/student-auth/student-login/student-login.module').then((module) => module.StudentLoginModule) },

  { path: 'student/dashboard', loadChildren: () => import('src/app/pages/student/student-dashboard/student-dashboard.module').then((module) => module.StudentDashboardModule), canActivate: [StudentAuthGuard] },
  { path: 'student/fees', loadChildren: () => import('src/app/pages/student/student-fees/student-fees.module').then((module) => module.StudentFeesModule), canActivate: [StudentAuthGuard] },
  { path: 'student/fees/statement/:class/:id', loadChildren: () => import('src/app/pages/student/student-fees-statement/student-fees-statement.module').then((module) => module.StudentFeesStatementModule), canActivate: [StudentAuthGuard] },
  { path: 'student/admit-card', loadChildren: () => import('src/app/pages/student/student-admit-card/student-admit-card.module').then((module) => module.StudentAdmitCardModule), canActivate: [StudentAuthGuard] },
  { path: 'student/result', loadChildren: () => import('src/app/pages/student/student-result/student-result.module').then((module) => module.StudentResultModule), canActivate: [StudentAuthGuard] },
  // Admin Routing Section

  { path: 'admin/login', loadChildren: () => import('src/app/pages/auth/admin-auth/admin-login/admin-login.module').then((module) => module.AdminLoginModule) },
  { path: 'admin/dashboard', loadChildren: () => import('src/app/pages/admin/dashboard/dashboard.module').then((module) => module.DashboardModule), canActivate: [AdminAuthGuard] },
  
  { path: 'admin/setting', loadChildren: () => import('src/app/pages/admin/admin-setting/admin-setting.module').then((module) => module.AdminSettingModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/setting/:id', loadChildren: () => import('src/app/pages/admin/admin-setting-cls/admin-setting-cls.module').then((module) => module.AdminSettingClsModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/students/fees/class', loadChildren: () => import('src/app/pages/admin/admin-student-fees-cls/admin-student-fees-cls.module').then((module) => module.AdminStudentFeesClsModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/students/fees/class/:id', loadChildren: () => import('src/app/pages/admin/admin-student-fees/admin-student-fees.module').then((module) => module.AdminStudentFeesModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/setting/fees/class/structure/:id', loadChildren: () => import('src/app/pages/admin/admin-student-fees-structure/admin-student-fees-structure.module').then((module) => module.AdminStudentFeesStructureModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/students/fees/class/statement/:class/:id', loadChildren: () => import('src/app/pages/admin/admin-student-fees-statement/admin-student-fees-statement.module').then((module) => module.AdminStudentFeesStatementModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/students/result/class', loadChildren: () => import('src/app/pages/admin/admin-student-result-cls/admin-student-result-cls.module').then((module) => module.AdminStudentResultClsModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/students/result/class/:id', loadChildren: () => import('src/app/pages/admin/admin-student-result/admin-student-result.module').then((module) => module.AdminStudentResultModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/setting/result/class/structure/:id', loadChildren: () => import('src/app/pages/admin/admin-student-result-structure/admin-student-result-structure.module').then((module) => module.AdminStudentResultStructureModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/students/admit-card/class', loadChildren: () => import('src/app/pages/admin/admin-student-admit-card-cls/admin-student-admit-card-cls.module').then((module) => module.AdminStudentAdmitCardClsModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/students/admit-card/class/:id', loadChildren: () => import('src/app/pages/admin/admin-student-admit-card/admin-student-admit-card.module').then((module) => module.AdminStudentAdmitCardModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/setting/admit-card/class/structure/:id', loadChildren: () => import('src/app/pages/admin/admin-student-admit-card-structure/admin-student-admit-card-structure.module').then((module) => module.AdminStudentAdmitCardStructureModule), canActivate: [AdminAuthGuard] },

  { path: 'admin/teacher', loadChildren: () => import('src/app/pages/admin/teacher/teacher.module').then((module) => module.TeacherModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/student', loadChildren: () => import('src/app/pages/admin/student/student.module').then((module) => module.StudentModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/class', loadChildren: () => import('src/app/pages/admin/class/class.module').then((module) => module.ClassModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/subject', loadChildren: () => import('src/app/pages/admin/subject/subject.module').then((module) => module.SubjectModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/class-subject', loadChildren: () => import('src/app/pages/admin/class-subject/class-subject.module').then((module) => module.ClassSubjectModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/banner', loadChildren: () => import('src/app/pages/admin/banner/banner.module').then((module) => module.BannerModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/ads', loadChildren: () => import('src/app/pages/admin/ads/ads.module').then((module) => module.AdsModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/topper', loadChildren: () => import('src/app/pages/admin/topper/topper.module').then((module) => module.TopperModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/testimonial', loadChildren: () => import('src/app/pages/admin/testimonial/testimonial.module').then((module) => module.TestimonialModule), canActivate: [AdminAuthGuard] },
    { path: 'admin/notification', loadChildren: () => import('src/app/pages/admin/notification-page/notification-page.module').then((module) => module.NotificationPageModule), canActivate: [AdminAuthGuard] },

  // Teacher Routing Section
  { path: 'teacher/signup', loadChildren: () => import('src/app/pages/auth/teacher-auth/teacher-signup/teacher-signup.module').then((module) => module.TeacherSignupModule) },
  { path: 'teacher/login', loadChildren: () => import('src/app/pages/auth/teacher-auth/teacher-login/teacher-login.module').then((module) => module.TeacherLoginModule) },
  { path: 'teacher/dashboard', loadChildren: () => import('src/app/pages/teacher/teacher-dashboard/teacher-dashboard.module').then((module) => module.TeacherDashboardModule), canActivate: [TeacherAuthGuard] },
  { path: 'teacher/subject', loadChildren: () => import('src/app/pages/teacher/teacher-subject/teacher-subject.module').then((module) => module.TeacherSubjectModule), canActivate: [TeacherAuthGuard] },
  { path: 'teacher/student', loadChildren: () => import('src/app/pages/teacher/teacher-student/teacher-student.module').then((module) => module.TeacherStudentModule), canActivate: [TeacherAuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

