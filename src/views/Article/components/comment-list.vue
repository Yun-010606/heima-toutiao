<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="出错了，点击重试"
    >
      <CommentItem
        @reply-click="$emit('reply-click', $event)"
        v-for="item in list"
        :key="item.com_id"
        :comment="item"
      />
      <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.content" /> -->
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import CommentItem from '@/views/Article/components/comment-item'
import { getComments } from '@/api/comment'
export default {
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [String, Number],
      required: true
    },
    // artId: {
    //   type: String
    // }
    list: {
      type: Array
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      limit: 10,
      offset: null,
      error: false
    }
  },
  methods: {
    async onLoad () {
      try {
        const res = await getComments({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        this.list.push(...res.data.data.results)
        this.loading = false
        if (res.data.data.last_id === res.data.data.end_id) {
          this.finished = true
        } else {
          this.offset = res.data.data.last_id
        }
      } catch (e) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-list {
  margin-bottom: 45px;
}
</style>
