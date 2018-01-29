<template>
    <div class="dst-row">
      <h3 class="dst-title">{{title}}</h3>
      <ul class="dst-list">
        <li v-for="item in dstList">
          <a href="javascript:;">{{item.name}}</a>
        </li>
      </ul>
    </div>   
</template>

<script>
export default {
    name: 'destinationlist',
    props: ['title', 'dstList'],
    data() {
      return {}
    },
};
</script>

<style lang="scss" scoped>
    $color: #19A9E8;
    .dst-row {
        display: flex;
        .dst-title {
          width: 64px;
          line-height: 30px;
          color: $color;
          font-size: 16px;
          font-weight: normal;
        }
        .dst-list {
          display: flex;
          flex: 1;
          flex-wrap: wrap;
          font-size: 14px;
          li {
            margin-left: 10px;
            margin-bottom: 10px;
            text-align: center;
            a {
              display: block;
              padding: 4px 8px;
              color: #666;
              border: 1px solid #ccc;
              border-radius: 5px;
              &:hover, &.active {
                color: #00a0e9;
                border: 1px solid #00a0e9;
              }
            }
          }
        }
    }
</style>
