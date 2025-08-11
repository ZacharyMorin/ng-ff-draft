import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, orderBy, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export type Pos = 'QB'|'RB'|'WR'|'TE'|'DST';

export interface PlayerDoc {
  id: string;               // provided via idField
  rk: number | null;
  tier: number | null;
  name: string;
  team: string;
  pos: Pos;
  byeWeek: number | null;
  sosSeason: number | null;
  ownerId: string | null;
}

@Injectable({ providedIn: 'root' })
export class PlayersService {
  private fs = inject(Firestore);

  /** All players ordered by tier then name */
  listOrdered(): Observable<PlayerDoc[]> {
    const ref = collection(this.fs, 'players');
    const q = query(ref, orderBy('tier'), orderBy('name'));
    return collectionData(q, { idField: 'id' }) as unknown as Observable<PlayerDoc[]>;
  }

  /** By position (still ordered) */
  byPos(pos: Pos): Observable<PlayerDoc[]> {
    const ref = collection(this.fs, 'players');
    const q = query(ref, where('pos', '==', pos), orderBy('tier'), orderBy('name'));
    return collectionData(q, { idField: 'id' }) as unknown as Observable<PlayerDoc[]>;
  }
}
