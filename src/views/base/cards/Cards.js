import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardText,
  CCardTitle,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react';
import ReactImg from 'src/assets/images/react.jpg'; // Thay bằng đường dẫn thực tế của ảnh

const Cards = () => {
  // Mảng chứa danh sách các món ăn
  const [allFoodItems] = useState([
    { id: 1, title: 'Món ăn 1', description: 'Mô tả món ăn 1', image: ReactImg },
    { id: 2, title: 'Món ăn 2', description: 'Mô tả món ăn 2', image: ReactImg },
    { id: 3, title: 'Món ăn 3', description: 'Mô tả món ăn 3', image: ReactImg },
    { id: 4, title: 'Món ăn 4', description: 'Mô tả món ăn 4', image: ReactImg },
  ]);
  const [selectedFoodItems, setSelectedFoodItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  // Xử lý khi chọn checkbox
  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  // Xử lý khi xác nhận chọn món ăn
  const handleAddFood = () => {
    const selectedFoods = allFoodItems.filter((item) => selectedIds.includes(item.id));
    setSelectedFoodItems([...selectedFoodItems, ...selectedFoods]);
    setSelectedIds([]); // Reset checkbox
    setModalVisible(false); // Đóng modal
  };

  // Hàm xóa món ăn
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa món ăn này?');
    if (confirmDelete) {
      setSelectedFoodItems(selectedFoodItems.filter((item) => item.id !== id));
    }
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
          <strong>Danh sách món ăn trong ngày</strong>
        </CCardHeader>
        <div>
          <span style={{ marginRight: 10 }}>Tìm kiếm món ăn</span>
          <input style={{ borderRadius: 0, marginRight: 10, height: 35 }} type="text" />
          <CButton color="primary" onClick={() => setModalVisible(true)}>
            Thêm món ăn
          </CButton>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {selectedFoodItems.map((food) => (
          <CCard key={food.id} style={{ width: '12rem' }}>
            <CCardImage orientation="top" src={food.image} />
            <CCardBody>
              <CCardTitle>{food.title}</CCardTitle>
              <CCardText>{food.description}</CCardText>
              <CButton color="danger" onClick={() => handleDelete(food.id)}>
                Xóa món ăn
              </CButton>
            </CCardBody>
          </CCard>
        ))}
      </div>

      {/* Modal */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Danh sách tất cả các món ăn</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {allFoodItems.map((food) => (
            <div
              key={food.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(food.id)}
                onChange={() => handleCheckboxChange(food.id)}
                style={{ marginRight: '10px' }}
              />
              <div>
                <strong>{food.title}</strong> - {food.description}
              </div>
            </div>
          ))}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Hủy
          </CButton>
          <CButton color="primary" onClick={handleAddFood}>
            Thêm món ăn
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Cards;
