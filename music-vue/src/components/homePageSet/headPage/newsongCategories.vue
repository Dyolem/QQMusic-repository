<script setup>
import { ref, watch } from 'vue';
import { useHomePageRecommendationStore } from '../../../store/homePageRecommendation';

const homePageRecommendationStore = useHomePageRecommendationStore()

homePageRecommendationStore.fetchHomePageRecommendation()

const selectedIndex=ref(0)
const getNewSongLists=(lan,idx)=>{
    selectedIndex.value=idx
}

// 将渲染数据传给父组件，父组件再计算该渲染几个轮播小圆点
const emit =defineEmits(['passNewSongListsLength'])
watch(()=>homePageRecommendationStore.songlist,()=>{
    emit('passNewSongListsLength',homePageRecommendationStore.songlist.length)
})

</script>

<template>
    <div class="category-name-container">
        
        <div class="category-name" :class="selectedIndex===index?'selected':''"
            v-for="(item,index) in homePageRecommendationStore.lanlist" @click="getNewSongLists(item.lan,index)">{{ item.lan }}</div>
    </div>
</template>

<style scoped>
.selected {
    color: #31c27c;
}
.category-name-container {
    display: flex;
    justify-content: center;
}
.category-name {
    margin:30px 25px
}
.category-name:hover {
    cursor: pointer;
    color: #31c27c;
}
</style>