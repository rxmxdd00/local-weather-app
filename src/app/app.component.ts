import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <mat-toolbar color="primary">
        <span>LocalCast Weather</span>
      </mat-toolbar>
      <div fxLayoutAlign="center" class="mat-caption vertical-margin">Your city, your forecast, right no!</div>
      <div fxLayoutAlign="center">
        <app-city-search></app-city-search>
      </div>
      <div fxLayout="row">
        <div fxFlex></div>
        <div fxFlex="300px">
          <mat-card>
            <mat-card-title>
            <div class="mat-headline">Current Weather</div>
            </mat-card-title>
            <app-current-weather>
            </app-current-weather>
          </mat-card>
        </div>
        <div fxFlex></div>
      </div>
    </div>
  `,
})
export class AppComponent {}
