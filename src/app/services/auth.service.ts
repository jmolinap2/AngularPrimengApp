//src\app\services\auth.service.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://xf0hbthg-3000.brs.devtunnels.ms';


  constructor(private http: HttpClient) { }

  loginUser(credentials: { username: string, password: string }): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    console.log('Datos a enviar:', credentials);
    return this.http.post<any>(`${this.baseUrl}/login/`, credentials).pipe(
      tap((response) => {
          debugger
          console.log('Datos recibidos:', JSON.stringify(response));
          if (response && response.user && response.user.token) {
            localStorage.setItem('Token', response.user.token);
            localStorage.setItem('username', credentials.username);
            localStorage.setItem('user', response.user);
          } else if (response && response.detail === "Credenciales inválidas.") {
            throw throwError("Credenciales inválidas");
          } else {
            throw throwError("Something went wrong");
          }
        })
      );
  }
  logoutUser(): Observable<any> {
    const token = localStorage.getItem('Token');
  
    // Verifica si el token existe en el Local Storage
    if (!token) {
      console.error('No se encontró el token en el Local Storage.');
      return of({ detail: 'No se encontró el token en el Local Storage.' }); // Retorna una respuesta observable indicando la ausencia de token
    }
  
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Token ${token}`); // Establece el encabezado de autorización
  
    console.log('Token a enviar:', token);
  
    return this.http.post<any>(`${this.baseUrl}/logout/`, null, { headers: headers });
  }

  registerUser(userDetails: User): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    console.log('Datos a enviar:', JSON.stringify(userDetails));
    return this.http.post(`${this.baseUrl}/api/v1/users/`,JSON.stringify(userDetails), { headers: headers });
  }

  getUserByEmail(email: string): Observable<User[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<User[]>(`${this.baseUrl}/api/v1/users?email=${email}`);
  }


}
