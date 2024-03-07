import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})

export class MyprofileComponent implements OnInit {
  user: any= localStorage.getItem('user') ?? null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) { }
  ngOnInit(): void {

    const userString = localStorage.getItem('user');
    if (userString) {
        const user = JSON.parse(userString);
        if (user && user.image) {
            user.image = 'https://xf0hbthg-3000.brs.devtunnels.ms' + user.image;
        }else{
          user.image = 'https://example.com/default-profile-image.jpg';
        }
        this.user = user;
    }
  }

  editProfile() {
    // Implementa la funcionalidad para editar el perfil aquí
  }

  deleteAccount() {
    // Implementa la funcionalidad para eliminar la cuenta aquí
  }
}
