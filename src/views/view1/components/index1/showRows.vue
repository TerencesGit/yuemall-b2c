<template>
	<div class="show-table">
    <ul class="show-row" v-for="(row, index) in showRows" :key="index" :style="{marginBottom: gutter+'px'}">
      <li v-for="(item, index) in row" :key="index" class="show-cell" :style="{marginRight: gutter+'px'}">
        <router-link v-if="item.id" :to="item.isShow ? 'show/detail?destination='+item.url : 'ware/detail?id='+item.id" target="_blank">
          <div class="ware-img">
            <img :src="item[mapping && mapping.imgUrl || 'imgUrl']">
          </div>
          <div class="cell-text">
            <p class="cell-name ellipsis2">{{item[mapping && mapping.name || 'name']}}</p>
            <p class="cell-desc" v-if="item[mapping.desc || 'desc']">{{item[mapping && mapping.desc || 'desc']}}</p>
          </div>
        </router-link>
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
        if(this.showData.length === 0) return showRows;
        let showData = JSON.parse(JSON.stringify(this.showData))
        let col = this.span;
        let rows = Math.ceil(showData.length / col);
        let cover = col - (showData.length % col);
        for(let j = 0; j < cover; j++) {
          showData.push({})
        }
        for(let i = 0; i < rows; i++) {
          let row = showData.filter((d, index) => index >= i * col && index < ((i + 1) * col));
          showRows.push(row)
        }
        return showRows;
			},
		}
	}
</script>
<style scoped lang="scss">
	.show-table {
    min-height: 100px;
    margin: 50px auto 100px;
    .show-row {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      // margin-bottom: 20px;
      .show-cell {
        flex: 1;
        &:last-child {
          margin-right: 0!important;
        }
        .ware-img {
          position: relative;
          &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0);
            transition: all .3s;
          }
        }
        img {
          display: block;
          width: 100%;
        }
        .cell-text {
          .cell-name {
            padding: 5px 2px;
            color: #666;
          }
          .cell-desc {
            padding: 0 2px;
          }
        }
        &:hover {
          .ware-img {
            position: relative;
            &::before {
              background: rgba(0,0,0,.3);
            }
          }
          .cell-name {
            color: #B50713;
          }
        }
      }
    }
  }
</style>