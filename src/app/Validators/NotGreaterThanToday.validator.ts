import { AbstractControl, ValidationErrors } from "@angular/forms";

export function NotGreaterThanToday(control : AbstractControl) : ValidationErrors | null {
    const date = control.value;
    if(date) {
        let inputDate = date;
        if(typeof(date) == 'string') {
            const formatDate = date.split('-');
            inputDate = new Date(parseInt(formatDate[2]), parseInt(formatDate[1]) -1, parseInt(formatDate[0]) );
        }

        const today = new Date();
        today.setHours(0,0,0,0);
        inputDate.setHours(0,0,0,0)
        const diffInMs = inputDate.getTime() - today.getTime();
        if(diffInMs >= 0){
            return ({
                NotGreaterThanToday : 'This field should be less than today'
            })
        }
    }
    return null;
}