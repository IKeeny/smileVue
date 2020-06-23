<template>
    <div>
       <van-nav-bar
          title="用户登录"
          left-text="返回"
          left-arrow=""
          @click-left="goBack"
       />
       <div class="login-panel">
          <van-field
            v-model="username"
            required
            clearable
            label="用户名"
            placeholder="请输入用户名"
            :error-message='usernameErrorMsg'
          />
          <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
            :error-message='passwordErrorMsg'
          />
          <div class="login-button">
             <van-button type="primary" size="large" @click="loginAction" :loading='openLoading'>登录</van-button> 
          </div>
       </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config'
    import { Toast } from 'vant'
    export default {
        data(){
            return{
                username:'',
                password:'',
                openLoading: false,  //是否开启用户登录的Loading状态
                usernameErrorMsg:'',  //当用户登录用户名出现错误时的提示信息
                passwordErrorMsg:'',  //当用户登录密码出现错误时的提示信息
           }
        },
        created(){
            //一创建时判断本地存储中是否已经登录过了
            if(localStorage.userInfo){
                Toast.success('您已经登录过了')
                this.$router.push('/')
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            },
            loginAction(){
                //让代码更精简清晰
                this.checkForm() && this.axiosLoginUser()
            },
            axiosLoginUser(){
                this.openLoading = true;
                axios({
                    url: url.login,
                    method: 'post',
                    data:{
                        username: this.username,
                        password: this.password
                    }
                })
                .then(response=>{
                    // console.log(response)
                    if(response.data.code == 200 && response.data.message){
                        new Promise((resolve,reject)=>{
                            //本地存储
                            localStorage.userInfo = {username:this.username}
                            setTimeout(() => {
                                resolve()
                            }, 500);
                        }).then(()=>{
                            Toast.success('登录成功')
                            this.$router.push('/')
                        }).catch(err=>{
                            Toast.fail('登录状态保存失败')
                            console.log(err)
                        })
                    }else{
                        Toast.fail('登录失败')
                        this.openLoading = false
                    }
                })
                .catch((error)=>{
                    // console.log(error)
                    Toast.fail('登录失败')
                    this.openLoading = false
                })
            },
            //****表单验证方法****
            checkForm(){
                let isOk = true
                if(this.username.length<5){
                    this.usernameErrorMsg = '用户名不能少于5位'
                    isOk = false
                }else{
                    this.usernameErrorMsg = ''
                }

                if(this.password.length<6){
                    this.passwordErrorMsg = '密码不能少于6位'
                    isOk = false
                }else{
                    this.passwordErrorMsg = '' 
                }
                return isOk
            }
        }
    }
</script>

<style lang="css" scoped>
.login-panel{
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 80px;
}
.login-button{
    padding-top: 10px;
}
</style>