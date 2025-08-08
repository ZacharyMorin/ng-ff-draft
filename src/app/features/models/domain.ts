export type Position = 'QB'|'RB'|'WR'|'TE'|'FLEX'|'DST';

export interface Player { 
  id: string; 
  name: string; 
  team: string; 
  pos: Position; 
  bye: number; 
  tier: number; 
  draftedBy?: string 
}

export interface Team { 
  id: string; 
  name: string; 
  roster: Partial<Record<Position, Player[]>> 
}

export interface Pick { 
  pickNo: number; 
  teamId: string; 
  playerId: string; 
  timestamp: number 
}

export interface Draft { 
  id: string; 
  round: number; 
  totalRounds: number; 
  teams: Team[]; 
  picks: Pick[]; 
  clockEndsAt?: number 
}

export interface User { 
  id: string; 
  email: string 
}
