import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'teams-drawer',
  template: `
    <section class="panel">
      <h3>Other Teams</h3>
      <ul>
        @for (i of [1,2,3,4,5,6,7,8,9,10,11,12]; track i) {
          <li class="row">Team {{ i }}</li>
        }
      </ul>
    </section>
  `,
  styles: [`
    .panel{padding:12px; width:240px; max-width:75vw}
    .row{padding:6px 0; border-bottom:1px solid rgba(0,0,0,.06)}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsDrawerComponent {}
