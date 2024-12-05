/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [SDT, setSDT] = useState('');
  const [IDRole, setIDRole] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Validate input fields here
    try {
      const res = await axios.post('http://localhost:3002/api/register', {
        Username: Username,
        PassWord: Password,
        SDT: SDT,
        ID_role: IDRole});
      if (res.data.error) {
        alert(res.data.error);
      }else {
        alert('Đăng kí thành công tài khoản, bạn phải đăng nhập để sử dụng hệ thống.');
        navigate('/login');
      }
    } catch (error) {
      console.error(error)
      alert('Login failed. Please check your credentials and try again.')
    }

  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={Username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Số điện thoại"
                      autoComplete="Số điện thoại"
                      value={SDT}
                      onChange={(e) => setSDT(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Chức vụ</CInputGroupText>
                    <CFormSelect
                      value={IDRole}
                      onChange={(e) => setIDRole(e.target.value)}
                    >
                      <option value="">Choose...</option>
                      <option value="1">Admin</option>
                      <option value="2">User</option>
                      <option value="3">Driver</option>
                    </CFormSelect>
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={handleRegister}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
