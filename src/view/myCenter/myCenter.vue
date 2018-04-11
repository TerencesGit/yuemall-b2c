<template>
	<section>
		<div v-title :data-title="this.$route.name"></div>
   <div class="my-container">
    	<el-menu default-active="1" class="my-aside">
        <router-link to="/myCenter/myCenter1">
		      <el-menu-item index="1" >
		        <i class="el-icon-edit-outline"></i>
		        <span slot="title">我的账户</span>
		      </el-menu-item>
        </router-link>
          <router-link to="/myCenter/myCenter2">
		      	<el-menu-item index="2">
			        <i class="el-icon-menu"></i>
			        <span slot="title">我的订单</span>
		        </el-menu-item>
		      </router-link>     
	      	<router-link to="/myCenter/myCenter3">
			      <el-menu-item index="3">
			        	<i class="el-icon-sold-out"></i>
			        	<span slot="title">我的收藏</span>
			      </el-menu-item>
	        </router-link>
	        <router-link to="/myCenter/myCenter4">
		        <el-menu-item index="4">
			        	<i class="el-icon-document"></i>
			        	<span slot="title">我的消息</span>
			      </el-menu-item>
	        </router-link>
	      	<router-link to="/myCenter/myCenter5">
			      <el-menu-item index="5">
				        <i class="el-icon-setting"></i>
				        <span slot="title">账户设置</span>
			      </el-menu-item>
	        </router-link>
    </el-menu>
    <div class="my-section">
      <router-view></router-view>
    </div>
   </div>
	</section>
</template>
 
<script>
   export default {
    data() {
      return {
      }},
    methods: {
     
    },
    created:function(){
       this.$router.push('/myCenter/myCenter1');
    }
  }
</script>

<style lang="scss" scoped>
   .my-container {
   	  width:1200px;
   	  margin:40px auto 0;
   	  .my-aside{
         width:150px;
         background:#fefefe;
         border:1px solid #ddd;
         float:left;
         .el-menu-item.is-active{
         	background:#F56C6C;
         	color:#fff;
         }
   	  }
   	  .my-section{
         float:left;
         margin-left:20px;
   	  }

    }
</style>