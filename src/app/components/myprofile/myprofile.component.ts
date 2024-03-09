import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})

export class MyprofileComponent implements OnInit {

  user: any= {
    password: "",
    is_superuser: false,
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    s_staff: false,
    is_active: false,
    image: null,
    age: null,
    descripcion: "",
    numero_celular: "",
    groups: [],
    user_permissions: []
};
  editProfileForm: FormGroup;
  editingProfile = false;

  constructor(
    private fb: FormBuilder ,
    private authService: AuthService,
    private profileService: ProfileService,
    private messageService: MessageService
  ) {
    this.editProfileForm = this.fb.group({
    username: [this.user ? this.user.username : '', Validators.required],
    email: [this.user ? this.user.email : '', [Validators.required, Validators.email]],
    first_name: [this.user ? this.user.first_name : ''],
    last_name: [this.user ? this.user.last_name : ''],
    image: [this.user ? this.user.image : ''],
    numero_celular: [this.user ? this.user.numero_celular : ''],
  });
}

  ngOnInit(): void {
    this.getUserProfile();
    this.initEditProfileForm();
  }

  getUserProfile(): void {
    debugger;
    const userinfoString: string | null = localStorage.getItem('user');
    const UserInServer: string | null =''
    if (userinfoString) {
      const userinfo: any = JSON.parse(userinfoString); // Convertir la cadena JSON a un objeto JavaScript

      if (userinfo && userinfo.id) {
        const userId: string = userinfo.id; // Obtener el ID del usuario
        // Ahora userId contiene el ID del usuario que puedes usar para hacer la solicitud al servicio
        
        this.profileService.getUserProfile(userId).subscribe(
          (data: any) => {
            this.user = data;
            debugger;
            if (this.user.image) {
              debugger;
              this.user.image = this.user.image.replace(
                'http://127.0.0.1:3000',
                'https://xf0hbthg-3000.brs.devtunnels.ms'
              );
            } else {
              this.user.image = 'https://example.com/default-profile-image.jpg';
            }
           
            console.log('URL:', this.user.image);
          },
          (error: any) => {
            console.log('Error al obtener el perfil del usuario:', error);
          }
        );
      } else {
        console.error(
          'El objeto de usuario no tiene una propiedad "id" válida.'
        );
      }
    } else {
      console.error(
        'No se encontró ningún objeto de usuario en el almacenamiento local.'
      );
    }
  }

  initEditProfileForm(): void {
    this.editProfileForm = this.fb.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      first_name: [this.user.first_name],
      last_name: [this.user.last_name],
      image: [this.user.image],
      numero_celular: [this.user.numero_celular],
    });
  }
  editProfile() {}

  deleteAccount() {}

  startEditingProfile(): void {
    this.editingProfile = true;
    this.editProfileForm.patchValue({
      username: this.user.username,
      email: this.user.email,
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      image: this.user.image,
      numero_celular: this.user.numero_celular,
      // Agrega más controles de formulario según sea necesario
    });
  }

  cancelEditingProfile(): void {
    this.editingProfile = false;
    // Aquí podrías limpiar el formulario de edición si lo necesitas
  }

  saveProfileChanges(): void {
    this.profileService
      .updateUserProfile(this.user.id, this.editProfileForm.value)
      .subscribe(
        (response: any) => {
          this.editingProfile = false; // Finalizar la edición del perfil después de guardar los cambios
        },
        (error: any) => {
          console.log('Error al guardar los cambios en el perfil:', error);
        }
      );
  }
}
