<template>
  <div class="login">
    <div class="banner">
      <img src="./banner.png" alt="" />
    </div>
    <!-- <HelloWorld></HelloWorld>
    <modal-button></modal-button> -->
    <form class="form">
      <div class="col">
        <input v-model="query.tel" :maxlength="11" placeholder="请输入手机号" />
      </div>
      <div class="col">
        <input v-model="query.captcha" placeholder="验证码" />
        <div class="captcha-btn" @click="sendSms">
          {{
            query.captchaLock && query.countdown != 60
              ? query.countdown + 's'
              : '获取验证码'
          }}
        </div>
      </div>
      <van-button
        class="submit-btn"
        type="primary"
        color="#337DFF"
        :disabled="!query.tel || !query.captcha"
        @click="submit"
        >登录</van-button
      >
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive ,getCurrentInstance} from 'vue'
import { useRouter } from 'vue-router'
import { Button, Toast } from 'vant'
import { sendSmsCode } from '@/api/user'
import { ActionTypes as UserActionTypes } from '@/store/modules/user/types'
import { useStore } from '@/store'
export default defineComponent({
  name: 'Login',
  components: {
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  mounted() {
    // console.log(this.$router,8)
  },
  setup(props:any,ctx:any) {
    // const {ctx}:any=getCurrentInstance();
    // console.log(ctx.$router,18)
    const { replace } = useRouter()
    const store = useStore()
    const query = reactive({
      tel: '',
      captcha: '',
      captchaLock: false,
      countdown: 60,
    })
    const sendSms = () => {
      // console.log(!/^[1][3,4,5,7,8][0-9]{9}$/.test(query.tel))
      //倒计时阶段不进行重复发送验证码
      if (query.captchaLock) {
        return
      } else {
        //手机号校验
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(query.tel)) {
          Toast('请输入正确的手机号码～')
          // console.log(212)
          return
        }
        query.captchaLock = true
      }
      //调用接口发送验证码
      sendSmsCode({ mobile: query.tel })
        .then((res: any) => {
          // console.log(res, 121)
          let st: any
          if (res.data.code == 0) {
            Toast('验证码发送成功')
            //开始倒计时
            setInterval(() => {
              if (query.countdown > 0) {
                query.countdown--
              } else {
                //倒计时结束重置验证码状态
                query.captchaLock = false
                query.countdown = 60
                window.clearInterval(st)
              }
            }, 1000)
          } else {
            //重置验证码状态
            query.captchaLock = false
            query.countdown = 60
            window.clearInterval(st)
          }
        })
        .catch(() => {
          //重置验证码状态
          query.captchaLock = false
        })
    }
    // console.log(store.dispatch, 90)
    //登录按钮提交
    const submit = async () => {
      if (!query.tel) {
        Toast('手机号不能为空～')
        return
      }
      if (!query.captcha) {
        Toast('验证码不能为空～')
        return
      }
      //调用接口发送验证码
      const data = await store.dispatch(UserActionTypes.LOGIN, {
        mobile: query.tel,
        verificationCode: query.captcha,
      })
      // console.log(data, 6789)
      if (!!data) {
        Toast('登录成功～')
        replace({
          path: '/check',
        })
      }
    }
    return {
      query,
      sendSms,
      submit,
    }
  },
})
</script>

<style lang="less" scoped>
@import './login.less';
</style>
