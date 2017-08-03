<template>
	<div id="layout">
		<!-- <AsideComp></AsideComp>
    <HeaderComp></HeaderComp> -->
    <!-- <keep-alive>
      <MainComp></MainComp>
    </keep-alive> -->
    <Hello></Hello>
	</div>
</template>
<script>
// import AsideComp from './Aside'
// import HeaderComp from './Header'
// import MainComp from './Main'
import Hello from './Hello'
export default {
  name: 'layout',
  components: {
    Hello
  },
  methods: {
  }
}
</script>
