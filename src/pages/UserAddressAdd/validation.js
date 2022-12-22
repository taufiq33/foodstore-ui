const rules = {
  nama_alamat: {
    required: { value: true, message: 'Nama Alamat tidak boleh kosong' },
    maxLenght: { value: 500, message: 'Maksimal 500karakter' },
    minLenght: { value: 5, message: 'Minimal 5 karakter' },
  },
  provinsi: {
    required: { value: true, message: 'Nama Provinsi tidak boleh kosong' },
  },
  kabupaten: {
    required: { value: true, message: 'Nama Kabupaten tidak boleh kosong' },
  },
  kecamatan: {
    required: { value: true, message: 'Nama Kecamatan tidak boleh kosong' },
  },
  desa: {
    required: { value: true, message: 'Nama Desa tidak boleh kosong' },
  },
  detail_alamat: {
    required: { value: true, message: 'Detail Alamat tidak boleh kosong' },
    maxLenght: { value: 1200, message: 'Maksimal 1200karakter' },
  },
};

export default rules;
