<template>
  <div class="home-container">
    <van-nav-bar title="标题" fixed>
      <template #title>
        <van-button
          block
          class="search-btn"
          icon="search"
          round
          size="small"
          type="info"
          to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="item in userChannel" :key="item.id" :title="item.name">
        <!-- 频道的文章列表 -->
        <ArticleList :channel="item" />
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="showPopup = true">
          <tou-tiao icon="gengduo" />
        </div>
      </template>
    </van-tabs>
    <van-popup
      closeable
      close-icon-position="top-left"
      style="height: 90%"
      position="bottom"
      v-model="showPopup"
    >
      <ChannelEdit
        @changeActive="changeActive"
        :active="active"
        :userChannel="userChannel"
      />
    </van-popup>
  </div>
</template>

<script>
import TouTiao from '@/components/TouTiao.vue'
import { getChannels } from '@/api/channels'
import { getLocal } from '@/utils/storage'
import { USERCHANNELKEY } from '@/constants.js'
import ArticleList from '@/views/Home/components/article-list.vue'
import ChannelEdit from '@/views/Home/components/channel-edit'
export default {
  name: 'HomePage',
  components: {
    TouTiao,
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      showPopup: false,
      active: 0,
      userChannel: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getChannels()
  },
  mounted () {},
  methods: {
    // 自定义事件名
    // 修改active值的方法
    changeActive (index, status) {
      this.active = index
      // 关闭弹层
      this.showPopup = status
    },
    async getChannels () {
      // 如果用户登录 || 本都没有数据 ==> 接口
      // 其他 ==> 本地存储
      try {
        // 获取用户token
        const token = this.$store.state.user?.token
        // 获取本地存储频道数据
        let channels = getLocal(USERCHANNELKEY)
        if (token || !channels) {
          const res = await getChannels()
          // console.log(res)
          channels = res.data.data.channels
        }
        this.userChannel = channels
      } catch (e) {
        // console.log(e)
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    width: 80%;
    max-width: unset;
  }
  .search-btn {
    background: #5babfb;
    border: none;
  }
  .van-nav-bar .van-icon {
    color: #fff;
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
}
</style>
