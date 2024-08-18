import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

//src\app\components\home\home.component.ts
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username: string = '';
  profesionales: any[] = [];
  user: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
this.username = localStorage.getItem('username') ?? '';

    const userString = localStorage.getItem('user');
    if (userString) {
      debugger
      const user = JSON.parse(userString);
      if (user && user.image) {
        user.image = 'https://dczslx4n-3000.use2.devtunnels.ms' + user.image;
      } else {
        user.image = 'https://example.com/default-profile-image.jpg';
      }
      this.user = user;
    }

    this.getProfesionales();
  }
  getProfesionales() {
    this.http
      .get<any[]>(
        'https://dczslx4n-3000.use2.devtunnels.ms/api/v1/profesionales/'
      )
      .subscribe(
        (data) => {
          this.profesionales = data;
          // Itera sobre los datos y modifica las URLs de las imágenes si es necesario
          this.profesionales.forEach((profesional) => {
            if (profesional.user_image) {
              profesional.user_image = profesional.user_image.replace(
                'http://localhost:3000',
                'https://dczslx4n-3000.use2.devtunnels.ms'
              );
              
              console.log('profesional.image: ', profesional.image);
            }
          });
        },
        (error) => {
          console.log('Error al obtener los profesionales:', error);
        }
      );
  }

  logOut() {
    this.authService.logoutUser().subscribe(
      (response) => {
        debugger
        if (
          
          response &&
          response.detail &&
          response.detail.includes('No se encontró el token')
        ) {
          console.error(response.detail);
          // Realiza cualquier otra acción necesaria, como mostrar un mensaje de error al usuario, etc.
        } else {
          localStorage.removeItem('Token');
          localStorage.clear();
          this.router.navigate(['login']);
        }
      },
      (error) => {
        console.error(error);
        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            'Ocurrió un error al cerrar sesión. Consulta la consola para más detalles.',
        });
      }
    );
  }
}
