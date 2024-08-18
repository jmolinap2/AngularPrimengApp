import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, from, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
//src\app\services\profile.service.ts
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'https://dczslx4n-3000.use2.devtunnels.ms//api/v1'; // URL base para las solicitudes

  constructor(private http: HttpClient) { }

  // Método para obtener el perfil del usuario
  getUserProfile(userId: string): Observable<any> {
    const link = `${this.baseUrl}/users/${userId}/`;
     
    // Obtener cookies almacenadas
    const token = localStorage.getItem('Token');
    
    // Crear headers con las cookies
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    if (token) {
      headers = headers.set('Authorization', `Token ${token}`);
    }
    
    // Enviar solicitud HTTP con las cookies
    return this.http.get<any>(link, { headers: headers }).pipe(
      tap((response) => {
        debugger
        console.log('Datos recibidos del servicio:', JSON.stringify(response));
      })
    );
  }

  updateUserProfile(userId: string, formData: FormData): Observable<any> {
    const link = `${this.baseUrl}/users/${userId}/`;
    const token = localStorage.getItem('Token');
  
    // Realizar la solicitud HTTP
    let options: any = {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`
      },
      body: formData
    };
  
    return this.http.request(options.method, link, options).pipe(
      catchError((error) => {
        console.error('Error al enviar los datos:', error);
        return throwError('Ocurrió un error al enviar los datos');
      })
    );
  }


}