import { Injectable, computed, signal } from '@angular/core';
import { User } from '../features/models/domain';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly _user = signal<User | null>(null);
  readonly user = computed(() => this._user());
  readonly isAuthenticated = computed(() => !!this._user());

  login = async (email: string, _password: string) => {
    // TODO: call API; placeholder
    this._user.set({ id: 'u1', email });
  };

  logout = () => this._user.set(null);
}
