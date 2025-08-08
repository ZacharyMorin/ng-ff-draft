import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DraftStore } from '../../../state/draft.store';

@Component({
  selector: 'draft-topbar',
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar>
      <span>Live Draft</span>
      <span class="spacer"></span>
      @if (current()) {
        <strong>Pick {{ current()!.pickNo }}</strong>
      }
    </mat-toolbar>
  `,
  styles: [`.spacer{flex:1}`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DraftTopbarComponent {
  private store = inject(DraftStore);
  current = computed(() => this.store.currentPick());
}
