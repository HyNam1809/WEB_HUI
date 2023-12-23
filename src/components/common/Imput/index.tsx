import { Rule } from 'antd/es/form';
import InputPassword from './InputPassword';
import InputText from './InputText';
import InputNumbers from './InputNumber';
import InputDate from './InputDate';
// import { Form } from 'antd';

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
    type?: 'text' | 'select' | 'switch' | 'password' | 'phone' | 'textPin' | 'number' | 'date';
    title?: string;
    subTitle?: string;
}

type Props = {
    inputs: IStaffFormInput[];
}

const StaffFormContent = ({ inputs }: Props) => {
    return (
        <>
            {inputs.map(function (input, i) {
                switch (input.type) {
                    // case 'select':
                    //     return (<StaffFormInputSelect
                    //         {...input}
                    //         key={`${input.name}_${i}`}
                    //         label={input.label}
                    //         placeholder={input.placeholder}
                    //         name={input.name}
                    //         defaultValue={input.defaultValue}
                    //         options={input.options}
                    //     />);
                    // case 'switch':
                    //     return (<StaffFormInputSwitch
                    //         {...input}
                    //         key={`${input.name}_${i}`}
                    //         label={input.label}
                    //         title={input.title}
                    //         subTitle={input.subTitle}
                    //     />);
                    case 'password':
                        return (
                            <InputPassword {...input} key={`${input.name}_${i}`} subTitle={input.subTitle} />
                        );
                    // case 'phone':
                    //     return (
                    //         <Form.Item name='phone' label='Phone number'>
                    //             <PhoneNumberInput key={`${input.name}_${i}`} />
                    //         </Form.Item>

                    //     );
                    // case 'textPin':
                    //     return (<StaffFormInoutPin
                    //         {...input}
                    //         key={`${input.name}_${i}`}
                    //         label={input.label}
                    //         rules={input.rules}
                    //         placeholder={input.placeholder}
                    //         name={input.name}
                    //         subTitle={input.subTitle}
                    //     />);
                    case 'date':
                        return (<InputDate
                            {...input}
                            key={`${input.name}_${i}`}
                            label={input.label}
                            rules={input.rules}
                            placeholder={input.placeholder}
                            name={input.name}
                        />);
                    case 'number':
                        return (<InputNumbers
                            {...input}
                            key={`${input.name}_${i}`}
                            label={input.label}
                            rules={input.rules}
                            placeholder={input.placeholder}
                            name={input.name}
                        />);
                    case 'text':
                    default:
                        return (<InputText
                            {...input}
                            key={`${input.name}_${i}`}
                            label={input.label}
                            rules={input.rules}
                            placeholder={input.placeholder}
                            name={input.name}

                        />);
                }
            })}
        </>
    );
};

export default StaffFormContent;