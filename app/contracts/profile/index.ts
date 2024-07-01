export interface UserProfileFormInterface {
    fullName: string,
    gender: string,
    email: string,
    phone: string,
    setOpenDisplayInput: any,
    displaySmsInput: boolean,
    code: string,
}

export interface UserProfileVerifySmsFormInterface {
    setOpenDisplayInput: any,
    displaySmsInput: boolean,
    code: string,
}