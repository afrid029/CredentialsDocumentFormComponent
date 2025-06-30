import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function GreaterThanDateValidator(dob : Date ) : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null => {
        const date = control.value;
        if(date) {
            let inputDob = dob;
            let inputDate = date;

            // if(typeof(dob) == 'string') {
            //     const formattedDate = dob.split('-');
            //     inputDob = new Date (parseInt(formattedDate[2]), parseInt(formattedDate[1]) - 1, parseInt(formattedDate[0]))
            // } 

            if(typeof(date) == 'string'){
                const formatDate = date.split('-');
                inputDate = new Date(parseInt(formatDate[2]), parseInt(formatDate[1]) - 1, parseInt(formatDate[0]));
            }

            inputDate.setHours(0,0,0,0);
            inputDob.setHours(0,0,0,0);
            const diffInMs = inputDate.getTime() - inputDob.getTime()
            if(diffInMs <= 0){
                return ({
                    GreaterThanDateValidator : 'This field should be greater than date of birth'
                })
            }
        }
        return null;
    }
} 