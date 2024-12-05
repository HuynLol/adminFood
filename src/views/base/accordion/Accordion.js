/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCard,
  CCardBody,
  CCardHeader,
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
  CFormLabel,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CForm,
  CProgress,
  CProgressBar,
  CFormInput,
  CContainer,
} from '@coreui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../../firebaseConfig'
import { collection, getDocs, onSnapshot, deleteDoc } from 'firebase/firestore'

const Accordion = () => {
  const [currentStatus, setCurrentStatus] = useState('Tất cả');
  const [dataOrder, setDataOrder] = useState([]);
  const [allOrders, setAllOrders] = useState([]);   
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleStatus, setVisibleStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();

    const unsubscribeRejectOrders = onSnapshot(collection(db, 'reject'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          handleRejectAdded(change.doc);
        }
      });
    });

    return () => {
      unsubscribeRejectOrders();
    };
  }, []);

  const handleRejectAdded = async (doc) => {
    const rejectData = doc.data();
    const { PK_Id_DonHang, ID_TX, rejectReason } = rejectData;
    alert(
      `Đơn hàng '${PK_Id_DonHang}' đã bị từ chối bởi tài xế '${ID_TX}' với lý do là "${rejectReason}"`
    );
    try {
      await deleteDoc(doc.ref);
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
    fetchData();
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/getAllOrders');
      setDataOrder(res.data);
      setAllOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetailOrder = (OrderID) => {
    navigate(`/base/popovers/${OrderID}`);
  };

  const handleUpdate = (OrderID) => {
    alert(`Chỉnh sửa đơn hàng ${OrderID}`);
  };

  const handleProcessOrder = (OrderID) => {
    navigate(`/base/tooltips/${OrderID}`);
  };

  const handleViewStatus = (OrderID) => {
    setVisibleStatus(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const filteredData = allOrders.filter(
        (item) =>
          item.TenKH.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.MaDH.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );

      setDataOrder(filteredData);
    } else {
      setDataOrder(allOrders);
    }
  }, [searchQuery, allOrders]);

  useEffect(() => {
    filterOrdersByStatus();
  }, [currentStatus, allOrders]);

  const filterOrdersByStatus = () => {
    if (currentStatus === 'Tất cả') {
      setDataOrder(allOrders);
    } else {
      const filteredData = allOrders.filter((item) => item.TrangThai === currentStatus);
      setDataOrder(filteredData);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return ' ';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
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
          <strong>Danh sách vé xe</strong>
        </CCardHeader>
        <CForm className="row g-3">
          <CCol xs="auto">
            <CFormLabel htmlFor="inputPassword2" className="visually-hidden">
              Password
            </CFormLabel>
            <CFormInput
              type="text"
              id="inputPassword2"
              placeholder="Tìm kiếm"
              onChange={handleSearchChange}
            />
          </CCol>
          <CCol xs="auto">
            <CButton color="primary" type="submit" className="mb-3">
              Tìm kiếm
            </CButton>
          </CCol>
        </CForm>
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
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Chưa giao hàng'}
                  onClick={() => setCurrentStatus('Chưa giao hàng')}
                >
                  Chờ xử lý
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Đang giao hàng'}
                  onClick={() => setCurrentStatus('Đang giao hàng')}
                >
                  Đang chạy
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Đã giao hàng'}
                  onClick={() => setCurrentStatus('Đã giao hàng')}
                >
                  Đã hoàn tất
                </CNavLink>
              </CNavItem>
            </CNav>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Mã vé</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Khách hàng</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngày đặt hàng</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngày khởi hành</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tuỳ chọn</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {dataOrder.map((item, index) => (
                    <CTableRow key={item.id}>
                      <CTableHeaderCell scope="row">{item.MaDH}</CTableHeaderCell>
                      <CTableDataCell>{item.TenKH}</CTableDataCell>
                      <CTableDataCell>{formatDate(item.NgayDatHang)}</CTableDataCell>
                      <CTableDataCell>
                        {item.NgayGiaoHang ? formatDate(item.NgayGiaoHang) : ' '}
                      </CTableDataCell>
                      <CTableDataCell
                        style={{
                          color:
                            item.TrangThai === 'Đang giao hàng'
                              ? 'green'
                              : item.TrangThai === 'Chưa giao hàng'
                                ? 'red'
                                : 'gray',
                        }}
                      >
                        {item.TrangThai}
                      </CTableDataCell>
                      <CTableDataCell>{item.KhoiLuong}</CTableDataCell>
                      <CTableDataCell>{item.TongTien}</CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary">Tuỳ chỉnh</CDropdownToggle>
                          <CDropdownMenu>
                            {item.TrangThai === 'Chưa giao hàng' && (
                              <>
                                <CDropdownItem onClick={() => handleProcessOrder(item.MaDH)}>
                                  Xử lý
                                </CDropdownItem>
                                <CDropdownItem onClick={() => handleUpdate(item.MaDH)}>
                                  Chỉnh sửa
                                </CDropdownItem>
                              </>
                            )}
                            {item.TrangThai === 'Đang giao hàng' && (
                              <CDropdownItem onClick={() => handleViewStatus(item.MaDH)}>
                                Xem trạng thái
                              </CDropdownItem>
                            )}
                            {item.TrangThai === 'Đã giao hàng' && (
                              <CDropdownItem onClick={() => handleDetailOrder(item.MaDH)}>
                                Xem chi tiết
                              </CDropdownItem>
                            )}
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
        backdrop="static"
        visible={visibleStatus}
        onClose={() => setVisibleStatus(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">Tiến trình giao hàng</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer>
            <CRow className=" justify-content-between">
              <CCol sm="auto">Đang lấy hàng</CCol>
              <CCol sm="auto">Đang di chuyển</CCol>
              <CCol sm="auto">Giao hàng hoàn tất</CCol>
            </CRow>
            <CProgress height={20}>
              <CProgressBar value={25}></CProgressBar>
            </CProgress>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleStatus(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Accordion
