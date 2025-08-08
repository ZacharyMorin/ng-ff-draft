import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatButtonModule],
  template: `
    <section class="container">
        <h2>Enter the Draft Room</h2>
        <button matButton="filled" class="join-draft-btn">Join Draft</button>
    </section>
  `,
    styles: [`
        .container {
            display: flex; 
            flex-direction: column; 
            align-items: center; /* center horizontally */ 
            justify-content: center; /* center vertically */ 
            min-height: 80dvh; /* fill viewport height (mobile-friendly) */  
            text-align: center; 
        }
        .join-draft-btn {
            max-width: 300px; 
            inline-size: 100%;
        }
    `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
