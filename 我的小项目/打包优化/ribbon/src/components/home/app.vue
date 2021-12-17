<template>
  <div style="width:100%;height:800px">
    <div class="appTitle">{{name}}</div>
    <iframe :src="url" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>
 </div>
</template> 
<script>
export default {
  data(){
    return{
      url:"",
      name:''
    }
  },
  created(){
    this.getUrl()
  },
  methods:{
    getUrl(){
      this.url=this.$route.params.url
      this.name=this.$route.params.name
    }
  }
}
</script>
<style lang="scss" scoped>
.appTitle{
  color: #222;
  font-size: 18px;
  margin-bottom: 10px;
}
</style>