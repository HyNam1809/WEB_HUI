import { Form, InputNumber } from 'antd';
import React from 'react';
import { IStaffFormInput } from '..';
import styled from 'styled-components';

type Props = IStaffFormInput;

const InputNumbers = ({
    label,
    name,
    rules,
    placeholder,
    defaultValue,
    ...extra
}: Props) => {

    return (
        <InputNumberStyled>
            <div className='form-row'>
                <Form.Item
                    label={label}
                    name={name}
                    rules={rules}
                    {...extra}
                >

                    <InputNumber placeholder={placeholder} defaultValue={defaultValue} />
                </Form.Item>
            </div>
        </InputNumberStyled>
    );
};

export default InputNumbers;

const InputNumberStyled = styled.div`
.ant-input-number {
    width: 100%;
}
`;