import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { TeacherAuthGuard } from './guards/teacher-auth.guard';
import { StudentAuthGuard } from './guards/student-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('src/app/pages/main/home/home.module').then((module) => module.HomeModule) },
  { path: 'test', loadChildren: () => import('src/app/pages/main/test/test.module').then((module) => module.TestModule) },
  { path: 'study', loadChildren: () => import('src/app/pages/main/study/study.module').then((module) => module.StudyModule) },
  { path: 'notice', loadChildren: () => import('src/app/pages/main/notice/notice.module').then((module) => module.NoticeModule) },
  { path: 'subject/category/:id', loadChildren: () => import('src/app/pages/main/nested-pages/subject-category/subject-category.module').then((module) => module.SubjectCategoryModule) },
  { path: 'blog/list/:subject', loadChildren: () => import('src/app/pages/main/nested-pages/blog-list/blog-list.module').then((module) => module.BlogListModule) },
  { path: 'single/blog/:id', loadChildren: () => import('src/app/pages/main/nested-pages/single-blog/single-blog.module').then((module) => module.SingleBlogModule) },
  { path: 'test/start/:id', loadChildren: () => import('src/app/pages/main/nested-pages/test-start/test-start.module').then((module) => module.TestStartModule) },
  { path: 'test/list/:id', loadChildren: () => import('src/app/pages/main/nested-pages/test-list/test-list.module').then((module) => module.TestListModule) },
  { path: 'test/result', loadChildren: () => import('src/app/pages/main/nested-pages/test-result/test-result.module').then((module) => module.TestResultModule) },

  //  Student Routing Section
  { path: 'student/signup', loadChildren: () => import('src/app/pages/auth/student-auth/student-signup/student-signup.module').then((module) => module.StudentSignupModule) },
  { path: 'student/login', loadChildren: () => import('src/app/pages/auth/student-auth/student-login/student-login.module').then((module) => module.StudentLoginModule) },

  { path: 'student/dashboard', loadChildren: () => import('src/app/pages/student/student-dashboard/student-dashboard.module').then((module) => module.StudentDashboardModule), canActivate: [StudentAuthGuard] },
  { path: 'student/subject', loadChildren: () => import('src/app/pages/student/student-subject/student-subject.module').then((module) => module.StudentSubjectModule), canActivate: [StudentAuthGuard] },
  { path: 'student/test', loadChildren: () => import('src/app/pages/student/student-test/student-test.module').then((module) => module.StudentTestModule), canActivate: [StudentAuthGuard] },
  { path: 'student/test/result/:id', loadChildren: () => import('src/app/pages/student/student-test-results/student-test-results.module').then((module) => module.StudentTestResultsModule), canActivate: [StudentAuthGuard] },
  { path: 'student/all-test/results-pdf', loadChildren: () => import('src/app/pages/student/student-test-results-pdf/student-test-results-pdf.module').then((module) => module.StudentTestResultsPdfModule), canActivate: [StudentAuthGuard] },

  // Admin Routing Section

  { path: 'admin/login', loadChildren: () => import('src/app/pages/auth/admin-auth/admin-login/admin-login.module').then((module) => module.AdminLoginModule) },
  { path: 'admin/dashboard', loadChildren: () => import('src/app/pages/admin/dashboard/dashboard.module').then((module) => module.DashboardModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/test', loadChildren: () => import('src/app/pages/admin/admin-test/admin-test.module').then((module) => module.AdminTestModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/test/results/:id', loadChildren: () => import('src/app/pages/admin/admin-test-results/admin-test-results.module').then((module) => module.AdminTestResultsModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/students/result/class', loadChildren: () => import('src/app/pages/admin/admin-student-result-cls/admin-student-result-cls.module').then((module) => module.AdminStudentResultClsModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/students/result/class/:id', loadChildren: () => import('src/app/pages/admin/admin-student-result/admin-student-result.module').then((module) => module.AdminStudentResultModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/teacher', loadChildren: () => import('src/app/pages/admin/teacher/teacher.module').then((module) => module.TeacherModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/student', loadChildren: () => import('src/app/pages/admin/student/student.module').then((module) => module.StudentModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/class', loadChildren: () => import('src/app/pages/admin/class/class.module').then((module) => module.ClassModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/subject', loadChildren: () => import('src/app/pages/admin/subject/subject.module').then((module) => module.SubjectModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/class-subject', loadChildren: () => import('src/app/pages/admin/class-subject/class-subject.module').then((module) => module.ClassSubjectModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/banner', loadChildren: () => import('src/app/pages/admin/banner/banner.module').then((module) => module.BannerModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/ads', loadChildren: () => import('src/app/pages/admin/ads/ads.module').then((module) => module.AdsModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/topper', loadChildren: () => import('src/app/pages/admin/topper/topper.module').then((module) => module.TopperModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/testimonial', loadChildren: () => import('src/app/pages/admin/testimonial/testimonial.module').then((module) => module.TestimonialModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/study-material', loadChildren: () => import('src/app/pages/admin/admin-study-material/admin-study-material.module').then((module) => module.AdminStudyMaterialModule), canActivate: [AdminAuthGuard] },
  { path: 'admin/notification', loadChildren: () => import('src/app/pages/admin/notification-page/notification-page.module').then((module) => module.NotificationPageModule), canActivate: [AdminAuthGuard] },

  // Teacher Routing Section
  { path: 'teacher/signup', loadChildren: () => import('src/app/pages/auth/teacher-auth/teacher-signup/teacher-signup.module').then((module) => module.TeacherSignupModule) },
  { path: 'teacher/login', loadChildren: () => import('src/app/pages/auth/teacher-auth/teacher-login/teacher-login.module').then((module) => module.TeacherLoginModule) },
  { path: 'teacher/dashboard', loadChildren: () => import('src/app/pages/teacher/teacher-dashboard/teacher-dashboard.module').then((module) => module.TeacherDashboardModule), canActivate: [TeacherAuthGuard] },
  { path: 'teacher/subject', loadChildren: () => import('src/app/pages/teacher/teacher-subject/teacher-subject.module').then((module) => module.TeacherSubjectModule), canActivate: [TeacherAuthGuard] },
  { path: 'teacher/test', loadChildren: () => import('src/app/pages/teacher/teacher-test/teacher-test.module').then((module) => module.TeacherTestModule), canActivate: [TeacherAuthGuard] },
  { path: 'teacher/test/results/:id', loadChildren: () => import('src/app/pages/teacher/teacher-test-results/teacher-test-results.module').then((module) => module.TeacherTestResultsModule), canActivate: [TeacherAuthGuard] },
  { path: 'teacher/test/student/results/:id', loadChildren: () => import('src/app/pages/teacher/teacher-student-results/teacher-student-results.module').then((module) => module.TeacherStudentResultsModule), canActivate: [TeacherAuthGuard] },
  { path: 'teacher/student', loadChildren: () => import('src/app/pages/teacher/teacher-student/teacher-student.module').then((module) => module.TeacherStudentModule), canActivate: [TeacherAuthGuard] },
  { path: 'teacher/study-material', loadChildren: () => import('src/app/pages/teacher/teacher-study-material/teacher-study-material.module').then((module) => module.TeacherStudyMaterialModule), canActivate: [TeacherAuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
