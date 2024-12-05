import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle
} from '@coreui/react';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
const Spinners = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tenNhanVien, setTenNhanVien] = useState('');
  const [ngaySinh, setNgaySinh] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');
  const [chucVu, setChucVu] = useState('');
  const [taiKhoan, setTaiKhoan] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [gioitinh, setGioiTinh] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const [formDataDriver, setFormDataDriver] = useState({
    Ten_TX: '',
    SDT: '',
    Email: '',
    NgaySinh: '',
    GioiTinh: 'Đang rảnh',
    Tinh_Trang: 'Đang rảnh',
  })

  const handleSubmit = async () => {
    // Kiểm tra điều kiện trước khi thêm nhân viên
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
    if (chucVu.trim() === '') {
      alert('Vui lòng chọn chức vụ');
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
    if (email.trim() === '') {
      alert('Vui lòng nhập email');
      return;
    }
    if (gioitinh.trim() === '') {
      alert('Vui lòng chọn gioi tinh');
      return;
    }

    let Id_TK;
    try {
      const res = await axios.post('http://localhost:3001/api/register', {
        Username: taiKhoan,
        PassWord: matKhau,
        SDT: soDienThoai,
        ID_role: chucVu ==="tai-xe" ? 3 : 1,
      });
      if (res.data.error) {
        alert(res.data.error);
      } else {
        console.log(res.data.userId)
        Id_TK  = res.data.userId;
      }
    } catch (error) {
      console.error(error)
    }



    if (chucVu === "tai-xe") {
      let formdata = {
        Ten_TX: tenNhanVien,
        SDT: soDienThoai,
        Email: email,
        NgaySinh: ngaySinh,
        GioiTinh: gioitinh,
        Tinh_Trang: 'Đang rảnh',
        Id_TK:Id_TK,
      }
      console.log(formdata);
      try {
        var res = await axios.post('http://localhost:3001/api/addDriver', formdata)
        alert('Thêm nhân viên  thành công')
        navigate('/base/carousels');
       //Chuyeen ve cai kia
      } catch (error) {
        console.log(error);
        try {
          const res = await axios.delete(`http://localhost:3001/api/deleteUserAccount/${Id_TK}`);
        } catch (error) {
          console.error(error)
        }
      }
    }
    else {
      //hadll for admin
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <CRow>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thêm nhân viên</strong>
          </CCardHeader>
          <CCardBody>
            <div className="mb-3">
              <label htmlFor="tenNhanVien" className="form-label">Tên nhân viên</label>
              <input
                type="text"
                className="form-control"
                id="tenNhanVien"
                placeholder="Tên nhân viên"
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
            <div className="mb-3">
              <label htmlFor="gioitinh" className="form-label">Giới Tính</label>
              <select
                className="form-control"
                id="gioitinh"
                value={gioitinh}
                onChange={(e) => setGioiTinh(e.target.value)}
              >
                <option value="">Chọn Giới Tính</option>
                <option value="Nữ">Nữ</option>
                <option value="Nam">Nam</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="chucVu" className="form-label">Chức vụ</label>
              <select
                className="form-control"
                id="chucVu"
                value={chucVu}
                onChange={(e) => setChucVu(e.target.value)}
              >
                <option value="">Chọn chức vụ</option>
                <option value="tai-xe">Tài xế</option>
                {/* <option value="Admin">Admin</option> */}
              </select>
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
            <div className="d-grid mb-3">
              <CButton color="primary" onClick={handleSubmit}>Thêm nhân viên</CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Popup thông báo */}
      <CModal
        show={showSuccessModal}
        onClose={handleCloseModal}
        size="sm"
      >
        <CModalHeader closeButton>
          <CModalTitle>Thông báo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Thêm nhân viên thành công
        </CModalBody>
      </CModal>
    </CRow>
  );
};

export default Spinners;
