import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';

const Progress = () => {
  const [image, setImage] = useState(null);
  const [maNhanVien, setMaNhanVien] = useState('');
  const [tenNhanVien, setTenNhanVien] = useState('');
  const [ngaySinh, setNgaySinh] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');
  const [email, setEmail] = useState('');
  const [cccd, setCccd] = useState('');
  const [chucVu, setChucVu] = useState('');
  const [taiKhoan, setTaiKhoan] = useState('');
  const [matKhau, setMatKhau] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    // Kiểm tra điều kiện trước khi cập nhật
    if (maNhanVien.trim() === '') {
      alert('Vui lòng nhập mã nhân viên');
      return;
    }
    if (tenNhanVien.trim() === '') {
      alert('Vui lòng nhập tên nhân viên');
      return;
    }
    if (ngaySinh.trim() === '') {
      alert('Vui lòng chọn ngày sinh');
      return;
    }
    if (soDienThoai.trim() === '') {
      alert('Vui lòng nhập số điện thoại');
      return;
    }
    if (email.trim() === '') {
      alert('Vui lòng nhập email');
      return;
    }
    if (cccd.trim() === '') {
      alert('Vui lòng nhập CCCD');
      return;
    }
    if (chucVu.trim() === '') {
      alert('Vui lòng nhập chức vụ');
      return;
    }
    if (taiKhoan.trim() === '') {
      alert('Vui lòng nhập tài khoản');
      return;
    }
    if (matKhau.trim() === '') {
      alert('Vui lòng nhập mật khẩu');
      return;
    }

    // Nếu các điều kiện đều đúng, thực hiện cập nhật
    alert('Cập nhật thông tin thành công!');
  };

  const handleDelete = () => {
    // Thực hiện xóa thông tin nhân viên
    alert('Xóa thông tin nhân viên thành công!');
  };

  return (
    <CRow>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cập nhật thông tin nhân viên</strong>
          </CCardHeader>
          <CCardBody>
            <div className="mb-3">
              <label htmlFor="maNhanVien" className="form-label">Mã nhân viên</label>
              <input 
                type="text" 
                className="form-control" 
                id="maNhanVien" 
                placeholder="Nv102312" 
                value={maNhanVien}
                onChange={(e) => setMaNhanVien(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tenNhanVien" className="form-label">Tên nhân viên</label>
              <input 
                type="text" 
                className="form-control" 
                id="tenNhanVien" 
                placeholder="Truong Viet Hoang" 
                value={tenNhanVien}
                onChange={(e) => setTenNhanVien(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ngaySinh" className="form-label">Ngày sinh</label>
              <input 
                type="date" 
                className="form-control" 
                id="ngaySinh" 
                value={ngaySinh}
                onChange={(e) => setNgaySinh(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="soDienThoai" className="form-label">Số điện thoại</label>
              <input 
                type="tel" 
                className="form-control" 
                id="soDienThoai" 
                placeholder="Số điện thoại" 
                value={soDienThoai}
                onChange={(e) => setSoDienThoai(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="mb-3">
              <label htmlFor="anhNhanVien" className="form-label">Ảnh nhân viên</label>
              <input 
                type="file" 
                className="form-control" 
                id="anhNhanVien" 
                onChange={handleImageChange} 
              />
            </div>
            <div className="mb-3">
              {image && (
                <img src={image} alt="Ảnh nhân viên" style={{ maxWidth: '100%', height: 'auto' }} />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="cccd" className="form-label">CCCD</label>
              <input 
                type="text" 
                className="form-control" 
                id="cccd" 
                placeholder="CCCD" 
                value={cccd}
                onChange={(e) => setCccd(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="chucVu" className="form-label">Chức vụ</label>
              <input 
                type="text" 
                className="form-control" 
                id="chucVu" 
                placeholder="Chức vụ" 
                value={chucVu}
                onChange={(e) => setChucVu(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="taiKhoan" className="form-label">Tài khoản</label>
              <input 
                type="text" 
                className="form-control" 
                id="taiKhoan" 
                placeholder="Tài khoản" 
                value={taiKhoan}
                onChange={(e) => setTaiKhoan(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="matKhau" className="form-label">Mật khẩu</label>
              <input 
                type="password" 
                className="form-control" 
                id="matKhau" 
                placeholder="Mật khẩu" 
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
              />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      {/* Nút cập nhật */}
      <div className="d-grid mb-3">
        <CButton color="primary" onClick={handleUpdate}>Cập Nhật</CButton>
      </div>
      {/* Nút xóa */}
      <div className="d-grid mb-3">
        <CButton color="danger" onClick={handleDelete}>Xóa</CButton>
      </div>
    </CRow>
  );
};

export default Progress;
