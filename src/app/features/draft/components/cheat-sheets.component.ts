import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PlayersStore } from '../../../state/players.store';

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

    @if (loading()) {
      <p class="loading">Loading players…</p>
    } @else {
      <div class="grid">
        @for (tier of filteredTiers(); track tier) {
          <section class="col">
            <h4>Tier {{ tier }}</h4>
            <ul>
              @for (p of filteredPlayersByTier()[tier]; track p.id) {
                <li class="row">
                  <span class="name">{{ p.name }} ({{ p.pos }})</span>
                  <span class="meta">BYE {{ p.bye }} • {{ p.team }}</span>
                </li>
              }
            </ul>
          </section>
        }
      </div>
    }
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
    .loading{padding:16px;text-align:center;opacity:.7}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheatSheetsComponent {
  private readonly playersStore = inject(PlayersStore);
  mode = signal<'overall'|'qb'|'rb'|'wr'|'te'>('overall');

  // Kick off loading on first instantiation
  private _init = effect(() => { this.playersStore.loadAllOnce(); });

  loading = computed(() => this.playersStore.loading());

  // Derived filtered players-by-tier respecting selected mode (position)
  filteredPlayersByTier = computed(() => {
    const map = this.playersStore.playersByTier() as Record<number, import('../../../features/models/domain').Player[]>;
    const mode = this.mode();
    if (mode === 'overall') return map;
    const filtered: typeof map = {};
    for (const tier of Object.keys(map)) {
      const tNum = +tier;
      const list = map[tNum].filter((p: import('../../../features/models/domain').Player) => p.pos.toLowerCase() === mode);
      if (list.length) filtered[tNum] = list;
    }
    return filtered;
  });

  filteredTiers = computed(() => Object.keys(this.filteredPlayersByTier()).map(Number).sort((a,b)=>a-b));
}
