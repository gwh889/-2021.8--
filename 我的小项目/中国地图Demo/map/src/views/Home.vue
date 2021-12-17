<template>
  <div id="map"></div>
</template>

<script>
import "../assets/china";
export default {
  data() {
    return {
      chinachart: null,
      chartOption: null,
      geoCoordMap: {}
    };
  },
  mounted() {
    // var chart = this.echarts.init(document.getElementById("map"));
    // chart.setOption({
    //   series: [
    //     {
    //       type: "map",
    //       map: "china"
    //     }
    //   ]
    // });
    // 初始化echarts实例
    this.chinachart = this.echarts.init(document.getElementById("map"));
    // 进行相关配置
    this.chartOption = {
      tooltip: {
        show: true,
        formatter: function(params) {
          return "人数：30" + "<br/>设备：300";
        }
      },
      geo: {
        // 地理坐标系组件用于地图的绘制
        map: "china", // 表示中国地图
        // roam: true, // 是否开启鼠标缩放和平移漫游
        zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
        label: {
          show: true
        },
        itemStyle: {
          // 地图区域的多边形 图形样式。
          normal: {
            borderColor: "#eee",
            areaColor: "#eee" // 地图颜色
          },
          // 高亮时的显示
          emphasis: { areaColor: "#0FADFF", borderWidth: 2 }
        },
        regions: [
          //对不同的区块进行着色
          {
            name: "浙江", //区块名称
            itemStyle: {
              areaColor: "#281fe1",
              color: "#fff"
            }
            // selected:true
          }
        ]
      },
      series: [
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          data: this.convertData([
            { name: "北京", value: 110 },
            { name: "上海", value: 110 },
            { name: "浙江", value: 110 },
            { name: "广东", value: 210 }
          ]),
          symbolSize: 12,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          // 散点样式
          itemStyle: {
            normal: {
              color: "#ff8003"
            },
            emphasis: {
              borderColor: "#fff",
              borderWidth: 1
            }
          }
        },
        {
          type: "map",
          label: {
            show: true
          }
        }
      ]
    };
    // 使用刚指定的配置项和数据显示地图数据
    this.chinachart.setOption(this.chartOption);

    //定义全国省份的数组
    var cityArr = [
      [
        "上海",
        "河北",
        "山西",
        "内蒙古",
        "辽宁",
        "吉林",
        "黑龙江",
        "江苏",
        "浙江",
        "安徽",
        "福建",
        "江西",
        "山东",
        "河南",
        "湖北",
        "湖南",
        "广东",
        "广西",
        "海南",
        "四川",
        "贵州",
        "云南",
        "西藏",
        "陕西",
        "甘肃",
        "青海",
        "宁夏",
        "新疆",
        "北京",
        "天津",
        "重庆",
        "香港",
        "澳门",
        "台湾"
      ],
      [
        "shanghai",
        "hebei",
        "shanxi",
        "neimenggu",
        "liaoning",
        "jilin",
        "heilongjiang",
        "jiangsu",
        "zhejiang",
        "anhui",
        "fujian",
        "jiangxi",
        "shandong",
        "henan",
        "hubei",
        "hunan",
        "guangdong",
        "guangxi",
        "hainan",
        "sichuan",
        "guizhou",
        "yunnan",
        "xizang",
        "shanxi1",
        "gansu",
        "qinghai",
        "ningxia",
        "xinjiang",
        "beijing",
        "tianjin",
        "chongqing",
        "xianggang",
        "aomen",
        "taiwan"
      ]
    ];
    let that = this;
    this.chinachart.on("click", function(param) {
      if (param.name === "浙江") {
        that.$router.push("/zhejiang");
      }
      // 城市中文名
      var cityName = param.name;
      // 查找是否有对应城市有则加载城市
      for (var i = 0, len = cityArr[0].length; i < len; i++) {
        if (cityName == cityArr[0][i]) {
          // 获取得城市拼音
          // that.showCity(cityArr[0][i], cityArr[1][i]);
          return;
        }
      }
      //没有找到对应城市的话，那么返回到全国地图
      option.series[0].mapType = "china";
      this.chinachart.setOption(option);
    });
  },

  methods: {
    convertData(data) {
      var geoCoordMap = {
        北京: [116.46, 39.92],
        上海: [121.48, 31.22],
        浙江: [120.19, 30.26],
        广东: [113.23, 23.16]
      };
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    }
  }
};
</script>

<style>
#map {
  width: 800px;
  height: 800px;
  margin: auto;
}
</style>
