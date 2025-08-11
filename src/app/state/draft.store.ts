import { inject, Injectable, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PlayersService, PlayerDoc, Pos } from '../services/players.service';
import { Draft, Pick, Team } from '../features/models/domain';

@Injectable({ providedIn: 'root' })
export class DraftStore {
  private playersSvc = inject(PlayersService);

  private readonly _draft = signal<Draft | null>(null);

  // Firestore stream -> signal
  private players$ = this.playersSvc.listOrdered();
  readonly players = toSignal(this.players$, {
    initialValue: [] as PlayerDoc[],
  });

  readonly draft = computed(() => this._draft());
  readonly teams = computed(() => this._draft()?.teams ?? []);
  readonly picks = computed(() => this._draft()?.picks ?? []);

  readonly currentPick = computed(() => {
    const d = this._draft(); if (!d) return null;
    const next = d.picks.length + 1;
    return { pickNo: next, round: Math.ceil(next / d.teams.length) };
  });

  async loadDraft(id: string) {
    const teams: Team[] = Array.from({ length: 12 }, (_, i) => ({ id: `t${i+1}`, name:`Team ${i+1}`, roster: {} }));
    this._draft.set({ id, round: 1, totalRounds: 16, teams, picks: [] });
  }

  recordPick(pick: Pick) {
    this._draft.update(d => d ? { ...d, picks: [...d.picks, pick] } : d);
  }

  /** Derived helpers you can reuse anywhere */
  filterByPos = (pos: Pos | 'ALL') => computed(() => {
    const list = this.players();
    if (pos === 'ALL') return list ?? [];
    return (list ?? []).filter(p => p.pos === pos);
  });
}
