import { Form, Input } from 'antd';
import { IStaffFormInput } from '..';

type Props = IStaffFormInput;

const StaffFormInputPassword = ({
    label,
    name,
    rules,
    placeholder,
    defaultValue,
    subTitle,
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
                <Input.Password placeholder={placeholder} defaultValue={defaultValue} />
                <p className='form-note'>
                    {subTitle}
                </p>
            </Form.Item>
        </div>
    );
};

export default StaffFormInputPassword;