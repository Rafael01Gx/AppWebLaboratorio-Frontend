import { AbstractControl, ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn{

    return (control: AbstractControl)=>{
        const hasEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(control.value)

        if(hasEmail){
            return null
        }
        return  { invalidEmail: true}
    }
}