<template>
  <div class="recent-container">
    <div>最近上传</div>
  </div>
</template>

<script>

export default {
  name: "Recent",
  inject: ['reload'],
  data() {
    return {
      
    }
  },
};
</script>

<style scoped>

.recent-container {
  margin-left: 20px;
  margin-top: 40px;
  font-size: 20px;
}
</style>
