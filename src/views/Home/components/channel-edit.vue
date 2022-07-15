<template>
  <div class="channel-edit">
    <van-cell style="text-align: center" title="频道编辑"></van-cell>
    <van-cell title="我的频道" :border="false">
      <template #default>
        <van-button
          @click="isedit = !isedit"
          class="edit-btn"
          round
          plain
          size="mini"
          type="danger"
        >
          {{ isedit ? '完成' : '编辑' }}
        </van-button>
      </template>
    </van-cell>
    <van-grid class="my-channel" :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(value, index) in userChannel"
        :key="value.id"
        @click="onMyChannelClick(value, index)"
      >
        <template #icon v-if="isedit && index !== 0">
          <van-icon name="clear" />
        </template>
        <template #text>
          <span class="text" :class="{ active: active === index }">{{
            value.name
          }}</span>
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell title="推荐频道" :border="false"></van-cell>
    <van-grid :gutter="10" direction="horizontal" class="recommend-channel">
      <van-grid-item
        icon="plus"
        class="channel-item"
        v-for="item in recommendChannels"
        :key="item.id"
        @click="addChannel(item)"
      >
        <template #text>
          <span class="text">{{ item.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  getAddChannel,
  getAllchannels,
  deleteUserChannel
} from '@/api/channels'
import { differenceBy } from '@/utils/lodash'
import { Notify } from 'vant'
import { USERCHANNELKEY } from '@/constants.js'
import { setLocal } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    active: {
      type: Number
    },
    userChannel: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isedit: false,
      allchannels: []
    }
  },
  computed: {
    recommendChannels () {
      return differenceBy(this.allchannels, this.userChannel, 'id')
      //   // 从所有的频道数据里面， 找到我的频道数据 ==> 过滤掉
      //   return this.allchannels.filter((item) => {
      //     //   返回true
      //     // 如果找到了 >> true
      //     // 如果所有频道里面的item在userchannel里面找到了 当前项就被保存
      //     return !this.userChannel.some((userItem) => userItem.id === item.id)
      //   })
    },
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.getAllchannels()
  },
  mounted () {},
  methods: {
    async deleteChannel (channel) {
      // 想要删除的频道项
      try {
        if (this.user) {
          // 从接口删除
          await deleteUserChannel(channel.id)
        } else {
          // 修改之后的数据存储到本地存储
          setLocal(USERCHANNELKEY, this.userChannel)
        }
        this.$toast('删除成功')
      } catch (e) {
        this.$toast('删除失败')
      }
    },
    onMyChannelClick (channel, index) {
      console.log(channel, index)
      if (this.isedit) {
        if (index === 0) {
          return Notify({ type: 'danger', message: '这项不能删除哦 ~~~' })
        }
        if (index <= this.active) {
          this.$emit('changeActive', this.active - 1, true)
          // 判断是否处于编辑状态
        }
        this.userChannel.splice(index, 1)
        // 持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑状态 ==》 切换 ==》关闭弹层
        this.$emit('changeActive', index, false)
      }
    },
    async addChannel (channel) {
      // 子组件不允许修改父组件的数据
      this.userChannel.push(channel)
      if (this.user) {
        try {
          // 已经登陆了 ==> 请求接口添加频道
          await getAddChannel({
            id: channel.id,
            seq: this.userChannel.length
          })
          this.$toast('添加频道成功')
        } catch (e) {
          this.$toast('添加失败')
        }
      } else {
        // 未登录
        // 修改之后的个人频道数据存储到本地存储
        setLocal(USERCHANNELKEY, this.userChannel)
      }
    },
    async getAllchannels () {
      const res = await getAllchannels()
      //   console.log(res)
      this.allchannels = res.data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  .edit-btn {
    width: 80px;
  }
  .channel-item .text {
    font-size: 12px;
    color: #222;
    margin-top: 0;
  }
  /deep/.channel-item .van-grid-item__content {
    background-color: #f7f8fa;
  }
  /deep/.recommend-channel .van-icon-plus {
    //   color: red;
    font-size: 30px;
    margin-right: 5px;
  }
  .my-channel {
    /deep/.van-icon-clear {
      position: absolute;
      font-size: 20px;
      right: -10px;
      top: -10px;
      color: #cacaca;
    }
    .active {
      color: red;
    }
    /deep/.channel-item {
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
}
</style>
