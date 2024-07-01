export interface LoginFormValuesInterface {
    phone: string,
    dispatch : any,
    displaySmsVerificationInput: any,
    setTemporaryUserPhone: any,
}

export interface LoginFormVerifyValuesInterface {
    code: string,
    phone: string,
    router : any,
}

export interface RegisterFormValuesInterface {
    firstname: string,
    lastname: string,
    phone: string,
    dispatch : any,
    displaySmsVerificationInput: any,
    setTemporaryUserPhone: any,
    setDisplaySuccessMessage? : any,
    displaySuccessMessage? : boolean,
}

export interface RegisterFormVerifyValuesInterface {
    code: string,
    phone: string,
    router : any,
    setDisplaySuccessMessage? : any,
    displaySuccessMessage? : boolean,
}

