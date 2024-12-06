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
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDish, setNewDish] = useState({
    TenMon: "",
    MoTa: "",
    Gia: "",
    HinhAnh: "",
  });

  const [dataDish, setDataDish] = useState([
    {
      MaMon: 1,
      HinhAnh: 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551783840584-QR5NNGHV2Y7KD8NTQTT2/chup-anh-thuc-an-1.jpg?format=1000w',
      TenMon: 'Cơm thố',
      MoTa: 'Mô tả',
      Gia: '120000',
      TrangThai: 'Còn món',
    },
    {
      MaMon: 2,
      HinhAnh: 'https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-3.jpg',
      TenMon: 'Cơm chiên châu',
      MoTa: 'Mô tả',
      Gia: '132000',
      TrangThai: 'Hết món',
    },
  ]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish((prev) => ({ ...prev, [name]: value }));
  };


  const handleAddDish = () => {
    // Kiểm tra dữ liệu hợp lệ trước khi thêm
    if (!newDish.TenMon || !newDish.MoTa || !newDish.Gia || !newDish.HinhAnh) {
      alert('Vui lòng nhập đầy đủ thông tin món ăn!');
      return;
    }

    // Tạo món mới với ID giả lập (hoặc backend trả về ID)
    const newDishWithId = {
      ...newDish,
      MaMon: dataDish.length + 1, // Giả lập ID tự tăng
    };

    // Cập nhật danh sách món ăn
    setDataDish((prevDataDish) => [...prevDataDish, newDishWithId]);

    // Đặt lại trạng thái form
    setNewDish({
      TenMon: '',
      MoTa: '',
      Gia: '',
      HinhAnh: '',
    });

    console.log('Dữ liệu được thêm: ', newDish);

    // Đóng modal
    setShowAddModal(false);
  };



  const handleCancel = () => {
    setShowAddModal(false); // Đóng modal
    setNewDish({
      MaMon: '',
      HinhAnh: '',
      TenMon: '',
      MoTa: '',
      Gia: '',
      TrangThai: 'Còn món',
    });
  };

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Lấy file được chọn
    if (!file) return;

    // Kiểm tra định dạng file (tùy chọn)
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(file.type)) {
      alert('Chỉ chấp nhận các định dạng hình ảnh (JPEG, PNG, GIF).');
      return;
    }

    // Tạo URL để xem trước hình ảnh
    const imageUrl = URL.createObjectURL(file);

    // Cập nhật trạng thái newDish
    setNewDish((prev) => ({
      ...prev,
      HinhAnh: imageUrl,
    }));
  };

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
          <strong>Danh món ăn</strong>
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
            <CButton color="primary" type="button" className="mb-3" onClick={() => setShowAddModal(true)}>
              Thêm món ăn
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
            </CNav>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Mã món</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Hình ảnh</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tên món ăn</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Danh mục</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Mô tả</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Giá</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tuỳ chọn</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {dataDish.map((item, index) => (
                    <CTableRow key={item.MaMon}>
                      <CTableHeaderCell scope="row">{item.MaMon}</CTableHeaderCell>
                      <CTableDataCell>
                        {item.HinhAnh ? (
                          <img
                            src={item.HinhAnh}
                            alt={`Hình ảnh của món ${item.TenMon}`}
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          />
                        ) : (
                          'Không có hình ảnh'
                        )}
                      </CTableDataCell>
                      <CTableDataCell>{item.TenMon}</CTableDataCell>
                      <CTableDataCell>Món cơm</CTableDataCell>
                      <CTableDataCell>{item.MoTa}</CTableDataCell>
                      <CTableDataCell>{item.Gia}</CTableDataCell>
                      <CTableDataCell
                        style={{
                          color: item.TrangThai === 'Còn món' ? 'green' : 'red',
                        }}
                      >
                        {item.TrangThai || 'Còn món'}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary">Tuỳ chỉnh</CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={() => handleUpdate(item.MaMon)}>
                              Chỉnh sửa
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

      <CModal visible={showAddModal} onClose={() => setShowAddModal(false)}>
        <CModalHeader>
          <CModalTitle>Thêm món ăn</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              label="Tên món ăn"
              name="TenMon"
              placeholder="Nhập tên món ăn"
              value={newDish.TenMon}
              onChange={handleInputChange}
            />
            <CFormInput
              label="Mô tả"
              name="MoTa"
              placeholder="Nhập mô tả"
              value={newDish.MoTa}
              onChange={handleInputChange}
            />
            <CFormInput
              label="Giá"
              name="Gia"
              type="number"
              placeholder="Nhập giá"
              value={newDish.Gia}
              onChange={handleInputChange}
            />
            <CFormLabel htmlFor="HinhAnh">Chọn hình ảnh</CFormLabel>
            <CFormInput
              type="file"
              id="HinhAnh"
              onChange={handleImageUpload}
            />
            {newDish.HinhAnh && (
              <img
                src={newDish.HinhAnh}
                alt="Preview"
                style={{ marginTop: '10px', width: '100px', height: '100px', objectFit: 'cover' }}
              />
            )}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleAddDish}>
            Lưu
          </CButton>
          <CButton color="secondary" onClick={() => setShowAddModal(false)}>
            Hủy
          </CButton>
        </CModalFooter>
      </CModal>


    </>
  )
}

export default Accordion
