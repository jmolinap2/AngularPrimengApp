import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalService } from 'src/app/services/newprofessional.service';
@Component({
  selector: 'app-newprofessional',
  templateUrl: './newprofessional.component.html',
  styleUrls: ['./newprofessional.component.css']
})
export class NewprofessionalComponent implements OnInit {
  steps: any[];
  activeIndex: number = 0;
  acceptanceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.steps = [
      { label: 'Beneficios', index: 0, complete: false },
      { label: 'Aceptar Términos', index: 1, complete: false }
    ];
    this.acceptanceForm = this.fb.group({
      acceptTerms: [false, Validators.requiredTrue]
    });
  }
  ngOnInit(): void {
  
  }

  submitForm() {
    // Lógica para enviar el formulario y registrar al usuario como profesional
  }

}