import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'cheat-sheets',
  imports: [MatButtonToggleModule],
  template: `
    <header class="filters">
      <mat-button-toggle-group [value]="mode()" (valueChange)="mode.set($event)">
        <mat-button-toggle value="overall">Overall</mat-button-toggle>
        <mat-button-toggle value="qb">QB</mat-button-toggle>
        <mat-button-toggle value="rb">RB</mat-button-toggle>
        <mat-button-toggle value="wr">WR</mat-button-toggle>
        <mat-button-toggle value="te">TE</mat-button-toggle>
      </mat-button-toggle-group>
    </header>

    <div class="grid">
      @for (n of Array.from({length: 5}).keys(); track n) {
        <section class="col">
          <h4>Tier {{ n+1 }}</h4>
          <ul>
            @for (i of [1,2,3,4]; track i) {
              <li class="row">
                <span class="name">Player {{ n+1 }}.{{ i }}</span>
                <span class="meta">BYE 10 • Tier {{ n+1 }}</span>
              </li>
            }
          </ul>
        </section>
      }
    </div>
  `,
  styles: [`
    .filters{display:flex;justify-content:flex-end;padding:8px}
    .grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;padding:8px}
    @media (max-width: 1200px){ .grid{grid-template-columns:repeat(3,1fr)} }
    @media (max-width: 900px){ .grid{grid-template-columns:repeat(2,1fr)} }
    @media (max-width: 600px){ .grid{grid-template-columns:1fr} }
    .row{display:flex;justify-content:space-between;padding:6px;border-bottom:1px solid rgba(0,0,0,.08)}
    .name{font-weight:500}
    .meta{opacity:.7}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheatSheetsComponent {
  mode = signal<'overall'|'qb'|'rb'|'wr'|'te'>('overall');
Array: any;
}
