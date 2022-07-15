<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      icon="search"
      @click="hancleClick(item)"
    >
      <template #title>
        <div v-html="highLight(item)"></div>
      </template>
    </van-cell>
    <!-- <van-cell icon="search" title="建议"></van-cell>
    <van-cell icon="search" title="建议"></van-cell>
    <van-cell icon="search" title="建议"></van-cell>
    <van-cell icon="search" title="建议"></van-cell> -->
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      list: []
    }
  },
  props: {
    searchText: {
      type: String
    }
  },
  created () {},
  watch: {
    searchText: {
      handler: debounce(function (value) {
        // console.log(value)
        this.getSearchSuggestion(value)
      }, 500),
      immediate: true
    }
  },
  methods: {
    highLight (item) {
      const reg = new RegExp(this.searchText, 'gi')
      return item.replace(
        reg,
        `<span style="color: red">${this.searchText}</span>`
      )
    },
    hancleClick (value) {
      console.log(value)
      this.$emit('onSearch', value)
    },
    async getSearchSuggestion (q) {
      const res = await getSearchSuggestion(q)
      this.list = res.data.data.options
      //   console.log(res)
      //   this.list = res.data.data.options.map((item) => {
      //     const reg = new RegExp(this.searchText, 'gi')
      //     return item.replace(
      //       reg,
      //       `<span style="color: red">${this.searchText}</span>`
      //     )
      //   })
    }
  }
}
</script>

<style></style>
