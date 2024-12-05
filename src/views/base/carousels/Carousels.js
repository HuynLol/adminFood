/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTableCaption,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from '@coreui/react';
import ReactImg from 'src/assets/images/react.jpg';

const Carousels = () => {
  const [currentStatus, setCurrentStatus] = useState('Tất cả');
  const [selectedItems, setSelectedItems] = useState([]);
  const [dataNV, setDataNV] = useState([]);
  const [dataDriver, setDataDriver] = useState([])
  const [dataEmployer, setDataEmployee] = useState([]);



  const handelFetchDataDriver = async () => {
    const res = await axios.get("http://localhost:3001/api/getAllDriver")
    console.log(res.data);
    setDataDriver(res.data)
  }
  const handelFetchDataEmployee = async () => {
    const res = await axios.get("http://localhost:3001/api/getAllEmployee")
    console.log(res.data);
    setDataEmployee(res.data)
  }



  const handelDeleteDriverByID = async (id,idTK) => {
    const userConfirmed = confirm(`Bạn có muốn khóa tài xế với ID : ${id}`);
    if (userConfirmed) {
      try {
        const res = await axios.put(`http://localhost:3001/api/updateDriverByID/${id}`)
        const reshelp = await axios.put(`http://localhost:3001/api/updateEmployee/${idTK}`)
        handelFetchDataDriver();
        handelFetchDataEmployee();
      }
      catch (error) {
        alert("Không thể xóa nhân viên này  vì tài khoản hiện đang được sử dụng")

        console.log(error);
      }

    }



  }

  const handelDeleteEmployee = async (id) => {

    const userConfirmed = confirm(`Bạn có muốn khóa tài khoản với ID : ${id}`);
    if (userConfirmed) {

      try {
        const res = await axios.put(`http://localhost:3001/api/updateEmployee/${id}`)
        handelFetchDataDriver();
        handelFetchDataEmployee();
      }
      catch (error) {
        alert("Không thể xóa tài khoản này vì tài khoản hiện đang được sử dụng")
        console.log("delete employee fail ");
        console.log(error);
      }

    }
  }

  useEffect(() => {
    handelFetchDataDriver();
    handelFetchDataEmployee();

  }, []);





  const isSelected = (id) => {
    return selectedItems.includes(id);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <CCardHeader style={{ marginBottom: '10px' }}>
          <strong>Tài khoản và phân cấp</strong>
          <div>
            <span style={{ marginRight: '200px', fontSize: 'larger' }}>
              Tổng số nhân viên: <span style={{ color: 'blue', fontSize: 'x-large' }}>{dataEmployer.length}</span>
            </span>
          </div>
        </CCardHeader>
        {/* Giữ nguyên nút thêm tài khoản */}
        <CButton color="primary">
          <Link to="/base/Spinners" style={{ color: 'white', textDecoration: 'none' }}>+ Thêm tài khoản</Link>
        </CButton>
      </div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CNav variant="underline-border">
            </CNav>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Tên Tài Xế</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Số Điện Thoại</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngày Sinh</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Giới Tính</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                    {/* Xem chi tiết chuyển đến /base/progress */}
                    <CTableHeaderCell scope="col">Tuỳ chọn</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {dataDriver.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <span style={{ color: 'blue' }}>{item.Ten_TX}</span>
                      </CTableDataCell>
                      <CTableDataCell>{item.SDT}</CTableDataCell>
                      <CTableDataCell>{item.Ngay_Sinh}</CTableDataCell>
                      <CTableDataCell style={{ color: 'blue' }}>{item.Email}</CTableDataCell>
                      <CTableDataCell>{item.Gioi_Tinh}</CTableDataCell>
                      <CTableDataCell
                        style={{
                          color:
                            item.Trang_thai === 'Đang rảnh'
                              ? 'green'
                              : item.Trang_thai === 'Đang giao'
                                ? 'red'
                                : 'gray',
                        }}
                      >
                        {item.Trang_thai}
                      </CTableDataCell>

                      {/* Tuỳ chọn */}
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary">Tuỳ chọn</CDropdownToggle>
                          <CDropdownMenu>
                            {/* Xem chi tiết chuyển đến /base/progress */}
                            <CDropdownItem><Link to ={`/base/Paginations/${item.PK_Id_TX}`} >Xem chi tiết</Link></CDropdownItem>
                            <CDropdownItem onClick={()=> handelDeleteDriverByID(item.PK_Id_TX, item.Id_TaiKhoan)} > Khóa Tài Xế</CDropdownItem>
                            {/* Chỉnh sửa chuyển đến /base/progress */}
                            {/* <CDropdownItem><Link to="/base/progress">Chỉnh sửa</Link></CDropdownItem> */}
                            <CDropdownDivider />

                          </CDropdownMenu>
                        </CDropdown>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CNav variant="underline-border">
            </CNav>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">ID Tài Khoản</CTableHeaderCell>
                    <CTableHeaderCell scope="col">UserName</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Số Điện Thoại</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trạng Thái</CTableHeaderCell>
                    {/* Xem chi tiết chuyển đến /base/progress */}
                    <CTableHeaderCell scope="col">Tuỳ chọn</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {dataEmployer.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <span style={{ color: 'blue' }}>{item.PK_Id_TK}</span>
                      </CTableDataCell>
                      <CTableDataCell>{item.Username}</CTableDataCell>
                      <CTableDataCell>{item.SDT}</CTableDataCell>
                      <CTableDataCell style={{ color: 'blue' }}>{item.Ten_quyen}</CTableDataCell>
                      <CTableDataCell>{   item.Trang_Thai==1 ? "Đang sử dụng " : "Đã Khóa"  }</CTableDataCell>
                      {/* Tuỳ chọn */}
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary">Tuỳ chọn</CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={() => handelDeleteEmployee(item.PK_Id_TK)} >Khóa Tài Khoản</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem></CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Carousels;
