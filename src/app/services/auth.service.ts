//src\app\services\auth.service.ts

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  private baseUrl = 'https://dczslx4n-3000.use2.devtunnels.ms';
  
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) { }

  loginUser(credentials: { username: string, password: string }): Observable<any> {
    this.loadingService.setLoading(true); // Activar animación de carga

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('Datos a enviar:', credentials);
    
    return this.http.post<any>(`${this.baseUrl}/login/`, credentials, { headers, withCredentials: true }).pipe(
      tap((response: any) => {
        
            localStorage.clear()
            const rep :HttpResponse<any>=response
          console.log('Datos recibidos del login:', response);
          console.log('Accediendo a toda la respuesta:', rep);

          if (response && response.user && response.token) {
              // Guardar el usuario y el token en el localStorage
              debugger
              localStorage.setItem('Token', response.token);
              localStorage.setItem('username', credentials.username);
              localStorage.setItem('user', JSON.stringify(response.user));
              

              const authorizationCookieValue = `Token ${response.token}`;
              document.cookie = `Authorization=${authorizationCookieValue};`;
              // Obtener el valor de la cookie 'sessionid' del response
                const newSessionId = response.sessionid;

                // Obtener todas las cookies existentes
                const cookies = document.cookie.split(';');

                // Iterar sobre cada cookie para encontrar la cookie 'sessionid'
                cookies.forEach(cookie => {
                    const [name, value] = cookie.trim().split('=');
                    if (name === 'sessionid') {
                        // Si es la cookie 'sessionid', sobrescribir su valor con el nuevo sessionid
                        document.cookie = `${name}=${newSessionId}; path=/`;
                    }
                });
              // Guardar las cookies en localStorage
              localStorage.setItem('cookies', JSON.stringify(cookies));
           this.printCookies()   
          }
      }),
      catchError(error => {
          console.error('Error en login:', error);
          throw error;
      }),
      finalize(() => {
        this.loadingService.setLoading(false); // Desactivar animación de carga
      })
    );
  }

  logoutUser(): Observable<any> {
    let cooks = this.printCookies() 
    const token = localStorage.getItem('Token');
    
    if (!token) {
      return of({ detail: 'No se encontró el token en el Local Storage.' });
    }
    debugger
    let cook = document.cookie
    const headers = new HttpHeaders({
      'Cookie': cooks, // Agregar todas las cookies
      'Authorization': `Token ${token}`,
    });

    const options = {
      headers: headers,
      responseType: 'text' as 'json' // Indica que la respuesta esperada es texto
    };

    return this.http.post(`${this.baseUrl}/logout/`, '', options).pipe(
      finalize(() => {
        this.loadingService.setLoading(false); // Desactivar animación de carga
      })
    );
  }

  registerUser(userDetails: User): Observable<any> {
    const token = localStorage.getItem('Token');
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    if (token) {
      headers = headers.set('Authorization', `Token ${token}`);
    }
    debugger
    this.loadingService.setLoading(true); // Activar animación de carga
    console.log('Datos a enviar:', JSON.stringify(userDetails));
    
    return this.http.post(`${this.baseUrl}/api/v1/users/`, JSON.stringify(userDetails), { headers: headers }).pipe(
      finalize(() => {
        this.loadingService.setLoading(false); // Desactivar animación de carga
      })
    );
  }

  
  
  private printCookies (){
    const cookiesConsol = localStorage.getItem('cookies');
      let formattedCookies = '';
      let consol = '';

      if (cookiesConsol) {
        const cookiesArray = JSON.parse(cookiesConsol) as string[]; // Convertir la cadena JSON en un array de cadenas
        debugger
        cookiesArray.forEach(cookie => {
          const [name, value] = cookie.split('=');
          const trimmedName = name.trim(); // Eliminar los espacios en blanco alrededor del nombre
          if (trimmedName === 'sessionid' || trimmedName === 'csrftoken') {
            formattedCookies += `${trimmedName}=${value}; `;
          }
        });

        formattedCookies = formattedCookies.trim().slice(0, -1);
      }
      debugger
    console.log("'Cookie': '" + formattedCookies + "'");
    return formattedCookies
  }
}
