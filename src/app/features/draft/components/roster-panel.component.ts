import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'roster-panel',
  template: `
    <section class="panel">
      <h3>Your Team</h3>
      <ul>
        @for (pos of ['QB','RB','WR','TE','FLEX','DST']; track pos) {
          <li class="row">
            <span class="pos">{{ pos }}</span>
            <span class="slot">—</span>
          </li>
        }
      </ul>
    </section>
  `,
  styles: [`
    .panel{padding:12px; width:260px; max-width:80vw}
    .row{display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid rgba(0,0,0,.06)}
    .pos{font-weight:600}
    .slot{opacity:.7}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'panel-roster' }
})
export class RosterPanelComponent {}
