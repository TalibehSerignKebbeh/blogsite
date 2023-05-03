import React from 'react';
import { useRouteError } from 'react-router-dom';
import './assets/errorpage.css'

const ErrorPage = () => {
    const error = useRouteError();
  console.error(error);
    return (
        <div id="error-page">
      <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>{error?.response ? error?.response?.data?.message
          : "No response from server"}</p>
      <p>
                <i>{error.statusText || error.message}</i>
                <br />
        <i>{error.data}</i>
        </p>
        
    </div>
    );
}

export default ErrorPage;
