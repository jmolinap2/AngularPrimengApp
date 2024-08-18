import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, from, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
//src\app\services\profile.service.ts
@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  private baseUrl = 'https://dczslx4n-3000.use2.devtunnels.ms/api/v1'; // URL base para las solicitudes

  constructor(private http: HttpClient) { }


  RegistrerProfesional(userId: string, formData: any): Observable<any> {
    const link = `${this.baseUrl}/profesionales/`;
    const token = localStorage.getItem('Token');

    // Construir el cuerpo de la solicitud
    const body = {
      biografia: formData.biografia,
      user: userId
    };

    // Configurar los encabezados de la solicitud
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });

    // Realizar la solicitud HTTP POST
    return this.http.post(link, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error al enviar los datos:', error);
        return throwError('Ocurrió un error al enviar los datos');
      })
    );
  }
}


