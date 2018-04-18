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
  MatDialogModule
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
  MatDialogModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
