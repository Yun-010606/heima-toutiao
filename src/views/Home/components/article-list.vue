<template>
  <div class="article-list">
    <van-pull-refresh
      :success-text="successText"
      v-model="isLoading"
      @refresh="onRefresh"
      ><!-- 释放提示 -->
      <template #loosing>
        <img class="doge" src="https://img01.yzcdn.cn/vant/doge.png" />
      </template>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="小二已经很累, 别再戳我了 ~~~"
      >
        <ArticleItem :article="item" v-for="item in list" :key="item.art_id" />
        <!-- <van-cell 
        v-for="item in list" 
        :key="item.id" 
        :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
import ArticleItem from '@/components/article.item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      successText: ''
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        // 获取文章列表数据
        const res = await getArticleList({
          channel_id: this.channel.id, // 文章列表对应的频道id
          timestamp: this.timestamp || Date.now(), // 时间戳首次请求为当前时间戳
          with_top: 1 // 写死1
        })
        //   console.log(res)
        //   this.list = res.data.data.results
        this.list = [...this.list, ...res.data.data.results]
        // 加载状态结束
        this.loading = false
        // 判断如果数据请求完了
        if (res.data.data.results.length === 0) {
          // 数据请求结束 停止数据渲染
          this.finished = true
        } else {
          this.timestamp = res.data.data.pre_timestamp
        }
        // throw new Error('出错啦')
      } catch (e) {
        console.log(e)
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        // 获取文章列表数据
        const res = await getArticleList({
          channel_id: this.channel.id, // 文章列表对应的频道id
          timestamp: Date.now(),
          with_top: 1
        })
        this.list = [...res.data.data.results, ...this.list]
        this.isLoading = false
        this.successText = `更新了${res.data.data.results.length}条数据`
      } catch (e) {
        this.isLoading = false
        this.$toast.fail('请求失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow: auto;
  .doge {
  width: 180px;
  height: 90px;
  margin-top: 8px;
  border-radius: 4px;
}
}

</style>
