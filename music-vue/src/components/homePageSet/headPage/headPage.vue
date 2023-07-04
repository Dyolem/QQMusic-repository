
<template>
   <playlist-recommendation :renderCount="songlistStore.listlength/5" :resetIndex="initIndex">
        <template #reccomend-head>    
            <h2>歌单推荐</h2>    
        </template>
        <template #song-classification>
            <recommendation-title @passWheelIndex="passWheelIndex"></recommendation-title>
        </template>
        <template #wheel-container="slotProps">
            <wheel-container :travelDistance="slotProps.passTravelDistance"></wheel-container>
        </template>
   </playlist-recommendation>
   <playlist-recommendation :renderCount="newSongListsLength" :resetIndex="initIndex">
        <template #reccomend-head>    
            <h2>新歌首发</h2>    
        </template>
        <template #song-classification>
            <newsong-categories @passNewSongListsLength="passNewSongListsLength"></newsong-categories>
        </template>
        <template #wheel-container="slotProps">
            <wheelplay-new-song :travelDistance="slotProps.passTravelDistance" :renderCount="newSongListsLength"></wheelplay-new-song>
        </template>
   </playlist-recommendation>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import playlistRecommendation from '../../recommendation/playlistRecommendation.vue';
import wheelContainer from '../../recommendation/wheelContainer.vue';
import recommendationTitle from '../../recommendation/recommendationTitle.vue'

import newsongCategories from './newsongCategories.vue';
import wheelplayNewSong from './wheelplayNewSong.vue'
import { userSonglistCategoryStore } from '../../../store/songlistCategory';
import { userSonglistStore } from '../../../store/songlist';
import { useHomePageRecommendationStore } from '../../../store/homePageRecommendation';

    const songlistCategoryStore=userSonglistCategoryStore()
    const songlistStore=userSonglistStore()
    const homePageRecommendationStore=useHomePageRecommendationStore()
    


const newSongListsLength=ref(0)

function passNewSongListsLength (length) {
    newSongListsLength.value=Math.ceil(length/9)
}

        //    下面是数据请求开始
//    第一种监听请求方法，使用watch
//     songlistCategoryStore.fetchSongListCategoriesData()
//     watch(() => songlistCategoryStore.categoryIds, (newVal, oldVal) => {
//      console.log('categoryIds changed from', oldVal, 'to', newVal)
//    songlistStore.fetchSongListData()
//    })
// 第二种如下
const fetchAndWatchData = async () => {
    localStorage.removeItem('categoryParam')
    await songlistCategoryStore.fetchSongListCategoriesData();

      // 等待第一个请求完成后，再执行第二个请求
    await songlistStore.fetchSongListData();
    };

    onMounted(() => {
    
      fetchAndWatchData();
    
    });

// 重置轮播索引的部分代码
const initIndex=ref(null)
function passWheelIndex (idx) {
    initIndex.value=idx
    console.log(initIndex.value);
}
</script>

<style scoped>

</style>