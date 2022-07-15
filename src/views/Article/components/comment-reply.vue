<template>
  <div class="comment-reply">
    <van-nav-bar title="回复" @click-left="$emit('close')">
      <template #left>
        <van-icon color="white" name="cross" />
      </template>
    </van-nav-bar>
    <CommentItem :comment="currentComment" />
    <van-cell title="评论回复" :border="false"></van-cell>
    <CommentList :list="list" type="c" :source="currentComment.com_id" />
    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost
        @postSuccess="postSuccess"
        type="c"
        :target="currentComment.com_id"
      />
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentPost from '@/views/Article/components/comment-post.vue'
import CommentList from '@/views/Article/components/comment-list.vue'
import CommentItem from '@/views/Article/components/comment-item'
export default {
  name: 'CommentReply',
  components: { CommentItem, CommentList, CommentPost },
  props: {
    // 点击的那行的评论信息
    currentComment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      isPostShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    postSuccess (comment) {
      this.isPostShow = false // 关闭发布评论
      this.list.unshift(comment) // 回复评论后让内容显示在第一个
      this.currentComment.reply_count++ // 评论回复后让回复数量加一
    }
  }
}
</script>
<style scoped lang="less">
.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
