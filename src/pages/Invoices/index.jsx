/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useParams } from 'react-router-dom';

function Invoices() {
  const { id } = useParams();
  return (
    <div>
      <p>Invoices Page for Order number Id : {id}</p>
    </div>
  );
}

export default Invoices;
