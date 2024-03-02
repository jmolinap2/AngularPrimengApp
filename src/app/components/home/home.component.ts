import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

//src\app\components\home\home.component.ts
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string = ''; // Variable para almacenar el nombre de usuario
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) { }
  
  ngOnInit(): void {
    this.username = localStorage.getItem('username') ?? '';
  }
  logOut() {
    this.authService.logoutUser().subscribe(
      response => {
        if (response && response.detail && response.detail.includes('No se encontró el token')) {
          console.error(response.detail);
          // Realiza cualquier otra acción necesaria, como mostrar un mensaje de error al usuario, etc.
        } else {
          localStorage.removeItem('Token');
          localStorage.clear();
          this.router.navigate(['login']);
        }
      },
      error => {
        console.error(error);
        this.msgService.add({ 
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al cerrar sesión. Consulta la consola para más detalles.',
        });
      }
    );
  }
    

}
