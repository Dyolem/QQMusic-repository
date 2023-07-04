import axios from "axios";
import { defineStore } from "pinia";
import { userSongPlayLink } from "./songPlayLink";
               

export const userLyrics= defineStore('lyrics',{
    state:()=>({
        mid:'',
        songLyrics:[],
        title:'',
        artist:'',
        album:'',
        currentLyrics:0,
        scrollTop:0
    }),
    actions:{
        async fetchLyrics(mid){
            this.mid=mid
          // 为了其他组件也能使用这个接口，这里改为只接收歌曲专辑的mid
            // const storedata=JSON.parse(localStorage.getItem("toBePlayedSongs"))
            // const songmid=storedata[idx].mid
            // console.log(songmid);
            try{
              const responses = await axios.get(`/api/getLyric?songmid=${mid}&isFormat=true`)
              console.log(responses);
              this.songLyrics=responses.data.response.lyric.lines
              this.title=responses.data.response.lyric.tags.title 
              this.artist=responses.data.response.lyric.tags.artist                      
              this.album=responses.data.response.lyric.tags.album 
              console.log(this.songLyrics);
            }catch(error){
              console.log(error);
            }
          }
    }
})
