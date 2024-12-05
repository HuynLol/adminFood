import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
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
  const [showPassword, setShowPassword] = useState(false); // Trạng thái để kiểm soát việc ẩn/hiển thị mật khẩu
  const [datadetail, setDataDetail] = useState("");

 
  const {DriverID} = useParams();

  useEffect(() => {
    
    console.log(DriverID);
    fetchDataShow(DriverID)
  }, [])

  const fetchDataShow = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/getInforDriverByID/${id}`)
      setDataDetail(res.data)
      console.log(res.data)
    }
    catch (error) {
      console.log(error);
    }


  }


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
            <strong>Thông tin nhân viên</strong>
          </CCardHeader>
          <CCardBody>
            <div className="mb-3">
              <label htmlFor="maNhanVien" className="form-label"><strong>Mã nhân viên</strong></label>
              <div>{datadetail.PK_ID_TX}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="tenNhanVien" className="form-label"><strong>Tên nhân viên</strong></label>
              <div>{datadetail.Ten_TX}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="ngaySinh" className="form-label"><strong>Ngày sinh</strong></label>
              <div>{datadetail.Ngay_Sinh}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="soDienThoai" className="form-label"><strong>Số điện thoại</strong></label>
              <div>{datadetail.SDT}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label"><strong>Email</strong></label>
              <div>{datadetail.Email}</div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="mb-3">
              <label htmlFor="anhNhanVien" className="form-label"><strong> Giới Tính </strong></label>
              <div>{datadetail.Gioi_Tinh}</div>
            </div>
            <div className="mb-3">
              {image && (
                <img src={image} alt="Ảnh nhân viên" style={{ maxWidth: '100%', height: 'auto' }} />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="chucVu" className="form-label"><strong>Chức vụ</strong></label>
              <div>Tài xế</div>
            </div>
            <div className="mb-3">
              <label htmlFor="chucVu" className="form-label"><strong>Trạng Thái</strong></label>
              <div>{datadetail.Trang_Thai}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="taiKhoan" className="form-label"><strong>Tài khoản</strong></label>
              <div>{datadetail.Username}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="matKhau" className="form-label"><strong>Mật khẩu</strong></label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="matKhau"
                  placeholder="Mật khẩu"
                  value={datadetail.PassWord} // 
                  readOnly // Đảm bảo ô text không thể chỉnh sửa
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Khi ấn vào button, đảo ngược trạng thái hiện tại của showPassword
                >
                  {showPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
            </div>

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Progress;
