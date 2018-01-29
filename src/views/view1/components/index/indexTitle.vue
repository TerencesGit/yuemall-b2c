<template>
	<div class="index-title">
    <h2>{{title}}</h2>
    <h4 class="uppercase">{{EnTitle}}</h4>
    <p class="line"></p>
  </div>
</template>
<script>
	export default {
		name: 'indexTitle',
		props: ['title', 'EnTitle'],
	}
</script>
<style scoped lang="scss">
	.index-title {
    position: relative;
    text-align: center;
    color: #19A9E8;
    border-bottom: 1px solid #f0f0f0;
    h2 {
      margin-top: 30px;
      font-size: 32px;
      font-weight: normal;
    }
    h4 {
      margin: 10px 0 15px;
      font-size: 12px;
      font-weight: normal;
    }
    .line {
      position: absolute;
      bottom: -2px;
      left: 50%;
      margin-left: -40px;
      width: 80px;
      height: 4px;
      background-color: #19A9E8;
    }
  }
</style>