<template>
  <div class="container">
    <div class="main">
      <div class="MenuBox">
        <menuside></menuside>
      </div>
      <div class="DeatilBox">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
  </div>
</template>

<script>
import menuside from "./Menu";
export default {
  components: {
    menuside,
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
  .main {
    background: #fff;
    display: flex;
    .MenuBox {
      width: 232px;
      height: 100%;
      border-right: 2px solid #f3f4f8;
    }
    .DeatilBox {
      width: 1400px;
      height: 100px;
    }
  }
}
</style>