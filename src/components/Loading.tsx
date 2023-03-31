import { Spin } from 'antd';

const Loading = () => {
  return (
    <Spin
      className='spin-custom'
      style={{ position: 'fixed', maxHeight: 'fit-content' }}
    >
      <div className='content' />
    </Spin>
  );
};

export default Loading;
