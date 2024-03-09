import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
//src\app\services\profile.service.ts
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://127.0.0.1:3000/api/v1'; // URL base para las solicitudes

  constructor(private http: HttpClient) { }

  // Método para obtener el perfil del usuario
  getUserProfile(userId: string): Observable<any> {
    const link = `${this.baseUrl}/users/${userId}`;
    const userinfo = this.http.get<any>(`${this.baseUrl}/users/${userId}`);
    debugger
    return this.http.get<any>(link).pipe(
      tap((response) => {
          debugger
          console.log('Datos recibidos del service:', JSON.stringify(response));
      })
    );
  }

  // Método para actualizar el perfil del usuario
  updateUserProfile(userId: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/${userId}`, userData);
  }

  // Agrega otros métodos según sea necesario, como eliminar el perfil del usuario, cargar una imagen de perfil, etc.
}
