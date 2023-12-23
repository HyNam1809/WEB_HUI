import { Input, InputProps } from 'antd';
import _debounce from 'lodash/debounce';
import React, { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
interface Props {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onDebounce?: (v: string) => void;
}

const InputSearch = ({
  onChange,
  onDebounce
}: Props) => {
  const [text, setText] = useState('');
  const debounce = useCallback(_debounce((text) => {
    if (typeof onDebounce === 'function') onDebounce(text);
  }, 1000), [onDebounce]);

  useEffect(() => {
    debounce(text);
  }, [text]);

  return (
    <div className='common-input-search'>
      <input onChange={(e) => {
        setText(e?.target?.value ?? '');
        if (typeof onChange === 'function') onChange(e);
      }} type='text' placeholder='tìm kiếm' />
    </div>
  );
};

export default InputSearch;

interface InputSearchProps extends InputProps { }

export const InputSearchContain: React.FC<InputSearchProps> = (props) => {
  return (
    <InputSearchContainStyled className={props.className}>
      <div className='prefix_input_search'>
        <SearchOutlined />
      </div>
      <Input {...props} className='is-small' />
    </InputSearchContainStyled>
  );
};

const InputSearchContainStyled = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  width: 100%;
  min-width: 248px;
  height: 48px;
  background: var(--color-white-01);
  border-radius: 6px;
  border: none;
  color: var(--color-primary);
  font-weight: 500;
  box-shadow: none !important;
  .prefix_input_search {
    align-self: center;
    top: 0px;
    bottom: 0px;
    left: 0px;
    display: flex;
    height: 100%;
    padding: 14px 16px;
    img {
      width: 20px;
      min-width: 20px;
    }
  }
  input {
    flex: 1;
    background-color: transparent;
    padding-left: 0px;
  }
`;
