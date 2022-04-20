import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [MatCardModule, MatFormFieldModule, MatProgressBarModule, MatInputModule],
    declarations: [
    ],
    exports: [MatCardModule, MatFormFieldModule, MatProgressBarModule, MatInputModule]
})
export class MaterialModule { }
