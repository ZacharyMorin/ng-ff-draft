import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthStore } from '../../state/auth.store';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="center">
      <mat-card>
        <h2>Login</h2>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" required />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Password</mat-label>
            <input matInput formControlName="password" type="password" required />
          </mat-form-field>

          <button mat-flat-button [disabled]="form.invalid" type="submit">Login</button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`.center{display:grid;place-items:center;height:calc(100dvh - 64px)}`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'auth-page' }
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthStore);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async submit() {
    const { email, password } = this.form.getRawValue();
    await this.auth.login(email, password);
    this.router.navigateByUrl('/dashboard');
  }
}
