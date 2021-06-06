<template>
  <div class="dashboard-main">
    <div class="dashboard-container">剑光如我，斩尽芜杂</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-main {
    min-height: calc(100vh - 50px);
    background-image: url("../../assets/bg_images/keqin.jpg");
    background-size: cover;
  }
}

.dashboard {
  &-container {
    margin: 30px;
    font-size: 50px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }
}
</style>
