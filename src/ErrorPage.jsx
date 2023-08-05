import React from 'react';
import { useRouteError } from 'react-router-dom';
import './assets/errorpage.css'

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error); 
  const errorMessageFromRequest = error?.request ?
    !error?.response ? 'no response from server' :
      error?.response?.data?.message : '';
  
  console.log('my custom error page');
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {errorMessageFromRequest?.length ?
        <p>{errorMessageFromRequest}</p> : null}
      
        <p>{error.statusText || error.message}</p>
        <br />
        <p>{error.data}</p>

    </div>
  );
}

export default ErrorPage;
