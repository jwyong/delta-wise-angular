import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatIconModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatDialogModule,
        MatChipsModule,
        MatListModule,
        MatExpansionModule,
        MatPaginatorModule,
    ],
    declarations: [
    ],
    exports: [
        MatCardModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatIconModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatDialogModule,
        MatChipsModule,
        MatListModule,
        MatExpansionModule,
        MatPaginatorModule,
    ]
})
export class MaterialModule { }
