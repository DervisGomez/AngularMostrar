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
  MatDividerModule
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
  MatDividerModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
