
// 圖表主繪製區域
const chart1 = echarts.init(document.getElementById('main'));
const chart2 = echarts.init(document.getElementById('six'));
$("#update").click(() => {
    drawPM25();
});



// 先呼叫繪製全省
drawPM25();
// 再呼叫繪製六都
drawSixPM25();

// 取得後端資料
function drawPM25() {
    chart1.showLoading();
    $.ajax(
        {
            url: "/pm25-data",
            type: "GET",
            dataType: "json",
            success: (result) => {
                // 繪製對應區並給了必要參數
                // jQuery寫法
                $("#pm25_high_site").text(result["highest"]["site"]);
                $("#pm25_high_value").text(result["highest"]["pm25"]);
                $("#pm25_low_site").text(result["lowest"]["site"]);
                $("#pm25_low_value").text(result["lowest"]["pm25"]);
                drawchart(chart1, result["time"], "PM2.5", result["site"], result["pm25"])
                chart1.hideLoading(close);
                this.setTimeout(() => {
                }, 1000);
            },
            error: () => {
                alert("讀取資料失敗，請稍後再試!")
                chart1.hideLoading();
            }
        }
    )
}

// 六都的函式
function drawSixPM25() {
    chart2.showLoading();
    $.ajax(
        {
            url: "/six-pm25-data",
            type: "GET",
            dataType: "json",
            success: (result) => {
                // 繪製對應區並給了必要參數
                drawchart(chart2, "六都PM2.5平均值", "PM2.5", result["site"], result["pm25"])
                chart2.hideLoading(close);
            },
            error: () => {
                alert("讀取資料失敗，請稍後再試!")
                chart2.hideLoading();
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