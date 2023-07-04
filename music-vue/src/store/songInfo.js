import { defineStore } from "pinia";
import axios from 'axios'
import { useGetImageUrlStore } from "./getImageUrl";
export const useSongInfoStore=defineStore('songInfoStore',{
    state:()=>({
        data: null,
        loading: true,
        error: null,
        info:null,
        trackInfo:null,
        
        imgUrl:''
    }),
    actions: {
        async fetchSongInfo(infoMid) {
            console.log(infoMid);
            this.loading=true
                try {
                    const response = await axios.get(`/api/getSongInfo?songmid=${infoMid}`);
                    console.log(response);
                    this.info=response.data.response.songinfo.data.info
                    console.log(this.info);
                    this.trackInfo=response.data.response.songinfo.data.track_info
                    
                    const res= await axios.get(`/api/getImageUrl?id=${this.trackInfo.album.mid}`)
                    this.imgUrl=res.data.response.data.imageUrl
                    this.loading = false
                } catch (error) {
                    console.error(error);
            }
              
        },

    },
})