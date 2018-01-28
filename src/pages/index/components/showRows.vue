<template>
	<div class="show-table">
    <ul class="show-row" v-for="(row, index) in showRows" :key="index">
      <li v-for="(item, index) in row" :key="index" class="show-cell" :style="{marginRight: gutter+'px'}">
        <img :src="item.mainImg">
        <div class="cell-text">
          <p class="ellipsis2">{{item.wareName}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
	export default {
		name: 'showRows',
		props: ['span', 'gutter', 'showData'],
		computed: {
			showRows() {
				const showRows = [];
				let col = this.span;
        let rows = Math.ceil(this.showData.length / col);
        for(let i = 0; i < rows; i++) {
          let row = this.showData.filter((d, index) => index >= i * col && index < ((i + 1) * col));
          row.length > 0 && showRows.push(row)
        }
        return showRows;
			},
		}
	}
</script>
<style scoped lang="scss">
	.show-table {
    margin: 30px 0;
    .show-row {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      margin-bottom: 10px;
      .show-cell {
        flex: 1;
        &:last-child {
          margin-right: 0!important;
        }
        img {
          display: block;
          width: 100%;
        }
        .cell-text {
          p {
            height: 43px;
            padding: 5px;
          }
        }
      }
    }
  }
</style>