import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPage = () => {
  return (
    <NotFoundPageStyled>
      <h2 className='title'>404</h2>
      <p className='text'>
        We are sorry, but the page you requested was not found
      </p>
      <div className='btn-wrapper'>
        <Link to='/'>
          <button className='btn is-white'>Go home</button>
        </Link>
      </div>
    </NotFoundPageStyled>
  );
};

export default NotFoundPage;

const NotFoundPageStyled = styled.div``;
