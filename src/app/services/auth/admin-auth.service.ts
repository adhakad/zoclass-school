import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { AdminLoginData } from "src/app/modal/admin.model";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  url = `${environment.API_URL}/api/admin`;
  private isAdminAuthenticated = false;
  private token: string | null = '';
  private tokenTimer: any;
  payload: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }


  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAdminAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(adminLoginData: AdminLoginData) {
    return this.http.post(`${this.url}/login`, adminLoginData);
  }
  signup(adminSignupData: any) {
    return this.http.post(`${this.url}/signup`, adminSignupData);
  }

  storeAccessToken(accessToken: string) {
    this.token = accessToken;
    if (accessToken) {
      const now = new Date();
      const base64Url = accessToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const accessTokenExp = (JSON.parse(atob(accessToken.split('.')[1]))).exp;
      const accessTokenExpDate = new Date(accessTokenExp * 1000)
      const accessTokenExpIn = Math.floor((accessTokenExpDate.getTime() - now.getTime()) / 1000) + 1;
      let checkAccessToken = this.getAccessToken()?.accessToken;
      if (checkAccessToken) {
        return
      }
      this.cookieService.set("adminAccessToken", accessToken, accessTokenExpDate);
      this.cookieService.set("_uD", base64, accessTokenExpDate);
      this.setAuthTimer(accessTokenExpIn);
      this.isAdminAuthenticated = true;
      this.authStatusListener.next(true);
      this.router.navigate(["/admin/dashboard"], { replaceUrl: true });
    }
  }
  storeRefreshToken(refreshToken: string) {
    if (refreshToken) {
      const refreshTokenExp = (JSON.parse(atob(refreshToken.split('.')[1]))).exp;
      const refreshTokenExpDate = new Date(refreshTokenExp * 1000)
      this.cookieService.set("adminRefreshToken", refreshToken, refreshTokenExpDate);
    }
  }

  autoAuthAdmin() {
    const authInformation = this.getAccessToken();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const accessTokenExpIn = authInformation.accessTokenExpDate.getTime() - now.getTime();
    if (accessTokenExpIn > 0) {
      this.token = authInformation.accessToken;
      this.isAdminAuthenticated = true;
      this.setAuthTimer(accessTokenExpIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.isAdminAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.deleteAccessToken();
    this.router.navigate(["/"], { replaceUrl: true });
  }

  getAccessToken() {
    const accessToken = this.cookieService.get("adminAccessToken");
    if (!accessToken) {
      return;
    }
    const accessTokenExp = (JSON.parse(atob(accessToken.split('.')[1]))).exp;
    const accessTokenExpDate = new Date(accessTokenExp * 1000)
    return {
      accessToken: accessToken,
      accessTokenExpDate: new Date(accessTokenExpDate)
    }
  }
  getRefreshToken() {
    const refreshToken = this.cookieService.get("adminRefreshToken");
    if (!refreshToken) {
      return;
    }
    const refreshTokenExp = (JSON.parse(atob(refreshToken.split('.')[1]))).exp;
    const refreshTokenExpDate = new Date(refreshTokenExp * 1000)
    return {
      refreshToken: refreshToken,
      refreshTokenExpDate: new Date(refreshTokenExpDate)
    }
  }

  getLoggedInAdminInfo() {
    let token = this.getAccessToken()?.accessToken;
    if (!token) {
      return
    }
    return this.getLoggedInAdmin(token);
  }

  private getLoggedInAdmin(token: string) {
    let userDetail = this.cookieService.get("_uD");
    if (token && !userDetail) {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const accessTokenExp = (JSON.parse(atob(token.split('.')[1]))).exp;
      const accessTokenExpDate = new Date(accessTokenExp * 1000)
      this.cookieService.set("_uD", base64, accessTokenExpDate);
      let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      let payload = JSON.parse(jsonPayload).payload;
      return payload;
    }

    let jsonPayload = decodeURIComponent(window.atob(userDetail).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    let payload = JSON.parse(jsonPayload).payload;
    return payload;
  }



  private deleteAccessToken() {
    this.cookieService.delete("adminAccessToken");
    this.cookieService.delete("_uD");
    this.cookieService.delete("_vN");
  }

}
