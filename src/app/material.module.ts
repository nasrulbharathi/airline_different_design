import { NgModule } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [MatGridListModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule,
    MatSelectModule, MatExpansionModule, MatCheckboxModule, MatDividerModule, MatListModule,
    MatChipsModule, MatRadioModule, MatDialogModule, MatStepperModule, MatTooltipModule,
    MatAutocompleteModule, MatSlideToggleModule, MatProgressSpinnerModule],
  exports: [MatGridListModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule,
    MatSelectModule, MatExpansionModule, MatCheckboxModule, MatDividerModule, MatListModule,
    MatChipsModule, MatRadioModule, MatDialogModule, MatStepperModule, MatTooltipModule,
    MatAutocompleteModule, MatSlideToggleModule, MatProgressSpinnerModule]
})
export class MyMaterialModule { }
