<template>
  <div class="person-container">
    <div>人物</div>
    <hr id="line"/>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Person",
  inject: ['reload'],
  data() {
    return {
      
    }
  },
  mounted() {
    axios.post("http://localhost:8081/oss/fileoss/imgIdentify").then((response) => {
      console.log(response.data);
  })
  }
}

</script>

<style scoped>

.person-container {
  margin-left: 30px;
  margin-top: 40px;
  font-size: 20px;
}

#line {
  margin-right: 40px;
  
}
</style>
