export type ItemInvoice = [
    id: number,
    title: string,
    content: string,
    time: string
];

export interface DataType {
    title: string;
    content: string;
    time: string;
    status: string
}

export type ItemStatus = [
    value: string,
    laber: string
]

export enum EStatus {
    WAIT = 'wait',
    CANCEL = 'cancel',
    SUCCESS = 'success',
}