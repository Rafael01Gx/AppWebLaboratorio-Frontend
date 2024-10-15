import { AbstractControl, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn{

    return (control: AbstractControl)=>{
        const hasUpper = /[A-Z]/.test(control.value)
        const hasLower = /[a-z]/.test(control.value)
        const hasNumber = /[0-9]/.test(control.value)
        //const hasEspecial = /[^a-zA-Z0-9]/.test(control.value)
        
        if(hasUpper && hasLower && hasNumber){
            return null
        }
        return  { invalidPassword: true}
    }
}