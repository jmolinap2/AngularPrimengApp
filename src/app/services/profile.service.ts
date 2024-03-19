import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, from, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
//src\app\services\profile.service.ts
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'https://xf0hbthg-3000.brs.devtunnels.ms/api/v1'; // URL base para las solicitudes

  constructor(private http: HttpClient) { }

  // Método para obtener el perfil del usuario
  getUserProfile(userId: string): Observable<any> {
    const link = `${this.baseUrl}/users/${userId}`;
     
    // Obtener cookies almacenadas
    const token = localStorage.getItem('Token');
    
    // Crear headers con las cookies
    let headers = new HttpHeaders();
    debugger
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

  private buildFormData(userData: any): FormData {
    const formData = new FormData();
    console.log('Datos de userData:', userData);
    
    for (const key in userData) {
      const value = userData[key];
      try {
        if (value instanceof File) {
          debugger
          formData.append(key, value, value.name);
          formData.get(key)
        } else {
          formData.append(key, String(value));
          formData.get(key)
        }
      } catch (error) {
        console.error(`Error al guardar el dato '${key}':`, error);
        // Puedes mostrar un mensaje al usuario o registrar el error en un archivo de log.
      }
      console.log('Dato almasenado: ',formData.get(key))
    }
    
    debugger
    return formData;
  }

}