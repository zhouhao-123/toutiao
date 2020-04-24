<template>
    <div class="login-container">
        <!-- 导航栏区域 -->
        <van-nav-bar class="page-nav-bar" title="登录" />
        <!-- from表单区域 -->
        <van-form @submit="onSubmit" ref="loginFromRef">
            <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号" :rules="userFromRules.mobile" 
            type="number" maxlength="11">
                <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>
            <van-field v-model="user.code" name="code" placeholder="请输入验证码" :rules="userFromRules.code"
            type="number" maxlength="6">
                <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                <template #button>
                    <!-- 倒计时 -->
                   <van-count-down v-if="isCountDownShow" @finish="isCountDownShow = false" :time="1000 * 60" format="ss s" />
                   <van-button v-else @click="onSendSms" native-type="button" class="send-sms-btn" size="small" type="default">发送验证码</van-button>
                </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { Login,sendSms } from '@/api/user.js'
export default {
    data: function() {
        return {
            // 表单数据
            user: {
                mobile: '13911111111',
                code: '246810'
            },
            // 表单检验规则
            userFromRules: {
                mobile: [{
                    required: true,
                    message: '请输入手机号'
                }, {
                    pattern: /^1[3|5|7|8]\d{9}$/,
                    message: '手机号格式错误'
                }],
                code: [{
                    required: true,
                    message: '请输入验证码'
                }, {
                    pattern: /^\d{6}$/,
                    message: '验证码格式错误'
                }]
            },
            // 控制倒计时的显示与隐藏
            isCountDownShow: false
        }
    },
    methods: {
        // 登录事件函数
        async onSubmit() {
            // 加载loading弹窗(当出现多个loading时，会把之前的覆盖掉)
            this.$toast.loading({
                message: '登录中...',
                forbidClick: true,
                duration: 0  // 持续时间，默认是2000ms,设置为0会一直显示s
            })

            // 请求登录
            try {
                const { data } = await Login(this.user)
                // console.log(data)
                
                // 获取服务器返回值中的token,保存到store中的state上
                // 调用store中的mutation上的setUser函数来修改 store中的state中的数据
                this.$store.commit('setUser', data.data)

                this.$toast.success('登录成功')
            } catch (error) {
                if(error.response.status === 400) {
                    // console.log('手机号或者验证码错误')
                    this.$toast.fail('手机号或者验证码错误')
                }else {
                    // console.log('登录失败,请稍后重试')
                    this.$toast.fail('登录失败,请稍后重试')
                }
            }
        },

        // 发送验证码
        async onSendSms() {
            // 1.验证手机号ref
            try {
                // console.log('12')
                await this.$refs.loginFromRef.validate('mobile')
            } catch (error) {
                // return 终止OnSendSms函数继续往下执行
                return this.$toast.fail(error.message)
            }
            // 2. 通过验证倒计时
            this.isCountDownShow = true
            // 3. 发送请求
            try {
                await sendSms(this.user.mobile)
                this.$toast('发送成功')
            } catch (error) {
                // 发送失败，关闭倒计时
                this.isCountDownShow = false
                if(error.response.status === 429) {
                    this.$toast('发送太频繁，请稍后重试')
                }else {
                    this.$toast('发送太频繁，请稍后重试')
                }
            }
        }
    }
}
</script>

<style lang="less">
.page-nav-bar {
    background-color: #3296fa;
    .van-nav-bar__title {
        color: #ffffff;
    }
}
.toutiao {
    font-size: 37px;
}
.login-container {
    .send-sms-btn {
        width: 152px;
        height: 46px;
        line-height: 46px;
        background-color: #ededed;
        font-size: 22px;
        color: #666666;
        border-radius: 20px;
    }
    .login-btn-wrap {
        padding: 53px 33px;
        .login-btn {
            background-color: #6db4fb;
            border: none;
        }
    }
}
</style>
