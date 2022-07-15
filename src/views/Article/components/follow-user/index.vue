<template>
  <van-button
    v-if="!isFollowed"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="follow"
    :loading="isFollowLoading"
    >关注</van-button
  >
  <van-button
    v-else
    @click="follow"
    class="follow-btn"
    round
    size="small"
    :loading="isFollowLoading"
    >已关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  model: {
    prop: 'isFollowed',
    event: 'changeFollowed'
  },
  props: {
    // 作者的id 需要从父组件接收
    autId: {
      type: [String, Number],
      required: true
    },
    // 组件添加v-model
    // 目的：允许子组件直接修改父组件的值
    // 1.把值通过value属性传递给子组件 ==> 子组件可以props(value)属性接收
    // 2.提供子组件一个input事件 ==> 修改v-model后面的值的
    // value: {
    //   type: [Boolean]
    // }
    isFollowed: {
      type: [Boolean]
    }
  },
  data () {
    return {
      isFollowLoading: false
    }
  },
  methods: {
    async follow () {
      this.isFollowLoading = true
      try {
        if (this.isFollowed) {
          // 取消关注
          await deleteFollow(this.autId)
        } else {
          // 去关注
          await addFollow(this.autId)
        }
        // this.article.is_followed = !this.article.is_followed
        // this.isFollowed = !this.isFollowed
        // this.$emit('input', !this.value)
        this.$emit('changeFollowed', !this.isFollowed)
        this.$notify({
          type: 'success',
          message: this.isFollowed ? '取消关注' : '关注成功'
        })
        this.isFollowLoading = false
      } catch (e) {
        // console.log(e)
        this.$notify({
          type: 'danger',
          message: '操作失败'
        })
        this.isFollowLoading = false
      }
    }
  }
}
</script>
<style scoped></style>
