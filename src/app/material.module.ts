import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
  MatSidenavModule,
  MatMenuModule,
  MatIconModule,
  MatGridListModule,
  MatSelectModule,
  MatExpansionModule,
  MatDividerModule,
  MatListModule,
  MatTooltipModule,
  MatDialogModule,
  MatChipsModule,
  MatRadioModule
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
  MatSidenavModule,
  MatMenuModule,
  MatIconModule,
  MatGridListModule,
  MatSelectModule,
  MatExpansionModule,
  MatDividerModule,
  MatListModule,
  MatTooltipModule,
  MatDialogModule,
  MatChipsModule,
  MatRadioModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
