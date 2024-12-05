/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CTooltip,
  CRow,
  CCol,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CForm,
  CContainer,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import { DatePicker } from '@mui/x-date-pickers'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { addDoc, collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { db } from '../../../../firebaseConfig'

const Tooltips = () => {
  const { OrderID } = useParams()
  const [dataOrder, setDataOrder] = useState(null)
  const [driverIdle, setDriverIdle] = useState(null)
  const [vehicleIdle, setVehicleIdle] = useState(null)
  const [selectedDriver, setSelectedDriver] = useState('')
  const [driverPhoneNumber, setDriverPhoneNumber] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const navigate = useNavigate()
  console.log('OrderID:', OrderID)

  const handleConfirm = async () => {
    const deliveryTimestamp = selectedDate ? selectedDate.$d.getTime() : null;

    const inforOrderFirebase = {
      orderId: OrderID,
      deliveryDate: deliveryTimestamp,
      driverId: selectedDriver,
      vehicleId: selectedVehicle,
      addressCustomer: dataOrder['Địa chỉ khách hàng'],
    }

    try {
      const res = await axios.post(`http://localhost:3001/api/updateOrder`, {
        orderId: OrderID,
        deliveryDate: selectedDate,
        driverId: selectedDriver,
        vehicleId: selectedVehicle,
        addressCustomer: dataOrder['Địa chỉ khách hàng'],
      })

      if (res.status === 200) {
        // Tạo document với ID của tài xế trong Firestore
        try {
          await setDoc(doc(db, 'users', selectedDriver), {
            message: `Tôi đang gửi yêu cầu nhận đơn tới Driver với ID là ${selectedDriver}`,
            ...inforOrderFirebase,
          })
          alert('Đã gửi yêu cầu nhận đơn')
        } catch (error) {
          console.error('Error adding document: ', error)
        }

        alert('Cập nhật đơn hàng thành công')
        navigate('/base/accordion')
      }
    } catch (error) {
      console.log('Update Error:', error)
    }
  }

  const handleLoadData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/getDetailOrderByID/${OrderID}`)
      console.log('API Response detail:', res)
      const format = {
        ...res.data[0],
        'Ngày đặt hàng': res.data[0]['Ngày đặt hàng'].split('T')[0],
        'Ngày giao': res.data[0]['Ngày giao'].split('T')[0],
      }
      setDataOrder(format)
    } catch (error) {
      console.log('API Error:', error)
    }
  }

  const handleGetDriverIdle = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/getAllDriversIdle')
      console.log('API Response:', res.data)
      setDriverIdle(res.data)
    } catch (error) {
      console.log('API Error:', error)
    }
  }

  const handleGetVehicleIdle = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/getVehicleIdle')
      console.log('API Response vehicle idle:', res.data)
      setVehicleIdle(res.data)
    } catch (error) {
      console.log('API Error:', error)
    }
  }

  useEffect(() => {
    if (OrderID) {
      handleLoadData()
      handleGetDriverIdle()
      handleGetVehicleIdle()
    }
  }, [OrderID])

  if (!OrderID) {
    return <div>Đơn hàng không tồn tại</div>
  }

  if (dataOrder === null || vehicleIdle === null) {
    return <div>Loading...</div> // Show loading state
  }

  if (!dataOrder) {
    return <div>Error loading data</div> // Handle error state
  }

  const {
    'Ngày đặt hàng': orderDate,
    'Ngày giao': deliveryDate,
    'Tên dịch vụ vận chuyển': shippingService,
    'Tên khách hàng': customerName,
    'Số điện thoại khách hàng': customerPhone,
    'Địa chỉ khách hàng': customerAddress,
    'Số điện thoại tài xế': driverPhone,
    'Tài xế phụ trách': driverName,
    'Các sản phẩm mà khách hàng đặt': productString,
  } = dataOrder

  function parseProductString(productString) {
    const products = productString.split(', ').map((product) => {
      const parts = product.split(' - ')
      if (parts.length === 4) {
        const [productType, productName, pricePart, quantityPart] = parts
        const price = pricePart.replace('Giá: ', '').trim()
        const quantity = quantityPart.replace('Số lượng: ', '').trim()
        return {
          productType: productType.trim(),
          productName: productName.trim(),
          price: price,
          quantity: quantity,
        }
      }
      return null
    })
    return products.filter((product) => product !== null)
  }

  const parsedProducts = parseProductString(productString)

  console.log('vehicleIdle:', vehicleIdle)

  const options = [
    { label: 'Chọn phương tiện vận chuyển', value: '' },
    ...(vehicleIdle
      ? vehicleIdle.map((vehicle) => ({
          label: `${vehicle.Bien_so} - ${vehicle.ten_loai_xe}`,
          value: vehicle.PK_Id_Xe,
        }))
      : []),
  ]

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Mã đơn hàng:</strong> <small>{OrderID}</small>
          </CCardHeader>
          {dataOrder && (
            <CCardBody>
              <CContainer>
                <CRow>
                  <CCol xs={4}>
                    <div>
                      <p>Ngày đặt hàng</p>
                      <CFormInput id="inputAddress" value={orderDate} readOnly />
                      <div className=" mt-3">
                        <DatePicker
                          label="Ngày giao dự kiến"
                          value={selectedDate}
                          onChange={(date) => {
                            setSelectedDate(date)
                            if (date && date.$d instanceof Date && !isNaN(date.$d)) {
                              const formattedDate = format(date.$d, 'yyyy-MM-dd')
                              console.log('Ngày được chọn:', formattedDate)
                              if (formattedDate < dataOrder['Ngày đặt hàng']) {
                                alert('Ngày giao hàng không hợp lệ')
                                setSelectedDate(null)
                              } else {
                                console.log('Ngày giao hàng hợp lệ')
                              }
                            } else {
                              console.error('Giá trị ngày không hợp lệ:', date)
                            }
                          }}
                        />
                      </div>
                      <p className="mt-3 mb-1">Tên dịch vụ vận chuyển</p>
                      <CFormInput
                        id="inputAddress"
                        className=" mb-3"
                        value={shippingService}
                        readOnly
                      />
                    </div>
                    <div>
                      <strong className=" mt-3">Thông tin khách hàng</strong>
                      <CFormInput id="inputAddress" value={customerName} readOnly />
                      <p className="mt-3 mb-1">Số điện thoại</p>
                      <CFormInput id="inputAddress" value={customerPhone} readOnly />
                      <p className="mt-3 mb-1">Địa chỉ khách hàng</p>
                      <CFormInput id="inputAddress" value={customerAddress} readOnly />
                    </div>
                  </CCol>
                  <CCol xs={8}>
                    <strong className=" mt-3">Sản phẩm trong đơn hàng</strong>
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Loại sản phẩm</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Tên sản phẩm</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Giá</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Số lượng</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {parsedProducts.length > 0 ? (
                          parsedProducts.map((product, index) => (
                            <CTableRow key={index}>
                              <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                              <CTableDataCell>{product.productType}</CTableDataCell>
                              <CTableDataCell>{product.productName}</CTableDataCell>
                              <CTableDataCell>{product.price}</CTableDataCell>
                              <CTableDataCell>{product.quantity}</CTableDataCell>
                            </CTableRow>
                          ))
                        ) : (
                          <CTableRow>
                            <CTableDataCell colSpan="5">
                              Chuỗi sản phẩm không hợp lệ hoặc không tồn tại.
                            </CTableDataCell>
                          </CTableRow>
                        )}
                      </CTableBody>
                    </CTable>
                    <CRow>
                      <CCol xs={6}>
                        <strong className=" mt-3">Vận chuyển</strong>
                        <p className="mt-3 mb-1">Trọng lượng tổng sản phẩm</p>
                        <CFormInput
                          id="inputAddress"
                          value={dataOrder['Tổng khối lượng']}
                          readOnly
                        />
                        <strong className=" mt-5">
                          Phí vận chuyển ước tính:{' '}
                          <span>{dataOrder['Giá dịch vụ vận chuyển']} vnđ</span>
                        </strong>
                        <CFormCheck
                          id="flexCheckChecked"
                          label="Thanh toán 50% số tiền còn lại"
                          defaultChecked
                        />
                      </CCol>
                      <CCol xs={6}>
                        <strong className="mt-3">Tài xế</strong>
                        <p className="mt-3 mb-1">Tên tài xế</p>
                        <CFormSelect
                          aria-label="Default select example"
                          value={selectedDriver}
                          onChange={(e) => {
                            const selectedDriverId = e.target.value
                            console.log('Selected driver:', selectedDriverId)
                            console.log('Driver list:', driverIdle)
                            const selectedDriver = driverIdle.find(
                              (driver) => driver.PK_Id_TX == selectedDriverId,
                            )
                            console.log('Selected driver:', selectedDriver)
                            setSelectedDriver(selectedDriverId)
                            setDriverPhoneNumber(selectedDriver ? selectedDriver.SDT : '') // Update driver phone number
                          }}
                        >
                          <option value="">Chọn tài xế</option>
                          {Array.isArray(driverIdle) &&
                            driverIdle.map((driver) => (
                              <option key={driver.PK_Id_TX} value={driver.PK_Id_TX}>
                                {driver.Ten_TX}
                              </option>
                            ))}
                        </CFormSelect>
                        <p className="mt-3 mb-1">Số điện thoại tài xế</p>
                        <CFormInput id="inputAddress" value={driverPhoneNumber} readOnly />

                        <p className="mt-3 mb-1">Phương tiện vận chuyển</p>
                        <CFormSelect
                          aria-label="Default select example"
                          value={selectedVehicle}
                          onChange={(e) => setSelectedVehicle(e.target.value)}
                          options={options}
                        />
                        <CButton color="primary" className=" m-2" onClick={handleConfirm}>
                          Xác nhận
                        </CButton>
                        <CButton color="secondary">Huỷ</CButton>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CContainer>
            </CCardBody>
          )}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tooltips
