import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, MatCardModule, MatButtonModule],
  template: `
    <section class="container">
      <mat-card>
        <h2>Live Draft</h2>
        <a mat-flat-button routerLink="/draft/league-123">Join Draft</a>
      </mat-card>

      <mat-card>
        <h3>Upcoming Drafts</h3>
        <ul>
          <li>League 123 – Today 8:00 PM</li>
        </ul>
      </mat-card>
    </section>
  `,
  styles: [`.container{display:grid;gap:16px;padding:16px}`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
