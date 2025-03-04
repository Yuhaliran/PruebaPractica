import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { PanelComponent } from '../componentes/panel/panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<app-panel></app-panel>`,
  imports: [MatSidenavModule, MatButtonModule, PanelComponent]
})
export class AppComponent { }
