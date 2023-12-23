export interface ICustomer {
    name: string;
    room: string;
    status: string
}

export enum EStatus {
    WORK = 'work',
    INACTIVE = 'inactive',
}