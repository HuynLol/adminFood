/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CModalBody,
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import ReactImg from 'src/assets/images/react.jpg'
import axios from 'axios'

const Cards = () => {
  const [currentStatus, setCurrentStatus] = useState('Tất cả')
  const [visibleAddVehicle, setVisibleAddVehicle] = useState(false)
  const [visibleDetailModal, setVisibleDetailModal] = useState(false)
  const [visibleUpdateModal, setVisibleUpdateModal] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [vehicleTypes, setVehicleTypes] = useState([])
  const [vehicleBrands, setVehicleBrands] = useState([])
  const [formData, setFormData] = useState({
    Bien_so: '',
    Hang_xe: '',
    ten_loai_xe: '',
    Suc_Chua: '',
    Tinh_Trang: 'Đang chờ',
    Chieu_dai: '',
    Chieu_rong: '',
    Chieu_cao: '',
    Ngay_DK: '',
    Ngay_Het_DK: '',
  })
  const [data, setData] = useState([])

  useEffect(() => {
    fetchTrafficData()
    fetchVehicleTypes()
  }, [])

  useEffect(() => {
    if (selectedVehicle) {
      setFormData({
        Bien_so: selectedVehicle.Bien_so,
        Hang_xe: selectedVehicle.Hang_xe,
        ten_loai_xe: selectedVehicle.ten_loai_xe,
        Suc_Chua: selectedVehicle.Suc_Chua,
        Tinh_Trang: selectedVehicle.Tinh_Trang,
        Chieu_dai: selectedVehicle.Chieu_dai,
        Chieu_rong: selectedVehicle.Chieu_rong,
        Chieu_cao: selectedVehicle.Chieu_cao,
        Ngay_DK: formatDate(selectedVehicle.Ngay_DK),
        Ngay_Het_DK: formatDate(selectedVehicle.Ngay_Het_DK),
      })
    }
  }, [selectedVehicle])

  const fetchVehicleTypes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getAllVehicleTypes')
      const types = Array.from(new Set(response.data.map((item) => item.Ten_Loai_Xe)))
      const brands = Array.from(new Set(response.data.map((item) => item.Hang_xe)))
      setVehicleTypes(types)
      setVehicleBrands(brands)
    } catch (error) {
      console.error('Error fetching vehicle types:', error)
    }
  }

  const fetchTrafficData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getAllTraffics')
      setData(response.data)
      console.log('traffic:', response.data)
    } catch (error) {
      console.error('Error fetching traffic data:', error)
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3001/api/addTraffics', formData)
      setVisibleAddVehicle(false)
      alert('Thêm phương tiện thành công')
      fetchTrafficData() // Fetch the updated data after adding a new vehicle
    } catch (error) {
      console.error('Error adding vehicle:', error)
    }
  }

  const handleUpdate = (id) => {
    fetchTrafficUpdate(id)
    setVisibleUpdateModal(true)
  }

  const fetchTrafficDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/getTraffic/${id}`)
      setSelectedVehicle(response.data)
      setVisibleDetailModal(true)
    } catch (error) {
      console.error('Error fetching traffic details:', error)
    }
  }

  const fetchTrafficUpdate = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/getTraffic/${id}`)
      const dataUpdate = response.data
      setSelectedVehicle({
        ...dataUpdate,
        Ngay_DK: formatDate(dataUpdate.Ngay_DK),
        Ngay_Het_DK: formatDate(dataUpdate.Ngay_Het_DK),
      })
    } catch (error) {
      console.error('Error fetching traffic update:', error)
    }
  }

  const deleteTraffic = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/deleteTraffic/${id}`)
      alert('Xoá thành công')
      fetchTrafficData() // Cập nhật danh sách sau khi xoá thành công
    } catch (error) {
      console.error('Error deleting traffic:', error)
    }
  }

  const updateTraffic = async () => {
    try {
      await axios.put(
        `http://localhost:3001/api/updateTraffic/${selectedVehicle.PK_Id_Xe}`,
        formData,
      )
      setVisibleUpdateModal(false) // Đóng modal sau khi cập nhật thành công
      alert('Cập nhật thành công')
      fetchTrafficData() // Cập nhật danh sách sau khi cập nhật thành công
    } catch (error) {
      console.error('Error updating traffic:', error)
    }
  }

  const filteredData =
    currentStatus === 'Tất cả' ? data : data.filter((item) => item.Trang_Thai === currentStatus)

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toISOString().split('T')[0];
  }

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
          <strong>Danh sách hành khách</strong>
        </CCardHeader>
        <div>
          <span style={{ marginRight: 10 }}>Tìm kiếm khách hàng</span>
          <input style={{ borderRadius: 10, marginRight: 10, height: 30 }} type='text'></input>
        </div>
      </div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CNav variant="underline-border">
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Tất cả'}
                  onClick={() => setCurrentStatus('Tất cả')}
                >
                  Tất cả
                </CNavLink>
              </CNavItem>
              {/* <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Đang giao'}
                  onClick={() => setCurrentStatus('Đang giao')}
                >
                  Đang giao
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Đang chờ'}
                  onClick={() => setCurrentStatus('Đang chờ')}
                >
                  Đang chờ
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Bảo trì'}
                  onClick={() => setCurrentStatus('Bảo trì')}
                >
                  Bảo trì
                </CNavLink>
              </CNavItem> */}
            </CNav>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Họ và tên</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Số điện thoại</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tuyến đi</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngày đặt</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trạng thái thanh toán</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tuỳ chọn</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((item, index) => (
                    <CTableRow key={item.id}>
                      <CTableHeaderCell scope="row">{item.Id_Xe}</CTableHeaderCell>
                      <CTableDataCell>{item.Bien_so}</CTableDataCell>
                      <CTableDataCell>{item.Tuyen_Duong}</CTableDataCell>
                      <CTableDataCell>{item.TimeFuture ? formatDate(item.TimeFuture) : ' '}</CTableDataCell>
                      <CTableDataCell
                        style={{
                          color:
                            item.Trang_Thai === 'Đang giao'
                              ? 'green'
                              : item.Trang_Thai === 'Bảo trì'
                                ? 'red'
                                : 'gray',
                        }}
                      >
                        {item.Trang_Thai}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary">Tuỳ chỉnh</CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={() => fetchTrafficDetails(item.PK_Id_Xe)}>
                              Xem chi tiết
                            </CDropdownItem>
                            <CDropdownItem onClick={() => handleUpdate(item.PK_Id_Xe)}>
                              Chỉnh sửa
                            </CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem onClick={() => deleteTraffic(item.PK_Id_Xe)}>
                              Xoá phương tiện
                            </CDropdownItem>
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

      <CModal
        size="lg"
        visible={visibleAddVehicle}
        onClose={() => setVisibleAddVehicle(false)}
        aria-labelledby="AddVehicleModal"
      >
        <CModalHeader>
          <CModalTitle id="AddVehicleModal">Thêm phương tiện</CModalTitle>
        </CModalHeader>
        <CForm
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1rem',
          }}
        >
          <CFormInput
            type="text"
            style={{ flex: '1 1 45%' }}
            id="Bien_so"
            onChange={handleChange}
            placeholder="Biển số xe"
            aria-describedby="exampleFormControlInputHelpInline"
          />
          <CFormSelect
            style={{ flex: '1 1 45%' }}
            id="ten_loai_xe"
            onChange={handleChange}
            aria-label="Default select example"
          >
            <option value="">Chọn loại phương tiện</option>
            {vehicleTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </CFormSelect>
          <CFormSelect
            style={{ flex: '1 1 45%' }}
            id="Hang_xe"
            onChange={handleChange}
            aria-label="Default select example"
          >
            <option value="">Chọn hãng xe</option>
            {vehicleBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </CFormSelect>
          <CFormInput
            type="number"
            style={{ flex: '1 1 45%' }}
            id="Suc_Chua"
            onChange={handleChange}
            placeholder="Tổng tải trọng (kg/tấn)"
          />
          <p style={{ flex: '1 1 100%', margin: '0' }}>Kích thước xe</p>
          <div style={{ display: 'flex', flex: '1 1 100%', gap: '1rem' }}>
            <CFormInput
              type="number"
              style={{ flex: '1 1 30%' }}
              id="Chieu_dai"
              onChange={handleChange}
              placeholder="Chiều dài (m)"
            />
            <CFormInput
              type="number"
              style={{ flex: '1 1 30%' }}
              id="Chieu_rong"
              onChange={handleChange}
              placeholder="Chiều rộng (m)"
            />
            <CFormInput
              type="number"
              style={{ flex: '1 1 30%' }}
              id="Chieu_cao"
              onChange={handleChange}
              placeholder="Chiều cao (m)"
            />
          </div>
          <CFormInput
            type="date"
            style={{ flex: '1 1 45%' }}
            id="Ngay_DK"
            placeholder="Ngày đăng ký"
            onChange={handleChange}
          />
          <CFormInput
            type="date"
            style={{ flex: '1 1 45%' }}
            id="Ngay_Het_DK"
            placeholder="Ngày hết hạn đăng ký"
            onChange={handleChange}
          />
        </CForm>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleAddVehicle(false)}>
            Đóng
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>
            Lưu
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        size="lg"
        visible={visibleUpdateModal}
        onClose={() => setVisibleUpdateModal(false)}
        aria-labelledby="AddVehicleModal"
      >
        <CModalHeader>
          <CModalTitle id="AddVehicleModal">Cập nhật phương tiện</CModalTitle>
        </CModalHeader>
        <CForm
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1rem',
          }}
        >
          <CFormInput
            type="text"
            style={{ flex: '1 1 45%' }}
            id="Bien_so"
            value={formData.Bien_so}
            onChange={handleChange}
            placeholder="Biển số xe"
            aria-describedby="exampleFormControlInputHelpInline"
          />
          <CFormSelect
            style={{ flex: '1 1 45%' }}
            id="ten_loai_xe"
            value={formData.ten_loai_xe}
            onChange={handleChange}
            aria-label="Default select example"
            options={[
              'Chọn loại phương tiện',
              { label: 'Xe tải lớn', value: 'Xe tải lớn' },
              { label: 'Xe tải nhỏ', value: 'Xe tải nhỏ' },
              { label: 'Xe rơ móoc', value: 'Xe rơ móoc', disabled: true },
            ]}
          />
          <CFormSelect
            style={{ flex: '1 1 45%' }}
            id="Hang_xe"
            value={formData.Hang_xe}
            onChange={handleChange}
            aria-label="Default select example"
            options={[
              'Chọn hãng xe',
              { label: 'Huyndai', value: 'Huyndai' },
              { label: 'Suzuki', value: 'Suzuki' },
              { label: 'Daewoo', value: 'Daewoo' },
            ]}
          />
          <CFormInput
            type="number"
            style={{ flex: '1 1 45%' }}
            id="Suc_Chua"
            value={formData.Suc_Chua}
            onChange={handleChange}
            placeholder="Tổng tải trọng (kg/tấn)"
          />
          <p style={{ flex: '1 1 100%', margin: '0' }}>Kích thước xe</p>
          <div style={{ display: 'flex', flex: '1 1 100%', gap: '1rem' }}>
            <CFormInput
              type="number"
              style={{ flex: '1 1 30%' }}
              id="Chieu_dai"
              value={formData.Chieu_dai}
              onChange={handleChange}
              placeholder="Chiều dài (m)"
            />
            <CFormInput
              type="number"
              style={{ flex: '1 1 30%' }}
              id="Chieu_rong"
              value={formData.Chieu_rong}
              onChange={handleChange}
              placeholder="Chiều rộng (m)"
            />
            <CFormInput
              type="number"
              style={{ flex: '1 1 30%' }}
              id="Chieu_cao"
              value={formData.Chieu_cao}
              onChange={handleChange}
              placeholder="Chiều cao (m)"
            />
          </div>
          <CFormInput
            type="date"
            style={{ flex: '1 1 45%' }}
            id="Ngay_DK"
            value={formData.Ngay_DK}
            placeholder="Ngày đăng ký"
            onChange={handleChange}
          />
          <CFormInput
            type="date"
            style={{ flex: '1 1 45%' }}
            id="Ngay_Het_DK"
            value={formData.Ngay_Het_DK}
            placeholder="Ngày hết hạn đăng ký"
            onChange={handleChange}
          />
        </CForm>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleUpdateModal(false)}>
            Đóng
          </CButton>
          <CButton color="primary" onClick={updateTraffic}>
            Cập nhật phương tiện
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        size="lg"
        visible={visibleDetailModal}
        onClose={() => setVisibleDetailModal(false)}
        aria-labelledby="DetailVehicleModal"
      >
        <CModalHeader closeButton>
          <CModalTitle id="DetailVehicleModal">Chi tiết phương tiện</CModalTitle>
        </CModalHeader>
        {selectedVehicle && (
          <CModalBody>
            <CRow>
              <CCol md="6">
                <div className="detail-info-column">
                  <p>
                    <strong>Biển số:</strong> {selectedVehicle.Bien_so}
                  </p>
                  <p>
                    <strong>Sức chứa:</strong> {selectedVehicle.Suc_Chua}
                  </p>
                  <p>
                    <strong>Loại xe:</strong> {selectedVehicle.ten_loai_xe}
                  </p>
                  <p>
                    <strong>Hãng xe:</strong> {selectedVehicle.Hang_xe}
                  </p>
                  <p>
                    <strong>Ngày đăng kiểm:</strong>{' '}
                    {selectedVehicle.Ngay_DK ? selectedVehicle.Ngay_DK.split('T')[0] : ''}
                  </p>
                  <p>
                    <strong>Ngày hết hạn đăng kiểm:</strong>{' '}
                    {selectedVehicle.Ngay_Het_DK ? selectedVehicle.Ngay_Het_DK.split('T')[0] : ''}
                  </p>
                </div>
              </CCol>
              <CCol md="6">
                <div className="detail-info-column">
                  <p>
                    <strong>Tình trạng:</strong> {selectedVehicle.Tinh_Trang}
                  </p>
                  <p>
                    <strong>Kích thước xe:</strong>
                  </p>
                  <ul>
                    <li>
                      <strong>Chiều dài:</strong> {selectedVehicle.Chieu_dai} m
                    </li>
                    <li>
                      <strong>Chiều rộng:</strong> {selectedVehicle.Chieu_rong} m
                    </li>
                    <li>
                      <strong>Chiều cao:</strong> {selectedVehicle.Chieu_cao} m
                    </li>
                  </ul>
                </div>
              </CCol>
            </CRow>
            {/* Add more details as needed */}
          </CModalBody>
        )}
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDetailModal(false)}>
            Đóng
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Cards
