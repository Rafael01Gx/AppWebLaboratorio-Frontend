import { FormControl } from "@angular/forms";

export interface ISignup {
    name: FormControl,
    email: FormControl,
    password: FormControl,
    confirmpassword: FormControl,
}
