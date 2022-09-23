export interface User{
    sub:string;
    photoURL:string|null;
    isAnonymous:boolean;
    emailVerified:boolean
    email:string|null;
    displayName:string|null;

}