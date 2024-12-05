import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Tổng Quan',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Components',
  // },
  {
    component: CNavGroup,
    name: 'Danh Mục',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Quản lý vé xe',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Quản lý tuyến đi',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Quản lý hành khách',
        to: '/base/cards',
      },
      // {
      //   component: CNavItem,
      //   name: 'Tài khoản & Phân cấp',
      //   to: '/base/carousels',
      // },
    ],
  },
  {
    component: CNavItem,
    name: 'Báo cáo  thống kê',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
]

export default _nav
