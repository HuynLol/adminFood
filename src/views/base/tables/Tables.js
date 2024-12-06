import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CTable,
  CRow,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CForm,
  CFormInput,
} from '@coreui/react';

const Tables = () => {
  const [dataFake, setDataFake] = useState([
    {
      IdKh: 1,
      Ten_KH: 'Võ Đăng Vịnh',
      matKhau: '123456',
      SDT: '0372254619',
      Email: 'lagger07112003@gmail.com',
    },
  ]);

  const [visible, setVisible] = useState(false); // Trạng thái hiển thị modal
  const [newUser, setNewUser] = useState({
    Ten_KH: '',
    matKhau: '',
    SDT: '',
    Email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    if (!newUser.Ten_KH || !newUser.matKhau || !newUser.SDT || !newUser.Email) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    // Tạo mã người dùng tự động tăng
    const newId = dataFake.length > 0 ? dataFake[dataFake.length - 1].IdKh + 1 : 1;

    // Thêm người dùng mới
    const userWithId = { IdKh: newId, ...newUser };
    setDataFake([...dataFake, userWithId]);

    // Reset form và đóng modal
    setNewUser({ Ten_KH: '', matKhau: '', SDT: '', Email: '' });
    setVisible(false);
    alert('Thêm người dùng thành công!');
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
          <strong>Danh sách người dùng</strong>
        </CCardHeader>
        <div>
          <span style={{ marginRight: 10 }}>Tìm kiếm người dùng</span>
          <input style={{ borderRadius: 10, marginRight: 10, height: 30 }} type="text" />
          <CButton color="primary" onClick={() => setVisible(true)}>
            Thêm người dùng
          </CButton>
        </div>
      </div>
      <CRow>
        <CCard className="mb-4">
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Mã người dùng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tên người dùng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Mật khẩu</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Số điện thoại</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tùy chọn</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {dataFake.map((item) => (
                  <CTableRow key={item.IdKh}>
                    <CTableDataCell>{item.IdKh}</CTableDataCell>
                    <CTableDataCell>{item.Ten_KH}</CTableDataCell>
                    <CTableDataCell>{item.Email}</CTableDataCell>
                    <CTableDataCell>{item.matKhau}</CTableDataCell>
                    <CTableDataCell>{item.SDT}</CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="secondary">Tùy chỉnh</CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Xem chi tiết</CDropdownItem>
                          <CDropdownItem>Chỉnh sửa người dùng</CDropdownItem>
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
      </CRow>

      {/* Modal thêm người dùng */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Thêm người dùng mới</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              label="Tên người dùng"
              name="Ten_KH"
              value={newUser.Ten_KH}
              onChange={handleInputChange}
              placeholder="Nhập tên người dùng"
            />
            <CFormInput
              label="Email"
              name="Email"
              value={newUser.Email}
              onChange={handleInputChange}
              placeholder="Nhập email"
            />
            <CFormInput
              label="Mật khẩu"
              name="matKhau"
              value={newUser.matKhau}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu"
            />
            <CFormInput
              label="Số điện thoại"
              name="SDT"
              value={newUser.SDT}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Hủy
          </CButton>
          <CButton color="primary" onClick={handleAddUser}>
            Thêm người dùng
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Tables;
