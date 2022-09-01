const rules = {
  full_name: {
    required: {
      value: true,
      message: 'Nama lengkap harus diisi',
    },
    maxLength: {
      value: 500,
      message: 'Panjang maksimal nama 500 karakter',
    },
  },

  email: {
    required: {
      value: true,
      message: 'Alamat email harus diisi',
    },
    maxLength: {
      value: 255,
      message: 'Panjang maksimal Alamat email 255 karakter',
    },
    pattern: {
      value: /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/,
      message: 'Email tidak validddddddddddd',
    },
  },

  password: {
    required: {
      value: true,
      message: 'Kata sandi harus diisi',
    },
    maxLength: {
      value: 255,
      message: 'Panjang maksimal Kata sandi 255 karakter',
    },
  },

  password_confirmation: {
    required: {
      value: true,
      message: 'Konfrimasi Kata sandi harus diisi',
    },
  },
};

export default rules;
