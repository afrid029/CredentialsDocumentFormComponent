import { AbstractControl, ValidationErrors } from "@angular/forms";

export function CharectorLimit(control : AbstractControl) : ValidationErrors | null {
    const data = control.value;
    if(data){
        if(data.length > 100){
            return ({
                CharectorLimit: 'This field shoud not exceed 100 charectors'
            })
        }
    }
    return null;
}