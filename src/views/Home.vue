<template>
  <div class="list">
    <div class="listItem" v-for="(item, index) in list" :key="index" @click="toUrl(item)">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        { name: '二维码', url: '/qrCode' },
        { name: 'echart', url: '/echart' },
        { name: '中国地图', url: '/chinaMap' },
        { name: '高德地图', url: '/map' },
        { name: '微信分享', url: '/share' },
        { name: '文件上传', url: '/upload' },
        { name: '省市联动', url: '/AMap' },
        { name: 'pdf预览', url: '/pdf' },
        { name: '滚动导航栏', url: '/nav' },
        { name: 'day.js时间转化', url: '/day' }
      ]
    }
  },
  methods: {
    toUrl (item) {
      this.$router.push({
        path: item.url
      })
    }
  }
}
</script>

<style scoped lang="less">
.list {
  height: 100%;
  width: 100%;
  .listItem {
    width: 100%;
    padding: 0 15px;
    height: 45px;
    line-height: 45px;
    position: relative;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
}
</style>
