import { DatePicker, Form } from 'antd';
import React from 'react';
import { IStaffFormInput } from '..';

type Props = IStaffFormInput;

const InputDate = ({
    label,
    name,
    rules,
    ...extra
}: Props) => {

    return (
        <div className='form-row'>
            <Form.Item
                label={label}
                name={name}
                rules={rules}
                {...extra}
            >

                <DatePicker suffixIcon={false} allowClear={false} />
            </Form.Item>
        </div>
    );
};

export default InputDate;