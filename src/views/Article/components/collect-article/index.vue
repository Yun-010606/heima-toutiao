<template>
  <van-button class="btn" @click="changeCollected">
    <template #icon>
      <van-icon
        :color="isCollected ? 'red' : ''"
        :name="isCollected ? 'star' : 'star-o'"
      ></van-icon>
    </template>
  </van-button>
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  data () {
    return {
      loading: false
    }
  },
  model: {
    prop: 'isCollected',
    event: 'changeCollected'
  },
  props: {
    isCollected: {
      type: Boolean,
      required: true
    },
    artId: {
      type: [String, Number]
    }
  },
  methods: {
    async changeCollected () {
    //   console.log(222)
      this.loading = true
      try {
        if (this.isCollected) {
          await deleteCollect(this.artId)
        } else {
          await addCollect(this.artId)
        }
        this.$emit('changeCollected', !this.isCollected)
        this.$toast(this.isCollected ? '取消收藏' : '收藏成功')
        this.loading = false
      } catch (e) {
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
