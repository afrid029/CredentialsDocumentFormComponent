import { AbstractControl, ValidationErrors } from "@angular/forms";

export function AwardedDateWithExpiryDate(control : AbstractControl) : ValidationErrors | null {
    
    const parent = control.parent;
    const awardeddate = control?.get('awardeddate')?.value;
    const expirydate = control?.get('expirydate')?.value;

    if(awardeddate && expirydate) {
        let inputAwardedDate = awardeddate;
        let inputExpiryDate = expirydate;

        if(typeof(awardeddate) == 'string') {
            const formatedDate = awardeddate.split('-');
            inputAwardedDate = new Date(parseInt(formatedDate[2]), parseInt(formatedDate[1])-1, parseInt(formatedDate[0]));
        }
        if(typeof(expirydate) == 'string') {
            const formatedDate = expirydate.split('-');
            inputExpiryDate = new Date(parseInt(formatedDate[2]), parseInt(formatedDate[1])-1, parseInt(formatedDate[0]));
        }

        inputAwardedDate.setHours(0,0,0,0);
        inputExpiryDate.setHours(0,0,0,0);

        const diffInMs = inputExpiryDate.getTime() - inputAwardedDate.getTime();
        if(diffInMs < 0){
            return ({
                AwardedDateWithExpiryDate : 'Expiry date should be greater than awarded date'
            })
        }

        if(diffInMs == 0) {
          
             return ({
                AwardedDateWithExpiryDate : 'Awarded date and expiry date should not be same date'
            })
        }
    }
    return null;
}