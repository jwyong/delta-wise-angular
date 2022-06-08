import { HttpService } from 'src/app/services/http-service';
import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
/**
 * service holding common services
 */
export class CommonServices {
    constructor(public httpService: HttpService, public _snackBar: MatSnackBar,
    ) { }

    showSnackbar(msgStr: string, actionStr?: string, action?: () => void, durationInSecs?: number) {
        this._snackBar.open(msgStr, actionStr ?? "", {
            duration: durationInSecs ?? 3 * 1000
        }).afterDismissed().subscribe(() => {
            action
        })
    }
}