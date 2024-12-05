import React, { useEffect, useRef, useState } from 'react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const MainChart = () => {



  function getDayInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  function getCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    return currentMonth;
  }

  function dataforDay(datas, month) {
    let dataforday = []
    let dayofmounth = getDayInMonth(month, 2024)
    for (let i = 1; i <= dayofmounth; i++) {
      let dataAdd = 0;
      datas.forEach((item) => {
        var dateObject = new Date(item.NgayDatHang);
        var day = dateObject.getDate();
        if (day === i) {
          dataAdd += Number(item.TongTien);
        }
      })
      dataforday.push(dataAdd.toFixed(0));
    }
    return dataforday;
  }

  function dataforMonth(datas) {
    let dataformonth = []
    for (let i = 1; i <= 12; i++) {
      let dataAdd = 0;
      datas.forEach((item) => {
        var dateObject = new Date(item.NgayDatHang);
        var month = dateObject.getMonth() + 1;
        if (month === i) {
          dataAdd += Number(item.TongTien);
        }
      })
      dataformonth.push(dataAdd.toFixed(0));

    }
    return dataformonth;
  }




  function getDaysInMonth(year, month) {
    let firstDay = new Date(year, month - 1, 1);
    let lastDay = new Date(year, month, 0);
    let days = [];
    for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
      days.push(i);
    }
    return days;
  }





  const DateMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const DateDay = getDaysInMonth(2024, getCurrentMonth());
  const chartRef = useRef(null);
  const [valueactive, setValueActive] = useState("Month");
  const [dateShow, setDateShow] = useState(DateDay);
  const [dataorder, setDataOrder] = useState([]);
  const [datachart, setDataChart] = useState([]);
  const [datachartDay, setDataChartDay] = useState([]);
  const [datachartMonth, setDataChartMonth] = useState([]);

  useEffect(() => {
    
    fetchDataOder();
  }, [chartRef,dataorder,datachart,datachartDay,datachartMonth])

  const random = () => Math.round(Math.random() * 100)

  const fetchDataOder = async () => {
    const res = await axios.get('http://localhost:3001/api/getAllOrders')
    setDataOrder(res.data);
    setDataChartDay(dataforDay(res.data, getCurrentMonth()));
    setDataChartMonth(dataforMonth(res.data))
  }

  const handleChangeDate = (event) => {
    const valuActive = event.target.innerText;
    setValueActive(valuActive);
    if (valuActive === 'Month') {
      setDateShow(DateDay);
      setDataChart(datachartDay)

    }
    else {
      setDateShow(DateMonth);
      setDataChart(datachartMonth)

    }


  }

  return (
    <>

      
      <CButtonGroup className="float-end me-3">
        {['Month', 'Year'].map((value) => (
          <CButton
            color="outline-secondary"
            key={value}
            className="mx-0"
            active={value === valueactive}
            onClick={handleChangeDate}
          >
            {value}
          </CButton>
        ))}
      </CButtonGroup>

      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: dateShow,
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
              borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data: datachart
              ,
              fill: true,
            },
            {
              label: 'My Second dataset',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-success'),
              pointHoverBackgroundColor: getStyle('--cui-success'),
              borderWidth: 2,
              data: [287, 452, 375, 102, 357, 426, 373, 458, 270, 245, 172, 301, 259, 396, 96, 278, 345, 407, 111, 310, 149, 400, 405, 243, 344, 471, 436, 331, 134, 151]
              ,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              max: 500,
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart
