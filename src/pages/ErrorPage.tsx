import React from 'react';
import { useRouteError } from 'react-router-dom';

interface IRouteError extends Error {
  statusText?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as IRouteError;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
