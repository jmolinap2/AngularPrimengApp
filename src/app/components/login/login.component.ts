// login.component.ts 
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', Validators.required], // Cambiar 'email' a 'username' para que coincida con el backend
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) { }

  get username() {
    return this.loginForm.controls['username'];
  }
  get password() { return this.loginForm.controls['password']; }

  loginUser() {
    const usernameValue = this.username.value || '';
    const passwordValue = this.password.value || '';
    
    this.authService.loginUser({ username: usernameValue, password: passwordValue }).subscribe(
      response => {
        debugger;
        localStorage.setItem('Token', response.token);
        this.router.navigate(['/home']);
      },(error) => {
        debugger;
        console.log('Error en login: ',error);
        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al loguear.'+JSON.stringify(error),
          
        });
      }
    );
  }
}
