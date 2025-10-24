import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CounterService } from '@nxmfe/shared/services';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected counterService = inject(CounterService);
  isMenuCollapsed = true;

  // Use computed to ensure reactivity across MFE boundaries
  protected counter = this.counterService.counter;

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
