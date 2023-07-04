
import { defineStore } from "pinia";
import { userSonglistCategoryStore } from "./songlistCategory";
import axios from 'axios'


export const userSonglistStore=defineStore('songlist',{
    state:()=>({
        data: null,
        loading: false,
        error: null,
        categoryIdParam:null,
        passData:null,
        listlength:null
    }),
    //如果这个请求需要用到上一个请求的数据，那必须用watch监听上一个请求的数据是否请求到了，即数据变化更新了，
    //这样做是因为请求是异步的。除了用watch，也可以在组件调用action处下手，请求到了数据，就给个标志，下一个action
    //调用必须有这个标志，这样也可以做到等待，但是不如watch
    actions: {
        async fetchSongListData(clickId) {
          console.log(clickId);
          
            const songlistCategory=userSonglistCategoryStore()
            this.categoryIdParam=songlistCategory.categoryIds
            if(clickId)
            {
              this.categoryIdParam=clickId
              console.log(this.categoryIdParam);
            }
            this.loading = true
                try {
                  const response = await axios.get(`/api/getSongLists?categoryId=${this.categoryIdParam}&limit=25`);
                  
                  console.log(response);
                  this.passData=response.data.response.data.list
                  
                  this.listlength=this.passData.length
                  console.log(this.listlength);
                } catch (error) {
                  console.error(error);
                }
             
          console.log('success');
        },
      
      },
      
})