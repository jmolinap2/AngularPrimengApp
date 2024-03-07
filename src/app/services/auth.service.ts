//src\app\services\auth.service.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs';
import { LoadingService } from './loading.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://xf0hbthg-3000.brs.devtunnels.ms';

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) { }

  loginUser(credentials: { username: string, password: string }): Observable<any> {
    this.loadingService.setLoading(true); // Activar animación de carga
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
            localStorage.setItem('user', JSON.stringify(response.user));
          } else if (response && response.detail === "Credenciales inválidas.") {
            throw throwError("Credenciales inválidas");
          } else {
            throw throwError("Something went wrong");
          }
        }),
      finalize(() => {
        this.loadingService.setLoading(false); // Desactivar animación de carga
      })
    );
  }
  logoutUser(): Observable<any> {
    const token = localStorage.getItem('Token');
    this.loadingService.setLoading(true);
  
    // Verifica si el token existe en el Local Storage
    if (!token) {
      return of({ detail: 'No se encontró el token en el Local Storage.' }); // Retorna una respuesta observable indicando la ausencia de token
    }
  
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Token ${token}`); // Establece el encabezado de autorización
  
    console.log('Token a enviar:', token);
  
    return this.http.post<any>(`${this.baseUrl}/logout/`, null, { headers: headers }).pipe(
      finalize(() => {
        this.loadingService.setLoading(false); // Desactivar animación de carga
      })
    );
  }

  registerUser(userDetails: User): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    this.loadingService.setLoading(true); // Activar animación de carga
    console.log('Datos a enviar:', JSON.stringify(userDetails));
    
    return this.http.post(`${this.baseUrl}/api/v1/users/`, JSON.stringify(userDetails), { headers: headers }).pipe(
      finalize(() => {
        this.loadingService.setLoading(false); // Desactivar animación de carga
      })
    );
  }

  getUserByEmail(email: string): Observable<User[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<User[]>(`${this.baseUrl}/api/v1/users?email=${email}`);
  }


}
