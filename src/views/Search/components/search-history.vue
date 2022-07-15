<template>
  <div>
    <van-cell title="搜索历史">
      <template #default>
        <template v-if="isDeletebtn">
          <van-tag class="btn" type="danger" @click="deleteAll">全部删除</van-tag>
        <van-tag class="btn" type="success" @click="isDeletebtn=false">完成</van-tag>
        </template>
        <van-icon v-else name="delete" @click="isDeletebtn=true"></van-icon>
      </template>
    </van-cell>  
    <van-cell @click="clickHistoryItem(item, index)" v-for="(item, index) in searchHistories" :key="index" :title="item">
      <template #default v-if="isDeletebtn">
        <van-icon name="close"></van-icon>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data () {
    return {
      isDeletebtn: false
    }
  },
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteAll () {
      // this.searchHistories=[]
      // 通过自定义事件 让父组件进行删除的操作
      this.$emit('deleteAll')
    },
    clickHistoryItem (item, index) {
      // 点击了历史项的时候，需要添加判断
      // 如果处于删除状态 点击就是删除当前项
      // 如果不处于删除状态 点击去搜索
      if (this.isDeletebtn) {
        // 删除
        this.searchHistories.splice(index, 1)
      } else {
        // 去搜索
        this.$emit('onSearch', item)
      }
    }
  }
}
</script>

<style scoped lang="less">
.btn {
  margin-right: 10px;
}
</style>
