import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [MatCardModule, MatFormFieldModule, MatProgressBarModule, MatInputModule, MatButtonModule],
    declarations: [
    ],
    exports: [MatCardModule, MatFormFieldModule, MatProgressBarModule, MatInputModule, MatButtonModule]
})
export class MaterialModule { }
