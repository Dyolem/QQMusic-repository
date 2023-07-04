

<script setup>

import playlistItem from '../../playlistItem.vue';
import playlistRecommendation from '../../recommendation/playlistRecommendation.vue';
import wheelCatogories from './wheelCatogories.vue';

import { userSonglistStore } from '../../../store/songlist';
import { userSonglistCategoryStore } from '../../../store/songlistCategory';
import { ref } from 'vue';

const songlistStore=userSonglistStore()
const songlistCategoryStore = userSonglistCategoryStore()
const title=ref('')

    if(localStorage.getItem('categoryParam'))
    title.value=JSON.parse(localStorage.getItem('categoryParam'))[1]
    

function passKindTitle (data){
    
    title.value=data
}
function clearCurrentKind () {
    songlistStore.fetchSongListData(10000000)
    title.value=''
    
}

</script>

<template>
    
        
            <playlist-recommendation :renderCount="Math.ceil(songlistCategoryStore.categoriesLength/4)">
                <template #wheel-container="slotProps">
                    <wheel-catogories :travelDistance="slotProps.passTravelDistance" @pass-kind-title="passKindTitle"></wheel-catogories>
                </template>
            </playlist-recommendation>  
            
        <div class="classified-container">
            <h2 class="recommendation" v-if="title===''?true:false">推荐歌单</h2>
            <div class="kindTitle" v-if="title===''?false:true">
                <p>{{ title }}</p>
                <span class="clear-current-kind iconfont icon-chacha" @click="clearCurrentKind"></span>
            </div>
            <div class="playlists-container">
                <div class="playlist-item-occupation" v-for="(items,index) in songlistStore.passData" :key="items.id">
                    <!-- 循环渲染时记得加上：key，给每个循环项添加key，不然有报错 -->
                    <playlistItem :renderSrc="items" :listid="items.dissid" class="playlist-item">
                        <template #creator="slotProps">
                            <div class="creator"><router-link to="">{{ slotProps.creator }}</router-link></div>
                        </template>
                    </playlistItem>
                </div>
            </div>
        </div>
       
        
    
</template>

<style scoped>

.classified-container {
    margin: 0 auto;
    /* 宽度由来：5*（240+25） */
    width: 1325px;
    flex-wrap: wrap;
    background-color: rgba(rgb(193, 215, 199), 1);
}
.recommendation {
    margin-bottom: 20px;
}

.playlists-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    /* background-color: lightblue; */
}
.kindTitle {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
    width: 100px;
    height: 40px;
    /* background-color: aquamarine; */
    border: 1px solid lightgray;
    border-radius: 3px;
}
.kindTitle:hover {
    background-color: #31c27c;
    color: #fff;
}
.clear-current-kind:hover {
    
    cursor: pointer;
    border-radius: 50%;
    background-color:rgba(193, 215, 199, 0.5);
    

    

  
}
.playlist-item {
    margin-bottom: 50px;
}
.creator a {
    color: #999999;
    
}
</style>