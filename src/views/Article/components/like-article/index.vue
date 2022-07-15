<template>
  <van-button class="btn" @click="changeAttitude">
    <template>
      <van-icon
        :color="attitude === 1 ? 'red' : ''"
        :name="attitude === 1 ? 'good-job' : 'good-job-o'"
      />
    </template>
  </van-button>
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  data () {
    return {
      loading: false
    }
  },
  model: {
    prop: 'attitude',
    event: 'changeAttitude'
  },
  props: {
    attitude: {
      type: [String, Number],
      required: true
    },
    artId: {
      type: [String, Number]
    }
  },

  created () {},

  methods: {
    async changeAttitude () {
      console.log(111)
      this.loading = true
      try {
        if (this.attitude === 1) {
          await deleteLike(this.artId)
          this.attitude = -1
          this.$toast.success('取消点赞')
        } else {
          await addLike(this.artId)
          this.attitude = 1
          this.$toast.success('点赞成功')
          this.$emit('changeAttitude', !this.attitude)
          this.loading = false
        }
      } catch (e) {
        console.log(e)
        this.$toast.fail('操作失败')
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.btn {
  border: none;
}
</style>
