/* eslint-disable no-unused-expressions */
``
/**
 * 页面快速生成脚本
 * 用法：npm run tep `文件名`
 */

const fs = require("fs")

const dirName = process.argv[2]
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1)
if (!dirName) {
  console.log("文件夹名称不能为空！")
  console.log("示例：npm run tep test")
  process.exit(0)
}

// 页面模板
const indexTep = `
<template>
  <div id="${capPirName}">
    
  </div>
</template>

<script>
import '@/assets/style/common.less';

export default {
  name: '${capPirName}',
  data () {
    return {}
  },
  created () {},
  methods: {},
  computed: {},
  watch: {},
  props: [ ],
  components: {}
}
</script>

<style lang="less">
#${capPirName} {
  color:#333;
}
</style>
`;

fs.writeFileSync(`./src/views/continu/${dirName}.vue`, indexTep); // 创建对应的文件views components
console.log("文件创建成功")
process.exit(0)
