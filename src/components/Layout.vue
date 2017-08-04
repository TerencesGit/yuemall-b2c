<template>
	<div id="layout">
    <HeaderComp></HeaderComp>
    <keep-alive>
      <MainComp></MainComp>
    </keep-alive>
	</div>
</template>
<script>
import HeaderComp from './Header'
import MainComp from './Main'
export default {
  name: 'layout',
  components: {
    HeaderComp,
    MainComp
  },
  methods: {
  }
}
</script>
