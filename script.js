document.getElementById('toggle-sidebar').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('expanded');
  
    const contentPage = document.querySelector('.content-page');
    contentPage.classList.toggle('expanded');
  
    const navbar = document.querySelector('.top-navbar');
    navbar.classList.toggle('expanded');
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    // Bar Chart
    var ctx1 = document.getElementById('overview').getContext('2d');
    var barChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [{
          label: 'Bar Chart Example',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(25, 135, 84, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
      }
    });
  
    var ctx2 = document.getElementById('revenueCost').getContext('2d');
    var lineChart = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [{
          label: 'Profits',
          data: [12, 19, 3, 28, 2],
          backgroundColor: 'rgba(13, 202, 240, 0.6)',
          borderColor: '#0DCAF0',
          borderWidth: 1.5,
          fill: true
        }]
      },
      options: {
        responsive: true,
      }
    });
  
    // Initialize ApexCharts
    initializeApexChart("#layout1-chart-3", {
      series: [{
        name: "Desktops",
        data: [17, 23, 15, 28, 22, 32]
      }],
      colors: ['#6EDFF6'],
      chart: {
        height: 150,
        type: 'line',
        zoom: {
          enabled: false
        },
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 12,
          left: 1,
          blur: 2,
          opacity: 0.2
        },
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      title: {
        text: '',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#75B798', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      }
    });
  
    initializeApexChart("#orderSummaryChart", {
      series: [{
        name: 'Total Likes',
        data: [86, 80, 84, 95, 83, 75, 88, 76, 86, 93, 85, 65]
      }, {
        name: 'Total Share',
        data: [76, 72, 76, 85, 74, 69, 80, 68, 78, 85, 77, 55]
      }],
      chart: {
        type: 'bar',
        height: 300
      },
      colors: ['#75B798', '#6EDFF6'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 3,
        colors: ['transparent']
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        labels: {
          minWidth: 0,
          maxWidth: 0
        }
      },
      yaxis: {
        show: true,
        labels: {
          minWidth: 20,
          maxWidth: 20
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands"
          }
        }
      }
    });
  
    initializeApexChart("#expenseChart", {
      series: [{
        name: "Desktops",
        data: [17, 23, 15, 28, 22, 32]
      }],
      colors: ['#75B798'],
      chart: {
        height: 150,
        type: 'line',
        zoom: {
          enabled: false
        },
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 12,
          left: 1,
          blur: 2,
          opacity: 0.2
        },
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      title: {
        text: '',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#6EDFF6', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      }
    });
  
  });
  
  $(document).ready(function () {
    $('#myTable').DataTable();
    $('#myTable1').DataTable();
    $('#myTable2').DataTable();
    
  });
  function initializeApexChart(elementId, chartOptions) {
    if (document.querySelector(elementId)) {
        const chart = new ApexCharts(document.querySelector(elementId), chartOptions);
        chart.render();
        const body = document.querySelector('body');
        if (body.classList.contains('dark')) {
          apexChartUpdate(chart, { dark: true });
        }
        document.addEventListener('ChangeColorMode', function (e) {
          apexChartUpdate(chart, e.detail);
        });
      }
  }
  