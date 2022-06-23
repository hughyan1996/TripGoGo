<template>
  <router-view></router-view>
</template>

<script>
export default {
  created () {
    this.$store.state.myLove = JSON.parse(localStorage.getItem('myLove')) || [];
  }
}
</script>

<style lang="scss">
</style>
