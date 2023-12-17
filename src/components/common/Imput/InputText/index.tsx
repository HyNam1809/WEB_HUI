import { Form, Input } from 'antd';
import React, { useEffect, useRef } from 'react';
import { IStaffFormInput } from '..';

type Props = IStaffFormInput;

const InputText = ({
    label,
    name,
    rules,
    placeholder,
    defaultValue,
    ...extra
}: Props) => {
    const inputRef = useRef<any>();

    useEffect(() => {
        inputRef?.current?.input?.focus();
    }, []);


    return (
        <div className='form-row'>
            <Form.Item
                label={label}
                name={name}
                rules={rules}
                {...extra}
            >

                <Input ref={inputRef} placeholder={placeholder} defaultValue={defaultValue} />
            </Form.Item>
        </div>
    );
};

export default InputText;