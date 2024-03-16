
// 圖表主繪製區域
const chart1 = echarts.init(document.getElementById('main'));
const chart2 = echarts.init(document.getElementById('six'));
const chart3 = echarts.init(document.getElementById('county'));

$("#update").click(() => {
    drawPM25();
});

// select 選擇option時的監聽
$("#select_county").change(() => {
    // val=>value(選擇的option value)
    county = $("#select_county").val();
    console.log(county);
    drawCountyPM25(county);
});

// 設定隨著視窗大小縮放圖表大小
window.onresize = function () {
    chart1.resize();
    chart2.resize();
    chart3.resize();
};

// 先呼叫繪製全省
drawPM25();
// 再呼叫繪製六都
drawSixPM25();
// 繪製各縣市
drawCountyPM25("彰化縣");

// 各縣市的函式
function drawCountyPM25(county) {
    chart3.showLoading();
    $.ajax(
        {
            url: `/county-pm25-data/${county}`,
            type: "GET",
            dataType: "json",
            success: (result) => {
                // 繪製對應區並給了必要參數
                this.setTimeout(() => {
                    drawchart(chart3, county, "PM2.5", result["site"], result["pm25"], "#98fb98");
                    chart3.hideLoading(close);
                }, 1000);
            },
            error: () => {
                alert("讀取資料失敗，請稍後再試!")
                chart3.hideLoading();
            }
        }
    )
}



// 取得後端資料
// 全省的函式
function drawPM25() {
    chart1.showLoading();
    $.ajax(
        {
            url: "/pm25-data",
            type: "GET",
            dataType: "json",
            success: (result) => {
                // 繪製對應區並給了必要參數
                this.setTimeout(() => {
                    // jQuery寫法
                    $("#pm25_high_site").text(result["highest"]["site"]);
                    $("#pm25_high_value").text(result["highest"]["pm25"]);
                    $("#pm25_low_site").text(result["lowest"]["site"]);
                    $("#pm25_low_value").text(result["lowest"]["pm25"]);
                    drawchart(chart1, result["time"], "PM2.5", result["site"], result["pm25"])
                    chart1.hideLoading(close);

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
                this.setTimeout(() => {
                    drawchart(chart2, "六都PM2.5平均值", "PM2.5", result["site"], result["pm25"], "#87cefa")
                    chart2.hideLoading(close);
                }, 1000);
            },
            error: () => {
                alert("讀取資料失敗，請稍後再試!")
                chart2.hideLoading();
            }
        }
    )
}

// 繪圖區
function drawchart(chart, title, legend, xData, yData, color = "#db7093") {
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
                data: yData,
                itemStyle: {
                    color: color
                }
            }
        ]
    };

    chart.setOption(option);
}