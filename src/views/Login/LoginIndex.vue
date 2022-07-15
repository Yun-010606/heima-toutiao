<template>
  <div class="login-container">
    <van-nav-bar title="登录" @click-left="$router.push('/myself')">
      <template #left>
        <TouTiao icon="guanbi" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        required
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
      >
        <template #left-icon>
          <TouTiao icon="shouji" />
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        required
        type="number"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        :maxlength="6"
      >
        <template #button>
          <van-count-down
            @finish="isShowCountDown = false"
            v-if="isShowCountDown"
            :time="5000"
            format="ss 秒"
          />
          <van-button
            v-else
            native-type="button"
            class="send-sms-btn"
            size="small"
            @click="sendSmsCode"
            :loading="isDisabled"
            >发送验证码</van-button
          >
        </template>
        <template #left-icon>
          <TouTiao icon="yanzhengma" />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      isDisabled: false,
      isShowCountDown: false,
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不对'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码只能是6位'
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
    async onSubmit () {
      try {
        const res = await login(this.user)
        // console.log(res)
        this.$store.commit('setUser', res.data.data)
        Toast.success('登录成功')
        // 跳转到首页
        this.$router.push('/')
      } catch (e) {
        console.log(e)
        Toast.fail(e?.response?.data?.message || '服务端出错啦')
      }
    },
    async sendSmsCode () {
      try {
        await this.$refs.form.validate('mobile')
      } catch (e) {
        console.log(e)
        return
      }
      try {
        this.isDisabled = true
        await getSmsCode(this.user.mobile)
        this.isShowCountDown = true 
        Toast.success('发送验证码成功')
      } catch (e) {
        Toast.fail(e?.response?.data?.message || '出错啦')
        this.isShowCountDown = false
      } finally {
        this.isDisabled = false
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
.van-nav-bar__left {
  .toutiao {
    font-size: 14px;
    color: #fff;
  }
}

</style>
