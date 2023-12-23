import { EStatus } from '../types';

export const listInvoice = [
    {
        id: 1,
        title: 'aaaaaa',
        content: 'aaaaaaaaaaaa',
        time: '12/12/2023',
        status: 'success'
    },
    {
        id: 1,
        title: 'aaaaaa',
        content: 'aaaaaaaaaaaa',
        time: '12/12/2023',
        status: 'wait'
    },
    {
        id: 1,
        title: 'aaaaaa',
        content: 'aaaaaaaaaaaa',
        time: '12/12/2023',
        status: 'cancel'
    },
    {
        id: 1,
        title: 'aaaaaa',
        content: 'aaaaaaaaaaaa',
        time: '12/12/2023',
        status: 'success'
    },
];



export const getStatusDraftLabel = (status: string) => {
    switch (status) {
        case EStatus.WAIT:
            return { label: 'Chờ', color: 'orange' };
        case EStatus.CANCEL:
            return { label: 'Hủy', color: 'red' };
        case EStatus.SUCCESS:
            return { label: 'Thành công', color: 'green' };
        default:
            return { label: '', color: 'black' };
    }
};