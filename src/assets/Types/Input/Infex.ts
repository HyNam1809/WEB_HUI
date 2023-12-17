import { Rule } from 'antd/es/form';

interface IOption {
    label: string;
    value: string;
}

export interface IStaffFormInput {
    label?: string;
    name?: string;
    rules?: Rule[];
    placeholder?: string;
    defaultValue?: string;
    options?: IOption[];
    type?: 'text' | 'select' | 'switch' | 'password' | 'phone';
    title?: string;
    subTitle?: string;
}