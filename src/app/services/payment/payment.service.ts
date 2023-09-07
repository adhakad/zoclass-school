import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = 'http://localhost:3000/api/payment';
  constructor(private http: HttpClient) {}

  createPayment(paymentData: any) {
    return this.http.post(`${this.apiUrl}/create`, paymentData);
  }
  validatePayment(paymentData: any) {
    return this.http.post(`${this.apiUrl}/validate`, paymentData);
  }
}
