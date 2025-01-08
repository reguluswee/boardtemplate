<template>
  <RouterView />
</template>

<script>
export default {
  name: "App",
  mounted () {
    console.log(this.$route)
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
