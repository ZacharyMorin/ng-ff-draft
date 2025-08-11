import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { PlayersStore } from '../../../state/players.store';
import type { Player } from '../../../features/models/domain';

@Component({
  selector: 'cheat-sheets',
  imports: [MatButtonToggleModule, MatTableModule, MatSortModule],
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

    <table mat-table [dataSource]="filteredPlayersByTier()" class="mat-elevation-z8">

      <!--- Note that these columns can be defined in any order.
            The actual rendered columns are set as a property on the row definition" -->

      <!-- Position Column -->
      <ng-container matColumnDef="position">
        <th mat-header-cell *matHeaderCellDef> No. </th>
        <td mat-cell *matCellDef="let element"> {{element.position}} </td>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let element"> {{element.name}} </td>
      </ng-container>

      <!-- Weight Column -->
      <ng-container matColumnDef="weight">
        <th mat-header-cell *matHeaderCellDef> Weight </th>
        <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
      </ng-container>

      <!-- Symbol Column -->
      <ng-container matColumnDef="symbol">
        <th mat-header-cell *matHeaderCellDef> Symbol </th>
        <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [`
    
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheatSheetsComponent {
  private readonly playersStore = inject(PlayersStore);
  mode = signal<'overall' | 'qb' | 'rb' | 'wr' | 'te'>('overall');

  // Material table columns (shared by each tier table)
  displayedColumns: Array<'player' | 'team' | 'bye'> = ['player', 'team', 'bye'];

  // Kick off loading once
  private _init = effect(() => { this.playersStore.loadAllOnce(); });

  loading = computed(() => this.playersStore.loading());

  // Map of tier -> players[] filtered by current mode
  filteredPlayersByTier = computed<Record<number, Player[]>>(() => {
    const map = this.playersStore.playersByTier() as Record<number, Player[]>;
    const mode = this.mode();
    if (mode === 'overall') return map;

    const out: Record<number, Player[]> = {}
    for (const tierStr of Object.keys(map)) {
      const tier = Number(tierStr);
      const list = map[tier].filter(p => p.pos.toLowerCase() === mode);
      if (list.length) out[tier] = list;
    }
    return out;
  });

  filteredTiers = computed<number[]>(() =>
    Object.keys(this.filteredPlayersByTier())
      .map(Number)
      .sort((a, b) => a - b)
  );
}
