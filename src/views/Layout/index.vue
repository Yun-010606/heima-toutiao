<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar route class="layout-tabbar" v-model="active">
      <van-tabbar-item icon="home-o" to="/home">
        <template #icon>
          <TouTiao icon="shouye" />
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/wenda">
        <template #icon>
          <TouTiao icon="wenda" />
        </template>
        问答
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/video">
        <template #icon>
          <TouTiao icon="shipin" />
        </template>
        视频
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/myself">
        <template #icon>
          <TouTiao icon="wode" />
        </template>
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
