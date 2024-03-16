
// 圖表主繪製區域
const myChart = echarts.init(document.getElementById('main'));
drawPM25();
function drawPM25() {
    $.ajax(
        {
            url: "/pm25-data",
            type: "GET",
            dataType: "json",
            success: (result) => {
                console.log(result);
                drawchart(myChart, result["time"], "PM2.5", result["site"], result["pm25"])
            }
        }
    )
}

function drawchart(chart, title, legend, xData, yData) {
    let option = {
        title: {
            text: title
        },
        tooltip: {},
        legend: {
            data: [legend]
        },
        xAxis: {
            data: xData
        },
        yAxis: {},
        series: [
            {
                name: legend,
                type: 'bar',
                data: yData
            }
        ]
    };

    chart.setOption(option);
}