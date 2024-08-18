import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css'],
})
export class MyprofileComponent implements OnInit {
  user: any = {
    password: '',
    is_superuser: false,
    username: '',
    name: '',
    last_name: '',
    email: '',
    s_staff: false,
    is_active: false,
    image: null,
    age: null,
    descripcion: '',
    numero_celular: '',
    groups: [],
    user_permissions: [],
  };
  editProfileForm: FormGroup;
  editingProfile = false;
  selectedFile: File | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;
  showOverlay = false; // Agregar la propiedad showOverlay 
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private messageService: MessageService
  ) {
    this.editProfileForm = this.fb.group({
      username: [this.user ? this.user.username : '', Validators.required],
      email: [
        this.user ? this.user.email : '',
        [Validators.required, Validators.email],
      ],
      name: [this.user ? this.user.name : ''],
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
    debugger
    const userinfoString: string | null = localStorage.getItem('user');
    const UserInServer: string | null = '';
    if (userinfoString) {
      const userinfo: any = JSON.parse(userinfoString); // Convertir la cadena JSON a un objeto JavaScript

      if (userinfo && userinfo.id) {
        const userId: string = userinfo.id; // Obtener el ID del usuario
        // Ahora userId contiene el ID del usuario que puedes usar para hacer la solicitud al servicio

        this.profileService.getUserProfile(userId).subscribe(
          response => {
            
            this.user = response;
            
            debugger;
            if (this.user.image) {
              this.user.image = this.user.image.replace(
                'http://127.0.0.1:3000',
                'https://dczslx4n-3000.use2.devtunnels.ms'
              );
            } else {
              this.user.image = 'https://example.com/default-profile-image.jpg';
            }
            localStorage.setItem('user', JSON.stringify(this.user));
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
      name: [this.user.name],
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
      name: this.user.name,
      last_name: this.user.last_name,
      image: this.user.image,
      numero_celular: this.user.numero_celular,
      // Agrega más controles de formulario según sea necesario
    });
  }

  cancelEditingProfile(): void {
    this.editingProfile = false;
    this.editProfileForm.reset();
    // Aquí podrías limpiar el formulario de edición si lo necesitas
  }
 
  get_FormData():FormData {
    const formData = new FormData();

    const file = this.fileInput.nativeElement.files[0];
    if (file) {
      formData.append('image', file);
    }

    const username = this.editProfileForm.value.username;
    if (username !== this.user.username) {
      formData.append('username', username);
    }

    const email = this.editProfileForm.value.email;
    if (email && email !== this.user.email) {
      formData.append('email', email);
    }

    const name = this.editProfileForm.value.name;
    if (name && name !== this.user.name) {
      formData.append('name', name);
    }

    const last_name = this.editProfileForm.value.last_name;
    if (last_name && last_name !== this.user.last_name) {
      formData.append('last_name', last_name);
    }

    const numero_celular = this.editProfileForm.value.numero_celular;
    if (numero_celular && numero_celular !== this.user.numero_celular) {
      formData.append('numero_celular', numero_celular);
    }
    return formData
  }
  
  async saveProfileChanges(): Promise<void> {
    // Obtener el FormData con los datos del formulario
    const formData = this.get_FormData();
  
    try {
      // Llamar a updateUserProfile con el id del usuario y el FormData
      this.profileService.updateUserProfile(this.user.id, formData).subscribe(
        (response) => {
          debugger
          console.log('Respuesta exitosa:', response);
          console.log('Perfil actualizado exitosamente');
          this.editingProfile = false; // Finalizar la edición del perfil después de guardar los cambios
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Perfil actualizado exitosamente',
          });
          this.getUserProfile(); // Actualizar la información del perfil después de guardar los cambios
        },
        (error) => {
          console.error('Error al guardar los cambios en el perfil:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un error al guardar los cambios en el perfil',
          });
        }
      );
    } catch (error) {
      console.error('Error al guardar los cambios en el perfil:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ocurrió un error al guardar los cambios en el perfil',
      });
    }
  }
}
