import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPage = () => {
  return (
    <NotFoundPageStyled>
      <h2 className='title'>404</h2>
      <div className='text-container'>
        <p className='text'>
          Chúng tôi xin lỗi, nhưng trang bạn yêu cầu không được tìm thấy
        </p>
        <div className='btn-wrapper'>
          <Link to='/'>
            <button className='btn'>Quay lại</button>
          </Link>
        </div>
      </div>
    </NotFoundPageStyled >
  );
};

export default NotFoundPage;

const NotFoundPageStyled = styled.div`
display: flex;
justify-content: center;
align-items: center;
text-align: center;
gap: 20px;
height: 100vh;
.title {
  font-size: 200px;
  margin: 0;
}

.text-container {
  display: grid;
  gap: 16px;
  .text {
    font-size: 32px;
    font-weight: 500;
  }
  .btn {
    padding: 16px 24px;
    border-radius: 8px;
    border: 1px solid transparent;
    background: #EF503A;
    font-size: 18px;
    font-weight: 400;
    color: #FFFFFF;
    transition: all 0.3s ease-in;
    cursor: pointer;
    &:hover {
      background: #FFF0E2;
    }
  }
}
`;
