import { EStatus } from '../types';

export const listCustomer = [
    {
        id: 1,
        name: 'aaaaaa',
        room: 'aaaaaaaaaaaa',
        status: 'inactive'
    },
    {
        id: 1,
        name: 'aaaaaa',
        room: 'aaaaaaaaaaaa',
        status: 'work'
    },
    {
        id: 1,
        name: 'aaaaaa',
        room: 'aaaaaaaaaaaa',
        status: 'work'
    },
    {
        id: 1,
        name: 'aaaaaa',
        room: 'aaaaaaaaaaaa',
        status: 'inactive'
    },
];

export const getStatusCustomerLabel = (status: string) => {
    switch (status) {
        case EStatus.INACTIVE:
            return { label: 'Không hoạt động', color: 'red' };
        case EStatus.WORK:
            return { label: 'hoạt động', color: 'green' };
        default:
            return { label: '', color: 'black' };
    }
};