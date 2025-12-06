import { UserConstants } from './user.constant';

export type TRoles = keyof typeof UserConstants.Roles;

export type TUser = {
    id: number;
    name: string;
    email: string;
    password?: string;
    phone: string;
    role: TRoles;
};
