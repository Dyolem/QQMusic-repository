import { defineStore } from "pinia";
import axios from 'axios'
export const useLoginStatus=defineStore('loginStatus',{
    state: () => ({
            
        data: null,
        loading: false,
        error: null,
        isLogin:false,
        loginStatus:false,
        errorMessage:null,
        successMessage:null,
        code:null,
        promptMSg:'',
        phoneNumber:null,
        phonenumVertifyStep:1,

        portrait:''

      
    }),
      actions: {
        async fetchUserInfo() {
          this.loading = true
              try {
                const response = await axios.get('/QQMusic/user/detail?id=2140584077');
                console.log(response);
                this.portrait=response.data.data.creator.headpic
                console.log(this.portrait);

              } catch (error) {
                console.error(error);
              }
              
          console.log('success');
        },
        async  emailLogin(email,password){
          
          console.log(email,password);
          try {
            const response = await axios.get(`/proxy/login?email=${email}&password=${password}`);
            
            console.log(response);
            this.code= response.data.code
            if(this.code==502)
            {
                this.errorMessage=response.data.msg
                console.log(this.errorMessage);
            }
            else
            {
              this.successMessage='验证成功'
              
              setTimeout(async ()=>{
                this.successMessage=null
                this.isLogin=false
                await  this.setQQcookie()
                await  this.fetchUserInfo()
                this.loginStatus=true
              },1500)
            }

            
      
  
          } catch (error) {
            console.error(error);
          }
        },
        // async  phoneLogin(phonenum,password){
        //   this.phoneNumber=phonenum
        //   console.log(this.phoneNumber);
        //   try {
        //     const response = await axios.get(`/proxy/login/cellphone?phone=15883379137&password=123456789YSm`);
            
        //     console.log(response);
        //     this.code= response.data.code
        //     if(this.code==-462)
        //     {
        //         this.successMessage=response.data.data.blockText
        //         setTimeout(()=>{
        //           this.successMessage=null
        //           this.phonenumVertifyStep=2
        //         },1000)
        //     }
  
        //   } catch (error) {
        //     console.error(error);
        //   }
        // },
        async getVertificationCode (phoneNumber){
          
          try {
            const response = await axios.get(`/proxy/captcha/sent?phone=${phoneNumber}`);
            
            console.log(response);
            
            if(response.data.code==200)
            {
                this.code=response.data.code
            }
            else if(response.data.code==400)
            {
              this.errorMessage=response.data.message
            }
  
          } catch (error) {
            console.error(error);
          }
        },
        async vertifyingCode (vertificationCode){
          console.log(this.phoneNumber);
          try{
            const response = await axios.get(`/proxy/captcha/verify?phone=${this.phoneNumber}&captcha=${vertificationCode}`);
            console.log(response);
            if(response.data.code==503)
            {
              this.errorMessage=response.data.message
            }
            else {
              this.successMessage='验证成功'
              setTimeout(()=>{
                this.successMessage=null
                this.isLogin=false
              },1500)
            }

          } catch(error) {
            console.error(error);
          }
        },
        async setQQcookie() {
          try{
            // 记得更新cookie
            const response =await axios.post('/QQMusic/user/setCookie', {
              data: 'pgv_pvid=3083631504; fqm_pvqid=063ea08d-ea1e-4ab1-bef9-a54e2ff8a288; fqm_sessionid=07fa3aab-d052-4988-ac67-1c0aa58c48b2; pgv_info=ssid=s3260346524; _qpsvr_localtk=0.18638513672071433; RK=0kOdaeRtSh; ptcz=6650bf8f2c88ebc043a3ff6da17afef22d622202793de134c0544e8e0f6c2d55; login_type=1; uin=2140584077; psrf_musickey_createtime=1687089058; psrf_qqaccess_token=69DBE4C2715DBB663BF9FEB713094DC8; qm_keyst=Q_H_L_58K7U8KDfPCK3xNEaRFgya9GgvbFK-c0qlskCfDnu055g1tH691lFoA; euin=ow6Poe4F7enl7z**; wxrefresh_token=; wxopenid=; qqmusic_key=Q_H_L_58K7U8KDfPCK3xNEaRFgya9GgvbFK-c0qlskCfDnu055g1tH691lFoA; psrf_qqopenid=50228F0DA79CBCFC7AC8A6FC376A0FDD; tmeLoginType=2; psrf_qqunionid=5F664BC4376F512C177D6A11A7758C10; wxunionid=; psrf_qqrefresh_token=7059B2D44FFB76F39D50384250EE64B2; psrf_access_token_expiresAt=1694865058'
            },{
              headers:{
                'Content-Type': 'application/json'
              }
            })
            // 光上传cookie还不行，需要再调用下面这个接口，把cookie存在浏览器里
            const res=  await axios.get('/QQMusic/user/getCookie?id=2140584077')
            console.log(response);
          } catch(error) {
            console.error(error);
          }
        }
      },
    
})