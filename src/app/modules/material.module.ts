import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [MatCardModule, MatFormFieldModule, MatProgressBarModule, MatInputModule, MatButtonModule, MatSnackBarModule],
    declarations: [
    ],
    exports: [MatCardModule, MatFormFieldModule, MatProgressBarModule, MatInputModule, MatButtonModule, MatSnackBarModule]
})
export class MaterialModule { }
