export interface User{
    uid:string;
    photoURL:string|null;
    isAnonymous:boolean;
    emailVerified:boolean
    email:string|null;
    displayName:string|null;
}