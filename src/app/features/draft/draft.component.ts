import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DraftStore } from '../../state/draft.store';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DraftTopbarComponent } from './components/draft-topbar.component';
import { RosterPanelComponent } from './components/roster-panel.component';
import { CheatSheetsComponent } from './components/cheat-sheets.component';
import { TeamsDrawerComponent } from './components/teams-drawer.component';


@Component({
  selector: 'app-draft',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    DraftTopbarComponent,
    RosterPanelComponent,
    CheatSheetsComponent,
    TeamsDrawerComponent
  ],
  template: `
    <draft-topbar />

    <mat-sidenav-container class="layout">
      <mat-sidenav mode="side" opened>
        <roster-panel />
      </mat-sidenav>

      <mat-sidenav-content>
        <cheat-sheets />
      </mat-sidenav-content>

      <mat-sidenav position="end" mode="side" opened>
        <teams-drawer />
      </mat-sidenav>
    </mat-sidenav-container>
  `,
  styles: [`.layout{height:calc(100dvh - 64px)}`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DraftComponent {
  private route = inject(ActivatedRoute);
  private store = inject(DraftStore);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.store.loadDraft(id);
    });
  }
}
