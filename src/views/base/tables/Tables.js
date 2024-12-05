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

const Tables = () => {


  const dataFake = {
    IdKh: '1',
    Ten_KH: 'Võ Đăng Vịnh',
    GioiTinh: 'Nam',
    SDT: '0372254619',
    NgaySinh: '07-11-2003',
    DiaChi: '12 Cao Thắng Hải Châu Đà Nẵng',
    Email: 'lagger07112003@gmail.com',
    NgayThamGia: '07-11-2003',
  }
  const [currentStatus, setCurrentStatus] = useState('Tất cả')
  const [visibleDetailModal, setVisibleDetailModal] = useState(false)




  const [data, setData] = useState([])
  const [datadetail, setDataDetail] = useState("")
  const [dataodercus, SetDataOrDerCus] = useState([]);
  const [namesearch, setNameSearch] = useState("");

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://vapi.vnappmob.com/api/province')
        setProvinces(response.data.results)
      } catch (error) {
        console.error('Error fetching provinces:', error)
      }
    }

    fetchProvinces()
  }, [])

  const fetchDistricts = async (province_Id) => {
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${province_Id}`,
      )
      setDistricts(response.data.results)
    } catch (error) {
      console.error('Error fetching districts:', error)
    }
  }

  const fetchWards = async (district_Id) => {
    try {
      const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${district_Id}`)
      setWards(response.data.results)
    } catch (error) {
      console.error('Error fetching wards:', error)
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevState) => ({ ...prevState, [id]: value }))

    if (id === 'province') {
      fetchDistricts(value)
      setFormData((prevState) => ({ ...prevState, district: '', ward: '' }))
    }
    if (id === 'district') {
      fetchWards(value)
      setFormData((prevState) => ({ ...prevState, ward: '' }))
    }
  }

  useEffect(() => {
    fetchCustomerData()
  }, [])

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getAllCustomers')

      setData(response.data)
      console.log('Data:', response.data)
    } catch (error) {
      console.error('Error fetching traffic data:', error)
    }
  }


  //Get CustomBy Name

  const fetchCustomerDetails = async (id) => {
    try {
      console.log(id);
      const response = await axios.get(`http://localhost:3001/api/getinforCustomerByID/${id}`)
      const responsev2 = await axios.get(`http://localhost:3001/api/getOrderByIdKH/${id}`)
      console.log(responsev2.data)
      setDataDetail(dt => response.data);
      SetDataOrDerCus(responsev2.data)
      console.log(datadetail)
      setVisibleDetailModal(true)
    } catch (error) {
      console.error('Error fetching traffic details:', error)
    }
  }



  const handleSearchCustomer = async (event) => {
    setNameSearch(event.target.value);
    console.log(namesearch);
    try {
      const response = await axios.get('http://localhost:3001/api/getAllCustomers')
      if (namesearch === "") {
        setData(response.data);
      }
      else {
        const listshowCus = response.data.filter(x => x.Ten_KH.includes(namesearch))
        setData(listshowCus)
      }

      console.log('Data:', response.data)
    } catch (error) {
      console.error('Error fetching traffic data:', error)
    }


  }

  const filteredData =
    currentStatus === 'Tất cả' ? data : data.filter((item) => item.Tinh_Trang === currentStatus)

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
          <strong>Danh sách tuyến đi</strong>
        </CCardHeader>
        <div>
          <span style={{ marginRight: 10 }}>Tìm kiếm tuyến đi</span>
          <input onChange={handleSearchCustomer} style={{ borderRadius: 10, marginRight: 10, height: 30 }} type='text'></input>

          <CButton color="primary" onClick={() => setVisibleAddVehicle(true)}>
            Thêm tuyến đi
          </CButton>
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
            </CNav>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Mã tuyến đi</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tên tuyến đi</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngày khởi hành</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Số lượng</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tuỳ chọn</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((item, index) => (
                    <CTableRow key={item.PK_Ma_KH}>
                      <CTableHeaderCell scope="row">{item.PK_Ma_KH}</CTableHeaderCell>
                      <CTableDataCell>{item.Ten_KH}</CTableDataCell>
                      <CTableDataCell>{item.Email}</CTableDataCell>
                      <CTableDataCell>{item.SDT}</CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary">Tuỳ chỉnh</CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={() => fetchCustomerDetails(item.PK_Ma_KH)}>
                              Xem chi tiết
                            </CDropdownItem>

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





      <CModal
        size="lg"
        visible={visibleDetailModal}
        onClose={() => setVisibleDetailModal(false)}
        aria-labelledby="DetailVehicleModal"
      >
        <CModalHeader closeButton>
          <CModalTitle id="DetailVehicleModal">Chi tiết khách hàng</CModalTitle>
        </CModalHeader>
        {dataFake && (
          <CModalBody>
            <CRow>
              <CCol md="6">
                <div className="detail-info-column">
                  <p>
                    <strong>Tên Khách Hàng:</strong> {datadetail.Ten_KH}
                  </p>
                  <p>
                    <strong>Giới Tính:</strong> {dataFake.GioiTinh}
                  </p>
                  <p>
                    <strong>Ngày Sinh :</strong> {dataFake.NgaySinh}
                  </p>
                  <p>
                    <strong>Số Điện Thoại :</strong> {datadetail.SDT}
                  </p>
                  <p>
                    <strong>Email :</strong> {datadetail.Email}
                  </p>
                  <p>
                    <strong>Ngày Tham Gia :</strong> {dataFake.NgayThamGia}
                  </p>
                </div>
              </CCol>
              <CCol md="6">
                <div className="detail-info-column">
                  <p>
                    <strong>Số Đơn Hàng Đã Đặt:</strong> {datadetail.SoLuongDonHang}
                  </p>
                  <p>
                    <strong>Các Đơn Hàng:</strong>
                  </p>
                  {dataodercus.map((item, index) =>
                  (
                    <ul key={index}>
                      <li >
                        <strong>Tên Đơn Hàng :</strong> {item.Ten_Don_Hang}
                      </li>
                      <li key={index + 1}>
                        <strong>Tình Trạng:</strong> {item.TrangThai}
                      </li>

                    </ul>
                  ))}

                </div>
              </CCol>
            </CRow>
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

export default Tables
