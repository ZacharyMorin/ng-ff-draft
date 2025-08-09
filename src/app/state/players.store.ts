import { Injectable, computed, signal } from '@angular/core';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { Player } from '../features/models/domain';

@Injectable({ providedIn: 'root' })
export class PlayersStore {
  private readonly _players = signal<Player[] | null>(null);
  readonly players = computed(() => this._players() ?? []);
  readonly loading = signal(false);
  readonly loaded = computed(() => !!this._players() && !this.loading());

  async loadAllOnce() {
    if (this._players()) return; // already loaded
    this.loading.set(true);
    try {
      const db = getFirestore();
      const q = query(collection(db, 'players'));
      const snap = await getDocs(q);
      const list: Player[] = snap.docs.map(d => ({ id: d.id, ...d.data() }) as Player);
      this._players.set(list);
    } finally {
      this.loading.set(false);
    }
  }

  // Helper grouped by tier & position
  readonly playersByTier = computed(() => {
    const list = this.players();
    const by: Record<number, Player[]> = {};
    for (const p of list) {
      (by[p.tier] ||= []).push(p);
    }
    // sort players within tier (e.g., by name or maybe pos)
    Object.values(by).forEach(arr => arr.sort((a,b) => a.name.localeCompare(b.name)));
    return by;
  });

  readonly tiers = computed(() => Object.keys(this.playersByTier()).map(Number).sort((a,b)=>a-b));
}
