const rules = {
  email: {
    required: {
      value: true,
      message: 'Alamat email wajib diisi.',
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
      message: 'Kata sandi wajib diisi.',
    },
  },
};

export default rules;
