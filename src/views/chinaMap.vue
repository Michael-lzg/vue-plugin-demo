<template>

    <div id="map" :style="{ width: '100%', height: '450px' }"></div>

</template>

<script>
import echarts from 'echarts'
import '../JS/china'
// import 'echarts/map/js/china' // 引入china.js地图文件
export default {
  name: 'ChinaMap',
  methods: {
    randomData () {
      return Math.round(Math.random() * 500)
    },
    drawChinaMap () {
      const myChart = echarts.init(document.getElementById('map'))

      var mydata = [
        { name: '北京', value: '100' },
        { name: '天津', value: this.randomData() },
        { name: '上海', value: this.randomData() },
        { name: '重庆', value: this.randomData() },
        { name: '河北', value: this.randomData() },
        { name: '河南', value: this.randomData() },
        { name: '云南', value: this.randomData() },
        { name: '辽宁', value: this.randomData() },
        { name: '黑龙江', value: this.randomData() },
        { name: '湖南', value: this.randomData() },
        { name: '安徽', value: this.randomData() },
        { name: '山东', value: this.randomData() },
        { name: '新疆', value: this.randomData() },
        { name: '江苏', value: this.randomData() },
        { name: '浙江', value: this.randomData() },
        { name: '江西', value: this.randomData() },
        { name: '湖北', value: this.randomData() },
        { name: '广西', value: this.randomData() },
        { name: '甘肃', value: this.randomData() },
        { name: '山西', value: this.randomData() },
        { name: '内蒙古', value: this.randomData() },
        { name: '陕西', value: this.randomData() },
        { name: '吉林', value: this.randomData() },
        { name: '福建', value: this.randomData() },
        { name: '贵州', value: this.randomData() },
        { name: '广东', value: this.randomData() },
        { name: '青海', value: this.randomData() },
        { name: '西藏', value: this.randomData() },
        { name: '四川', value: this.randomData() },
        { name: '宁夏', value: this.randomData() },
        { name: '海南', value: this.randomData() },
        { name: '台湾', value: this.randomData() },
        { name: '香港', value: this.randomData() },
        { name: '澳门', value: this.randomData() }
      ]
      var option = {
        backgroundColor: '#FFFFFF',
        title: {
          text: '全国地图大数据',
          subtext: '',
          x: 'center',
          y: '30px'
        },
        tooltip: {
          trigger: 'item'
        },

        // 左侧小导航图标
        visualMap: {
          show: true,
          x: 'left',
          y: 'bottom',
          splitList: [
            { start: 500, end: 600 },
            { start: 400, end: 500 },
            { start: 300, end: 400 },
            { start: 200, end: 300 },
            { start: 100, end: 200 },
            { start: 0, end: 100 }
          ],
          color: [
            '#5475f5',
            '#9feaa5',
            '#85daef',
            '#74e2ca',
            '#e6ac53',
            '#9fb5ea'
          ]
        },

        // 配置属性
        series: [
          {
            name: '数据',
            type: 'map',
            mapType: 'china',
            roam: true,
            label: {
              normal: {
                show: false // 省份名称
              },
              emphasis: {
                show: false
              }
            },
            data: mydata // 数据
          }
        ]
      }

      myChart.setOption(option)
    }
  },
  mounted () {
    this.drawChinaMap()
  }
}
</script>
