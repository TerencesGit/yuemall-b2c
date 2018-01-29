<template>
	<div class="show-table">
    <ul class="show-row" v-for="(row, index) in showRows" :key="index">
      <li v-for="(item, index) in row" :key="index" class="show-cell" :style="{marginRight: gutter+'px'}">
        <a :href="'#/detail?id='+item.id">
          <img :src="item[mapping && mapping.imgUrl || 'imgUrl']">
          <div class="cell-text">
            <p class="cell-name ellipsis2">{{item[mapping && mapping.name || 'name']}}</p>
            <p class="cell-desc" v-if="item[mapping.desc || 'desc']">{{item[mapping && mapping.desc || 'desc']}}</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
	export default {
		name: 'showRows',
		props: ['span', 'gutter', 'showData', 'mapping'],
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
          .cell-name {
            padding: 5px 2px;
          }
          .cell-desc {
            padding: 0 2px;
          }
        }
      }
    }
  }
</style>