import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  notification: any;
  notificationCount: any;
  notificationCookie: any;
  constructor(private notificationService: NotificationService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getNotification();
  }

  getNotification() {
    this.notificationService.getNotificationList().subscribe((res: any) => {
      if (res) {
        this.notification = res;
        if (this.cookieService.get("_vN")) {
          this.notificationCookie = JSON.parse(this.cookieService.get("_vN"));
          let filterNotification = this.notification.filter(({ _id: id1 }: any) => this.notificationCookie.some(({ _id: id2 }: any) => id2 === id1))
            .map((item: any) => {
              return { "_id": item._id }
            });
          let checkCookie = this.notificationCookie.filter(({ _id: id1 }: any) => !filterNotification.some(({ _id: id2 }: any) => id2 === id1))
          if (checkCookie.length > 0) {
            this.notificationService.storeViewNotification(filterNotification);
          }
          this.notificationCount = this.notification.length - filterNotification?.length;
          return;
        }
        this.notificationCount = this.notification.length;
      }
    })
  }

  viewNotification() {
    if (this.notification) {
      console.log(this.notification);
      let data: any = [];
      if (this.notificationCookie) {
        let filterNotification = this.notification.filter(({ _id: id1 }: any) => !this.notificationCookie.some(({ _id: id2 }: any) => id2 === id1));
        console.log(filterNotification)
        for (let i = 0; i < filterNotification.length; i++) {
          let newNotification = { "_id": filterNotification[i]._id };
          data.push(newNotification, ...this.notificationCookie)
        }
        if (data.length > 0) {
          this.notificationService.storeViewNotification(data)
        }
        return
      }
      data = this.notification.map((item: any) => {
        return { "_id": item._id };
      })
      this.notificationService.storeViewNotification(data)
    }
  }
}