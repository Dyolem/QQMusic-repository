<script setup>

import { onMounted, ref, watch } from 'vue';

import { useSongInformationstore} from "./store/songInformation"
import { userSonglistStore } from './store/songlist';
import { userSonglistCategoryStore } from './store/songlistCategory';
import {useLoginStatus} from './store/loginStatus'
import login from './components/login.vue';
const songInformation =useSongInformationstore()

const songlistCategoryStore=userSonglistCategoryStore()
const songlistStore=userSonglistStore()
const loginStatus=useLoginStatus()

watch(()=>loginStatus.isLogin,()=>{
    console.log(loginStatus.isLogin);
})

</script>

<template>
<div>
    <!-- <div class="mid-header mid"><headerNav></headerNav></div>
    <div class="mid-classification mid"><homePageClassificationVue></homePageClassificationVue></div> -->
    <!-- 歌单推荐宽度是和窗口一样，用flex保持居中，所以不用添加mid -->
   
    <router-view></router-view>
    <login v-if="loginStatus.isLogin"></login>
    
    
</div>



</template>


<style scoped>

   
</style>
