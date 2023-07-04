import { defineStore } from "pinia";
import { userSongsStore } from "./songs";
import { userSongPlayLink } from "./songPlayLink";

export const userToBePlayedStore = defineStore("toBePlayedStore", {
  state: () => ({
    time:0,
    // 确保页面刷新后，localstorage里的数据不会消失。使用localstorage是因为窗口不共享状态
    song: JSON.parse(localStorage.getItem("toBePlayedSongs")) || [],
    // bestored:false,  //是否执行了本地储存操作的标志位，playlistitem组件有详细解释
    checked:false
  }),
  getters:{
     
  },
  actions: {
    tobeplay(idx) {
      // 以下是单首歌曲加入待播放歌曲，而song.js里的putAllSong是一个歌单全部加入
      
      const songsStore = userSongsStore();

      const newSong = {
        src: "",
        mid: songsStore.songRender[0].songlist[idx].mid,
        songname: songsStore.songRender[0].songlist[idx].name,
        lasttime:  songsStore.songRender[0].songlist[idx].interval,
        songcover:songsStore.songRender[0].songlist[idx].album.mid,
         
      
        // 可能有多个歌手
        singername: songsStore.songRender[0].songlist[idx].singer,
        mv:songsStore.songRender[0].songlist[idx].mv,
        pay:songsStore.songRender[0].songlist[idx].pay.pay_play
      };

    const pos=this.song.findIndex((song)=>song.mid===newSong.mid)
     
      
      console.log(pos);
      // 如果存在，则删除原歌曲
      if (pos!==-1) {

        console.log("The song is already in the to-be-played list.");
        this.song.splice(pos,1)
      } 
      // 将歌曲添加到列表里，如果是新歌曲，会跳过if，旧歌曲则删了再插入头部
        this.song.unshift(newSong);
        
      // 将待播放列表信息存储在本地存储中
      localStorage.setItem("toBePlayedSongs", JSON.stringify(this.song));
      // this.bestored=true
    
    },
    putAllSongs (){
      const songsStore=userSongsStore()
      // 整个歌单所有歌曲全部加入待播放列表
         // 检查歌曲是否已经存在于待播放列表中
         
       for(let i=0;i<songsStore.songlistLength;i++){
        const newSong = {
          src: "",
          mid: songsStore.songRender[0].songlist[i].mid,
          songname: songsStore.songRender[0].songlist[i].name,
          lasttime: songsStore.songRender[0].songlist[i].interval,
          songcover:songsStore.songRender[0].songlist[i].album.mid,
          // 可能有多个歌手,所以singer是个数组
          singername: songsStore.songRender[0].songlist[i].singer[0].name,
          mv:songsStore.songRender[0].songlist[i].mv,
          pay:songsStore.songRender[0].songlist[i].pay.pay_play
        };
       
        const pos=this.song.findIndex((song)=>song.mid===newSong.mid)

        console.log(pos);
        // 如果存在，则删除原歌曲
        if (pos!==-1) {
  
          console.log("The song is already in the to-be-played list.");
          this.song.splice(pos,1)
        } 
        // 将歌曲添加到列表里，如果是新歌曲，会跳过if，旧歌曲则删了再插入头部
          this.song.unshift(newSong);
        // 将待播放列表信息存储在本地存储中
        localStorage.setItem("toBePlayedSongs", JSON.stringify(this.song));
        
      }
      // this.bestored=true
    },
    deleteLists (){
      this.song=[]
      localStorage.setItem("toBePlayedSongs", JSON.stringify(this.song));
    },
    deleteCurrentSong (idx){
      const songPlayLink=userSongPlayLink()
      this.song.splice(idx,1)
      // console.log(this.song);
      // console.log('suc');
      if(songPlayLink.playIndex>idx)
      songPlayLink.playIndex--
     
      else if(songPlayLink.playIndex==idx)
      {
        // 如果删除的是当前播放歌曲。调用下一首歌曲即可，这里通过改变ended值来触发playControl里的监听
        songPlayLink.audio.pause()
        //因为自身被删除了，又因为删除了默认播放下一首，playIndex会加一，所以需要提前减一来抵消
       
        songPlayLink.playIndex--
         
        songPlayLink.ended=true
        
        
      }
      
      
      // console.log(this.song);
      localStorage.setItem("toBePlayedSongs", JSON.stringify(this.song));
      
      // console.log(localStorage.getItem('toBePlayedSongs'));
      
    }
  }
});

