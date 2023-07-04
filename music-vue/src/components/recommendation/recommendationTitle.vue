<script setup>
import { ref, watch } from 'vue';
import { userSonglistStore } from '../../store/songlist';
import {userSonglistCategoryStore} from '../../store/songlistCategory'
const songlistStore= userSonglistStore()

const songlistCategoryStore=userSonglistCategoryStore()
const randomNameArr=ref([])
const today=ref(11)

    const date=new Date()
    console.log(date);
    today.value=date.getDate()

function renderKindName(min,max){
    
    console.log(date.getDate());
    console.log(min,max);
    console.log(randomNameArr.value.length);
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomIndex=0
    let lastrandom=0
    while(randomNameArr.value.length<5)
    {
        
        randomIndex=Math.floor(Math.random() * (max - min + 1)) + min
        console.log(randomIndex);
        while(randomIndex==lastrandom){
            lastrandom=randomIndex
            randomIndex=Math.floor(Math.random() * (max - min + 1)) + min
        }
        lastrandom=randomIndex
        console.log(randomIndex);
        console.log(songlistCategoryStore.integratedNameAndId[randomIndex]);
        randomNameArr.value.push( songlistCategoryStore.integratedNameAndId[randomIndex]); //含最大值，含最小值
    }

}




watch(()=>songlistCategoryStore.integratedNameAndIdLength,(newVal,oldVal)=>{
    renderKindName(0,newVal-1)
   
})
    
// 重置轮播索引：传递一个变化的索引，playlistRecommendation组件监听器进行监听
const emit=defineEmits(['passWheelIndex'])
const selectedIndex=ref(-1)
function getSongLists (categoryId,idx) {
    selectedIndex.value=idx
    emit('passWheelIndex',selectedIndex.value)
    console.log('suc');
    songlistStore.fetchSongListData(categoryId)
}

   

</script>

<template>
    <div class="song-classification">
        <div class="titleName" @click="getSongLists(null,-1)" :class="selectedIndex===-1?'selected':''">为你推荐</div>
        <div class="titleName" :class="selectedIndex===index?'selected':''"
            v-for="(item,index) in randomNameArr" @click="getSongLists(item.categoryId,index)">{{ item.categoryName }}</div>
    </div>
</template>

<style scoped>
.titleName:hover {
    cursor: pointer;
    color: #31c27c;
}
.selected {
    color: #31c27c;
}
    .song-classification {
        display: flex;
        justify-content: center;
    }
    .titleName {
        margin:30px 25px
    }
</style>