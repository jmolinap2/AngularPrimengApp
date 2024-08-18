import { Component, OnDestroy, HostListener } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'angular-primeng-app';
  loading: boolean = false;
  private loadingSubscription: Subscription;

  constructor(private loadingService: LoadingService, private router: Router) {
    // Suscribirse al estado de carga
    this.loadingSubscription = this.loadingService.loading$.subscribe((loading: boolean) => {
      this.loading = loading;
    });

    // Escuchar eventos de cambio de ruta para ocultar la animación de carga cuando se complete la navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.setLoading(true);
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loadingService.setLoading(false);
      }
    });
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al servicio de carga al destruir el componente
    this.loadingSubscription.unsubscribe();
  }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      const navbar = document.getElementById('navbar');
      if (navbar) {
          if (window.pageYOffset > 100) {
              navbar.classList.add('bg-dark');
          } else {
              navbar.classList.remove('bg-dark');
          }
      }
    }



  getStars(rating: number): Array<number> {
    return Array(rating).fill(0);
  }
}