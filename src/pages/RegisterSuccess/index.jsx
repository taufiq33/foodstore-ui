import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  LayoutOne,
  Text,
  Button,
} from 'upkit';

function RegisterSuccess() {
  return (
    <LayoutOne size="small">
      <Card color="white">
        <Text as="h3">
          Pendaftaran Berhasil.
        </Text>

        <br />

        <Link to="/login">
          <Button fitContainer>
            Masuk
          </Button>
        </Link>
      </Card>
    </LayoutOne>
  );
}

export default RegisterSuccess;
