<script setup>
import { toRefs, ref, watch } from "vue"
import { useHomePageRecommendationStore } from "../../../store/homePageRecommendation"
import {useGetImageUrlStore} from '../../../store/getImageUrl'

const homePageRecommendationStore=useHomePageRecommendationStore()
const getImgUrlStore=useGetImageUrlStore()


// 当homePageRecommendationStore.songlist数据获取到时，立即请求图片链接
watch(()=>homePageRecommendationStore.songlist,(newVal,oldVal)=>{
    
    newVal.forEach(item => {
        getImgUrlStore.fetchImageUrl(item.album.mid)
    });
})
    //遮罩层和图片伸缩功能
    const imgEnlarge=ref([])
    const songMask=ref([])
    // 区别各个封面，不然样式会一起变化
    const activeIndex=ref(null)
    
    

    function showMask(idx){
        activeIndex.value=idx
        imgEnlarge.value[idx].style.transform='scale(1.1)'
        songMask.value[idx].style.background='rgba(0,0,0,0.2)'
      
    }
    function hideMask(idx){
        activeIndex.value=idx
        imgEnlarge.value[idx].style.transform='scale(1)'
        songMask.value[idx].style.background='rgba(0,0,0,0)'
    }

const props=defineProps({
    renderCount:{
        type:Number
    },
    travelDistance:{
        type:Number
    }
})

const newsongWheelRef=ref(null)
const { travelDistance } = toRefs(props)
    watch([travelDistance], ([newValue, oldValue]) => {
        newsongWheelRef.value.style.transform = `translateX(-${newValue * 1300}px)`
        console.log(newValue);
    })


const formattedTime=(seconds)=>{
    let mins=Math.floor(seconds/60)                                  
        let secs=seconds%60
        if(mins<10)
        mins=`0${mins}`
        if(secs<10)
        secs=`0${secs}`
        return `${mins}:${secs}`
}
</script>

<template>
    <div class="newsong-container">
        <div class="newsong-wheel" ref="newsongWheelRef">
            <div class="unit" v-for="(broaIitem,broadIndex) in renderCount" :key="broadIndex">
                <div class="newsong-item" v-for="(item,index) in homePageRecommendationStore.songlist.slice(broadIndex*9,(broadIndex+1)*9)" :key="index">
                    <div class="song-info">
                        <div class="playlist-item" @mouseover="showMask(broadIndex*9+index)" @mouseleave="hideMask(broadIndex*9+index)">
                            <div class="song-cover">
                            
                                <img :src="getImgUrlStore.imgUrlArr[broadIndex*9+index]"
                                     alt="" ref="imgEnlarge">  
                                            
                            </div>
                            <!-- 遮罩层 -->
                            <div class="song-mask" ref="songMask"><router-link to="" @click="songsStore.fetchSongData(songIndex)"></router-link>
                                <div class="play-button" :class="{'mask-active': activeIndex===broadIndex*9+index }" @click="jumpToBeplay">
                                <span class="iconfont icon-triangle-play"></span>
                                </div>
                            </div>     
                        </div>
                        <div class="info">
                            <h4 class="song-name"><router-link to=""> {{ item.title }}</router-link></h4>
                            <p class="singers-box">
                                <router-link to="" class="singer" v-for="(i,idx) in item.singer" :key="idx">{{ i.title }}
                                    <span v-if="item.singer.length>1 && idx!==item.singer.length-1 ?true:false">/</span>
                                </router-link>
                                
                            </p>
                            
                        </div>
                        <div class="song-time">{{formattedTime(item.interval)}}</div>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
</template>

<style scoped>
.newsong-container {
    overflow: hidden;
    position: relative;
    display: flex;
    height: 360px;

    /* background-color: bisque; */
}
.newsong-wheel {
    position: absolute;
    display: flex;
    transition: all 0.5s linear;
   
}
.unit {
    /* margin-right: 20px; */
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 1300px;
    /* background-color: black; */
}
.newsong-item {
    display: flex;
    align-items: center;
    width: 420px;
    
    height: 120px;
    /* background-color: aquamarine; */
    border-bottom: 1px solid #f2f2f2;
}
.song-info {
    display: flex;
    
    width: 100%;
    height: 90px;
    /* background-color: pink; */
}
.playlist-item {
        position: relative;
        font-size: 15px;
        width: 90px;
        height: 90px;
        margin-right: 25px;
    }
    
     .play-button {
        display: flex;
        justify-content: center;
       
        width: 30px;
        height: 30px;
        line-height: 30px;
        background-color: #f2f2f2;
        opacity: 0;
        border-radius: 15px;
       
        transition: all 0.4s ease-out;
     }
     .play-button span {
        font-size: 14px;
        color: #545454;
        transform: translateX(3px);
     }
    
    .song-cover {
        overflow: hidden;
        
        margin-bottom: 15px;
        width: 90px;
        height: 90px;
        
        /* background-color: gold; */
    }
    .song-cover img {
        width: 100%;
        height: 100%;
        transform: scale(1);
        transition: all 0.4s ease-out;
    }
    .song-mask {
        display: flex;
       position: absolute;
       top: 0;
        justify-content: center;
        align-items: center;
        margin-bottom: 15px;
        width: 90px;
        height: 90px;
        
        background-color: rgba(0, 0, 0 ,0);   
    }
    /* 点击图片也能跳转至歌单详情界面 */
    .song-mask a {
        position: absolute;
        width: 90px;
        height: 90px;
    }
    .mask-active {
        opacity: 1;
        transform: scale(1.5);
     }
     .info {
        /* display: flex; */
        /* flex-wrap: wrap; */
        padding-top: 20px;
        width: calc(100% - 200px);
        /* height: 100%; */
        /* background-color: lightblue; */
     }
     .song-name {
        font-weight: normal;
        width: 100%;
        /* 以下三行代码控制文本内容溢出 */
        overflow: hidden;
        white-space: nowrap;
        /* 不换行 */
        text-overflow: ellipsis;
        /* 溢出内容省略号表示 */
     }
     .singers-box {
       
        width: 100%;
        /* 以下三行代码控制文本内容溢出 */
        overflow: hidden;
        white-space: nowrap;
    /* 不换行 */
        text-overflow: ellipsis;
    /* 溢出内容省略号表示 */
        
        
     }
     .singer {
        color: #999999;
     }
     .singer:hover {
        color: #31c27c;
     }
     .song-time {
        margin-left: auto;
        text-align: center;
        width: 70px;
        line-height: 90px;
        color: #999999;
        /* background-color: antiquewhite; */
     }
</style>