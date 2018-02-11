<template>
	<div class="ware-header" v-bind:style="{background: 'url('+showData.headerBg+') no-repeat center'}">
    <h3>{{showData.title}}</h3>
    <p class="underline"></p>
    <div class="more-button">
      <router-link :to="showData.moreUrl" target="_blank">查看更多>></router-link>
    </div>
  </div>
</template>
<script>
	export default {
		name: 'showHeader',
		props: ['showData'],
	}
</script>
<style scoped lang="scss">
	$color: #19A9E8;
	.ware-header {
    position: relative;
    padding: 5px 0;
    // margin-top: 50px;
    text-align: center;
    color: #19A9E8;
    border-bottom: 1px solid #f0f0f0;
    h3 {
      margin: 30px 0;
      font-size: 32px;
      font-weight: normal;
    }
    .underline {
      position: absolute;
      left: 50%;
      bottom: -1px;
      margin-left: -40px;
      width: 80px;
      height: 3px;
      line-height: 0;
      background: #19A9E8;
    }
    .more-button {
      position: absolute;
      right: 0;
      bottom: 10px;
      padding: 5px 10px;
      border: 1px solid #ccc;
    }
  }
</style>