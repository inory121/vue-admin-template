<template>
  <div class="dashboard-container">
    <el-upload
      class="upload-demo"
      action="http://localhost:8081/oss/fileoss/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :on-success="uploadSuccess"
      multiple
      :on-exceed="handleExceed"
    >
      <el-button size="small" type="primary">点击上传 </el-button>

      <template #tip>
        <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
      </template>
    </el-upload>

    <div class="data-item" v-for="todo in itemList" :key="todo.time">
      <div class="pic_time">{{ renderTime(todo.time)+"  "+todo.subList[0].timeStr}}</div>

      <div
        class="demo-image__preview"
        v-for="pic in todo.subList"
        :key="pic.name"
      >
        <el-image
          style="width: 300px; height: 220px"
          fit="cover"
          :src="pic.name"
          :preview-src-list="srcList"
        >
        </el-image>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Pictures",
  inject: ['reload'],
  data() {
    return {
      srcList: [],
      itemList: [],
    };
  },

  methods: {
    renderTime(date) {
      let dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "")
        .split(" ")[0]
        .replace("-", "年")
        .replace("-", "月")
        .concat("日");
    },

    uploadSuccess(response, file, fileList) {
      console.log(response.data);
      this.srcList.push(response.data.url);
      this.reload();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },

  mounted() {
    // function renderTime(date) {
    //   let dateee = new Date(date).toJSON();
    //   return new Date(+new Date(dateee) + 8 * 3600 * 1000)
    //     .toISOString()
    //     .replace(/T/g, " ")
    //     .replace(/\.[\d]{3}Z/, "")
    //     .split(" ")[0];
    // }

    axios.post("http://localhost:8081/oss/fileoss/getPic").then((response) => {
      console.log(response.data);
      let newArr = [];
      //通过forEach循环数组
      response.data.forEach((item, i) => {
        this.srcList.push(item.name);
        let index = -1;
        //然后在跑到这里筛选 根据不同的时间放置不同的数组    some（）用来查找数组中是否存在某个值  如果存在 就return true
        let isExists = newArr.some((newItem, j) => {
          if (this.renderTime(item.time) === this.renderTime(newItem.time)) {
            index = j;
            return true;
          }
        });
        //代码是先跑这里的if条件判读
        if (!isExists) {
          newArr.push({
            time: item.time,
            subList: [item],
          });
        } else {
          newArr[index].subList.push(item);
        }
        this.itemList = newArr;
      });
      console.log(this.itemList);
    });
  },
};
</script>

<style scoped>
.upload-demo {
  margin: 30px;
}

.pic_time {
  margin-left: 30px;
}

.demo-image__preview {
  display: inline-block;
  margin: 20px 20px 20px 30px;
}
</style>
