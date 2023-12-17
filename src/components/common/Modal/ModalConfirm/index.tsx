import { Modal } from 'antd';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import ImageDeleteConfirm from './img_delete';

type IconType = 'delete';

type IConfigs = { title: string, msg: string, submit: any, icon?: JSX.Element | null | IconType };
export type ModalConfirmRef = {
  show: (configs: IConfigs) => void
  hide: () => void;
}
type Props = {
  usePinVerify?: boolean;
  titleClose?: string;
  showClose?: boolean;
  titleConfirm?: string;
};
/* eslint-disable-next-line */
const ModalConfirm = forwardRef<ModalConfirmRef, Props>(({ usePinVerify = false, titleClose = '', titleConfirm = '', showClose = true }, ref) => {

  const [visible, setVisible] = useState(false);
  const memoRef = useRef<IConfigs>({
    title: '', msg: '', submit: () => undefined,
    icon: null,
  });
  const [isShowVerify, setShowVerify] = useState(false);
  const actionSubmitRef = useRef<() => void>(() => undefined);

  const hide: ModalConfirmRef['hide'] = () => setVisible(false);
  const show: ModalConfirmRef['show'] = (configs) => {
    memoRef.current = {
      ...configs,
    };
    setVisible(true);
  };

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  const { submit = () => undefined, msg, title, icon } = memoRef.current ?? {};

  const onSubmit = () => {
    
    if (usePinVerify) {
      setShowVerify(true);
      actionSubmitRef.current = submit;
    } else {
      submit();
    }

    hide();
  };

  const Icon = () => {
    if (typeof icon !== 'string') {
      return (
        icon ? <div className='modal-icon'>{icon}</div> : null
      );
    }
    switch (icon) {
      case 'delete':
        return <div className='modal-icon'>
          <ImageDeleteConfirm />
        </div>;
      default:
        return null;
    }
  };

  return (
    <>
      <Modal
        maskClosable={false}
        open={visible}
        onCancel={hide}
        okButtonProps={{ style: { display: 'none' } }}
        width={574}
        footer={null}
        centered
        forceRender
      >
        <div className='modal-delete-confirm'>
          <Icon />
          <h2 className='modal-title'>{title}</h2>
          <p className='modal-text'>{msg}</p>
          <div className='form-submit-wrapper'>
            {showClose && <button
              onClick={hide}
              type='button'
              className='common-btn is-white'
            >
              {titleClose || 'Close'}
            </button>}
            <button
              onClick={onSubmit}
              type='button'
              className='common-btn'
            >
              {titleConfirm || 'Confirm'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
});

export default ModalConfirm;
