import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';


const ModuloMaterial = [
  MatTooltipModule,
  MatToolbarModule,
  MatDialogModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatExpansionModule,
  MatDividerModule,
  MatMenuModule,
  MatChipsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTabsModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule
]

@NgModule({
  imports: [
    ModuloMaterial
  ],
  exports: [
    ModuloMaterial
  ]
})
export class MaterialModule { }
