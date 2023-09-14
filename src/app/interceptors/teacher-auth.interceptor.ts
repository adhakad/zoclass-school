import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import { TeacherAuthService } from '../services/auth/teacher-auth.service';

@Injectable()
export class TeacherAuthInterceptor implements HttpInterceptor {
  refresh=false
  
  constructor(private http:HttpClient, private teacherAuthService: TeacherAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const accessToken = this.teacherAuthService.getAccessToken()?.accessToken;
    
    if(accessToken){
      
      const req = request.clone({
        setHeaders:{
          authorization : `Bearer ${accessToken}`
        }
      })

      return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 403 && !this.refresh) {
          this.refresh = true;
          const refreshToken = this.teacherAuthService.getRefreshToken()?.refreshToken;
          return this.http.post('http://65.2.121.215/api/teacher-user/refresh', {token:refreshToken}).pipe(
            switchMap((res: any) => {
              const newAccessToken = res.accessToken
              this.teacherAuthService.storeAccessToken(newAccessToken)
              return next.handle(request.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`
                }
              }));
            })
          ) as Observable<HttpEvent<any>>;
        }
        this.refresh = false;
        return throwError(() => err);
      }));

    }

    return next.handle(request)

  }
}
