import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatButtonModule
} from '@angular/material/button';
import {
  MatCardModule
} from '@angular/material/card';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import {
  MatInputModule
} from '@angular/material/input';
import {
  MatSelectModule
} from '@angular/material/select';
import {
  MatToolbarModule
} from '@angular/material/toolbar';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
  ],
  templateUrl: './landing.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Landing {
  private readonly router = inject(Router);
  protected readonly environment = environment;

  navigateToLogin(target: string): void {
    this.router.navigate([target]);
  }
}
