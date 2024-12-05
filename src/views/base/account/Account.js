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
              <input type="text" className="form-control" id="maNhanVien" placeholder="Nv102312" />
            </div>
            <div className="mb-3">
              <label htmlFor="tenNhanVien" className="form-label">Tên nhân viên</label>
              <input type="text" className="form-control" id="tenNhanVien" placeholder="Truong Viet Hoang" />
            </div>
            <div className="mb-3">
              <label htmlFor="ngaySinh" className="form-label">Ngày sinh</label>
              <input type="date" className="form-control" id="11/11/2005" />
            </div>
            <div className="mb-3">
              <label htmlFor="soDienThoai" className="form-label">Số điện thoại</label>
              <input type="tel" className="form-control" id="soDienThoai" placeholder="Số điện thoại" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Email" />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="mb-3">
              <label htmlFor="anhNhanVien" className="form-label">Ảnh nhân viên</label>
              <input type="file" className="form-control" id="anhNhanVien" onChange={handleImageChange} />
            </div>
            <div className="mb-3">
              {image && (
                <img src={image} alt="Ảnh nhân viên" style={{ maxWidth: '100%', height: 'auto' }} />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="cccd" className="form-label">CCCD</label>
              <input type="text" className="form-control" id="cccd" placeholder="CCCD" />
            </div>
            <div className="mb-3">
              <label htmlFor="chucVu" className="form-label">Chức vụ</label>
              <input type="text" className="form-control" id="chucVu" placeholder="Chức vụ" />
            </div>
            <div className="mb-3">
              <label htmlFor="taiKhoan" className="form-label">Tài khoản</label>
              <input type="text" className="form-control" id="taiKhoan" placeholder="Tài khoản" />
            </div>
            <div className="mb-3">
              <label htmlFor="matKhau" className="form-label">Mật khẩu</label>
              <input type="password" className="form-control" id="matKhau" placeholder="Mật khẩu" />
            </div>
            <div className="d-grid mb-3">
              <CButton color="primary">Cập Nhật</CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Progress;
