<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult= false"
      />
    </form>
    <!-- 搜索结果列表 优先级最高 -->
    <SearchResult v-if="isShowResult" :searchText="searchText" />
    <!-- 搜索建议列表 当搜索里有值时就显示搜索建议 -->
    <SearchSuggestion 
    @onSearch="onSearch"
    :searchText="searchText" 
    v-else-if="searchText" />
    <!-- 搜索历史列表 优先级最低 -->
    <SearchHistory @deleteAll="searchHistories=[]" @onSearch="onSearch" :searchHistories="searchHistories" v-else/>
  </div>
</template>

<script>
import SearchHistory from '@/views/Search/components/search-history.vue'
import SearchSuggestion from '@/views/Search/components/search-suggestion.vue'
import SearchResult from '@/views/Search/components/search-result.vue'
import { getLocal, setLocal } from '@/utils/storage'
import { HISTORYKEY } from '@/constants'
export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {

  },
  data () {
    return {
      searchText: '',
      isShowResult: false, // 是否显示搜索结果列表
      searchHistories: getLocal(HISTORYKEY) || [] // 搜索历史列表
    }
  },
  computed: {},
  watch: {
    // 搜索历史持久化
    // 监听了搜索历史记录数据的变化
    // 发生了变化的时候 把最新的数据存到本地存储
    // 注意：获取默认值的时候 从本地存储获取数据
    searchHistories (value) {
      setLocal(HISTORYKEY, value)
    }
  },
  created () {},
  methods: {
    onSearch (value) {
      console.log('开始搜索')
      this.searchText = value
      // 搜索结果页面展示
      this.isShowResult = true // 当在输入框里输入内容时，按下回车就让搜索结果显示
      // 添加之前， 先判断value是否已经在搜索历史列表里面
      const index = this.searchHistories.indexOf(value)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(value)
    },
    onCancel () {
      console.log('点击了取消')
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped></style>
