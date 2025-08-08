import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';
import { AuthStore } from '../../state/auth.store';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, NgOptimizedImage],
  template: `
    <mat-toolbar>
      <img ngSrc="/assets/logo.svg" width="32" height="32" alt="FF Draft" />
      <a routerLink="/dashboard" class="brand">FF Draft</a>
      <span class="spacer"></span>
      @if (auth.isAuthenticated()) {
        <button mat-button (click)="auth.logout()">Logout</button>
      } @else {
        <a routerLink="/login" mat-button>Login</a>
      }
    </mat-toolbar>
    <router-outlet />
  `,
  styles: [`
    .spacer { flex: 1 }
    .brand { margin-left: .5rem; text-decoration: none }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-shell' }
})
export class AppComponent {
  protected auth = inject(AuthStore);
  protected router = inject(Router);
}
