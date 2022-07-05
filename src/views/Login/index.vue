<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        placeholder="请输入手机号"
        name="mobile"
        required
        type="number"
        :rules="rules.mobile"
      >
        <template #left-icon>
          <TouTiao icon="shouji" />
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        required
        type="number"
        maxlength="6"
        :rules="rules.code"
      >
        <template #left-icon>
          <TouTiao icon="yanzhengma" />
        </template>

        <template #button>
          <van-count-down
            @finish="isShowDown = false"
            v-if="isShowDown"
            :time="5000"
            format="ss 秒"
          />
          <van-button
            v-else
            isShowDown="true"
            native-type="button"
            class="send-sms-btn"
            size="small"
            type="primary"
            @click="sendSmsCode"
            :loading="isbtnDown"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user.js'
import { Toast } from 'vant'
// import { CountDown } from 'vant'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      isbtnDown: false,
      isShowDown: false,
      user: {
        mobile: '13911111111',
        code: ''
      },
      rules: {
        mobile: [
          {
            // 不能为空
            required: true,
            // 检验规则不满足的提示消息
            message: '手机号不能为空'
          },
          {
            // 手机号格式校验
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不对'
          }
        ],
        // 验证码校验
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码只能6位'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    //   表单校验
    async onSubmit () {
      // 获取到的对象： key ==> 表单的name的值  value ==> 用户输入的值
      //
      // await  后面写的是promise
      // 只有promise成功了的情况下才会继续执行
      try {
        const res = await login(this.user)
        console.log(res)
        Toast.success('登录成功')
      } catch (e) {
        Toast.fail(e?.response?.data?.message || '服务器端错误')
      }
    },
    async sendSmsCode () {
      // 通过传入表单name值 决定校验那个表单 validate(name?: string | string[])
      // 面试可能会问的问题：Promise: 异步解决方案 解决了什么问题？ 解决了回调地狱 ==> 链式调用形式 ==> 每一次.then会返回一个新的promise
      // async await ==> 链式调用(还是不够优雅) ==> 只是看起来是同步形式
      try {
        await this.$refs.form.validate('mobile')
      } catch (e) {
        console.log(e)
        return
      }
      try {
        this.isbtnDown = true
        // 调用获取验证码接口
        await getSmsCode(this.user.mobile)
        // 展示倒计时
        this.isShowDown = true
        // 获取成功后进行提示
        this.$toast.success('发送验证码成功')
        console.log('发送验证码中。。。')
      } catch (e) {
        // 如果获取失败了 进行错误提示
        console.log(e)
        this.$toast.fail(e.response.data.message || '出错啦')
        this.isShowDown = false
      } finally {
        // 不管成功或失败都会执行的逻辑
        this.isbtnDown = false
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
}
.send-sms-btn {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
  border: none;
}
</style>
