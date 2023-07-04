import { defineStore } from "pinia";
import axios from 'axios'
export const useHomePageRecommendationStore=defineStore('homePageRecommendation',{
    state:()=>({
        data: null,
        loading: false,
        error: null,
        newsong:[],
        lanlist:[],
        songlist:[]
        
    }),
    actions: {
        async fetchHomePageRecommendation() {
          this.loading = true
              try {
                const response = await axios.get('/api/getRecommend');
                console.log(response);
                this.newsong=response.data.response.new_song.data
                this.lanlist=response.data.response.new_song.data.lanlist
                this.songlist=response.data.response.new_song.data.songlist
                console.log(this.newsong);

              } catch (error) {
                console.error(error);
              }
              
        },

      },
})