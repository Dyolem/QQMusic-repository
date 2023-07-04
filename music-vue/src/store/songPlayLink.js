import { defineStore } from "pinia";
import axios from 'axios'


export const userSongPlayLink = defineStore("songPlayLink", {
  state: () => ({
    mid:'',
    songName:'',
    singerName:'',
    src:'',       // 音频源
    songCover:'',
    playFlag:false, //歌曲是否正在播放
    audio:null,   //存储歌曲实例
    playIndex:0,  //当前正在播放歌曲的次序.为什么设置为0而不是null？答：由于播放列表一挂载就会播放第一首歌，
                  // songplay的播放状态图标必须为播放状态，而为了各个渲染项图标独立，也就是不要同时为一种图标，选择的是index===playIndex判断
                  // 点击其他渲染项都可以很好的判断，因为playsong会传递index，但是刚挂载由于没有点击操作，且播放的是列表第一首歌，
                  // 就必须让playIndex有个初始值0
    currentTime:0,
    duration:0,
    ended:false
  }),
  getters:{
    // 为了避免重复代码，这里写了一个格式化数据的函数，注意使用了闭包，不能直接返回return `${mins}:${secs}`
    formattedData(data){
      return function (seconds) {
        let mins=Math.floor(seconds/60)                                  
        let secs=seconds%60
        if(mins<10)
        mins=`0${mins}`
        if(secs<10)
        secs=`0${secs}`
        return `${mins}:${secs}`
      }
      
    },
    formattedCurrentTime(){
      return this.formattedData(Math.floor(this.currentTime))
      // let mins=Math.floor(this.currentTime/60)
      // let secs=this.currentTime%60
      // if(mins<10)
      // mins=`0${mins}`
      // if(secs<10)
      // secs=`0${secs}`
      // return `${mins}:${secs}`
      
    },
    formattedDuration(){
      return this.formattedData(this.duration)
      // let mins=Math.floor(this.duration/60)
      // let secs=this.duration%60
      // if(mins<10)
      // mins=`0${mins}`
      // if(secs<10)
      // secs=`0${secs}`
      // return `${mins}:${secs}`
    }
  },
  actions:{
   
   async fetchSongPlayLink (idx){
    // 从浏览器获取已存储歌曲的所有信息
    const storedata=JSON.parse(localStorage.getItem("toBePlayedSongs"))
    this.mid=storedata[idx].mid
    this.songName=storedata[idx].songname
    this.singerName=storedata[idx].singername
    
    // console.log(storedata[idx].mid);
   
        try {
            const response = await axios.get(`/api/getMusicPlay?songmid=${storedata[idx].mid}`,)
            // console.log(response.data);
            // console.log(response.data.data.playUrl[storedata[idx].mid].url);
            this.src=response.data.data.playUrl[storedata[idx].mid].url
            if(this.src==''){
              alert('当前歌曲暂无音源')
            }

            
            this.audio=new Audio(this.src)
            // 音频加载需要时间，不能刚new完就马上执行获取duration代码
            this.audio.addEventListener('loadedmetadata',()=>{
              this.duration=Math.floor(this.audio.duration) 
              // console.log(this.audio.duration);
            })
            // // 监听歌曲是否播放完毕
            this.audio.addEventListener('ended',()=>{
              this.ended=true
            })
            //由于this.audio.currentTime是音频对象的原生属性，它不是响应式数据，因此即使它是不断更新的，
            // 也是不能用watch来监听的，并且即使进行this.currentTime=this.audio.currentTime，this.currentTime也不会随着后者改变而改变
            // 因为后者是原生属性，不是响应式数据，因此要实现不断更新，只能多次进行赋值操作，可以使用事件监听或者定时器，以下是两种方案。
           
            // 方法一
            this.audio.addEventListener('timeupdate',()=>{
              this.currentTime=this.audio.currentTime
              // console.log(this.currentTime);
            })
            // 方法二
             // 根据播放状态来设置一个定时器，每隔一秒获取currentTime，但是这里有个问题，计时器不能暂停，会一直运行可能会浪费性能
            // watch(()=>this.playFlag,(newVal,oldVal)=>{
            //   // console.log('suc');
            //   console.log(this.audio.ended);
            //   const timer=setInterval(()=>{
            //     this.currentTime=this.audio.currentTime
            //   },1000)
            // })
       
    }catch (error) {
        console.error(error);
      }
   
  },
  async fetchSongCover(idx){
    const storedata=JSON.parse(localStorage.getItem("toBePlayedSongs"))
    console.log(storedata[idx].songcover);
    try{
      const responses = await axios.get(`/api/getImageUrl?id=${storedata[idx].songcover}`)
      console.log(responses);
      this.songCover=responses.data.response.data.imageUrl
      console.log(this.songCover);
    }catch(error){
      console.log(error);
    }
  },
  
}



})