export interface ProfileTypes {  
    email: string;  
    first_name: string;  
    last_name: string;  
    username: string;
    is_employee?: boolean;
}  

export type AvatarTypes = {
	image: Blob | File | string;
};