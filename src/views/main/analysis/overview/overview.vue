<template>
  <div class="overview">
    <myCard class="mb10">
      <template v-slot:header>
        <p class="title">关于</p>
      </template>
      <p class="content">
        Vue3Admin 是基于 Vue3、Vuex、VueRouter、VUE-CLI、 ElementPlus
        、TypeScript、Echart5 等后台系统解决方案。
      </p>
    </myCard>

    <myCard class="mb10">
      <template v-slot:header>
        <p class="title">技术栈</p>
      </template>
      <text-link :textArrs="technologyStacks"></text-link>
      <myDesc
        title="生产环境依赖"
        :column="2"
        :tableDatas="dependencies"
      ></myDesc>

      <myDesc
        title="开发环境依赖"
        :column="2"
        :tableDatas="devDependencies"
      ></myDesc>
    </myCard>

    <myCard class="mb10">
      <template v-slot:header>
        <p class="title">项目结构</p>
      </template>
      <myCode language="bash" :code="projectDir"></myCode>
    </myCard>

    <myCard class="mb10">
      <template v-slot:header>
        <p class="title">项目规范</p>
      </template>
      <myDesc
        title="文件命名规范"
        :column="2"
        :tableDatas="documentNamingStandard"
      ></myDesc>

      <myDesc
        title="编写组件规范"
        :column="1"
        :tableDatas="componentNamingStandard"
      ></myDesc>

      <myDesc
        title="git提交规范"
        :column="2"
        :tableDatas="gitStandard"
      ></myDesc>
    </myCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import myCard from "@/baseUI/myCard";
import myCode from "@/baseUI/myCode";
import textLink from "@/baseUI/text-link";
import {
  technologyStacks,
  dependencies,
  devDependencies,
  projectDir
} from "./config";
import myDesc from "@/baseUI/descriptions";
export default defineComponent({
  name: "overview",
  setup() {
    let documentNamingStandard = [
      { name: "文件夹", description: "统一小写, 多个单词使用-分割" },
      {
        name: "文件(.ts .vue .json .d.ts)",
        description: "统一小写, 多个单词使用-分割"
      }
    ];

    let componentNamingStandard = [
      { name: "组件的文件", description: "统一小写, 多个单词使用-分割" },
      {
        name: "组件的目录结构",
        description:
          "例如 button 组件：button/src/index.vue, 统一在button/index.ts导出"
      },
      {
        name: "组件导包顺序",
        description:
          "导vue技术栈的包 , 导第三方的工具函数 , 导本地的组件, 导本地的工具函数"
      },
      { name: "组件的名称", description: "统一大写开头，驼峰命名" },
      {
        name: "组件属性顺序",
        description: "name, components, props, emits, setup ..."
      },
      {
        name: "template标签",
        description: "小写加 - ( 例如：<case-panel/> )"
      },
      {
        name: "template标签属性顺序",
        description: "v-if , v-for , ref, class, style, ... ,事件"
      },
      {
        name: "组件的props",
        description: "小写开头，驼峰命名，必须编写类型默认值"
      },
      {
        name: "组件的样式",
        description:
          "作用域：scoped, lang = scss / less  ; 类名：统一小写, 多个单词使用-分割"
      }
    ];

    let gitStandard = [
      { name: "add 操作", description: "git add " },
      { name: "commit 操作", description: "git commit " },
      { name: "pull 操作", description: "git pull " },
      { name: "push 操作", description: "git push " }
    ];

    return {
      technologyStacks,
      dependencies,
      devDependencies,
      projectDir,
      documentNamingStandard,
      componentNamingStandard,
      gitStandard
    };
  },
  components: {
    myCard,
    textLink,
    myDesc,
    myCode
  }
});
</script>

<style scoped>
.title {
  text-align: left;
  font-weight: bold;
}
.content {
  text-align: left;
}
.mb10 {
  margin-bottom: 20px;
}
</style>
