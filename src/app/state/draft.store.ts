import { Injectable, computed, signal } from '@angular/core';
import { Draft, Player, Pick, Team } from '../features/models/domain';

@Injectable({ providedIn: 'root' })
export class DraftStore {
  private readonly _draft = signal<Draft | null>(null);
  readonly draft = computed(() => this._draft());
  readonly teams = computed(() => this._draft()?.teams ?? []);
  readonly picks = computed(() => this._draft()?.picks ?? []);
  readonly currentPick = computed(() => {
    const d = this._draft(); 
    if (!d) return null;
    const nextNo = d.picks.length + 1;
    return { pickNo: nextNo, round: Math.ceil(nextNo / d.teams.length) };
  });

  loadDraft = async (id: string) => {
    const teams: Team[] = Array.from({length: 12}, (_, i) => ({ id: `t${i+1}`, name:`Team ${i+1}`, roster: {} }));
    const players: Player[] = []; // TODO: load real data
    const draft: Draft = { id, round: 1, totalRounds: 16, teams, picks: [] };
    this._draft.set(draft);
  };

  recordPick = (pick: Pick) => {
    this._draft.update(d => d ? ({ ...d, picks: [...d.picks, pick] }) : d);
  };
}
