import { defineStore } from "pinia";
import axios from 'axios'
export const userSonglistCategoryStore=defineStore('songlistCategory',{
    state:()=>({
        data: null,
        loading: false,
        error: null,
        categoryIds:null,
        categories:null,
        categoriesLength:0,
        integratedNameAndId:[],
        integratedNameAndIdLength:0
    }),
    actions: {
        async fetchSongListCategoriesData() {
          this.loading = true
              try {
                const response = await axios.get('/api/getSongListCategories');
                console.log(response);
                this.categoryIds=response.data.response.data.categories[0].items[0].categoryId
                this.categories=response.data.response.data.categories
                this.categoriesLength=this.categories.length
                this.integratedCategoryName()
              } catch (error) {
                console.error(error);
              }
              console.log(this.categoryIds);
              console.log(this.categories);
              console.log(this.categoriesLength);
          console.log('success');
        },
        integratedCategoryName () {
            this.categories.forEach(category => {
                category.items.forEach(item => {
                  this.integratedNameAndId.push(item)
                });
            });
            this.integratedNameAndIdLength=this.integratedNameAndId.length
            console.log(this.integratedNameAndIdLength);
        }
      },
})