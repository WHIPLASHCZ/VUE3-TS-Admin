<template>
    <div class="chat">
        <el-input
            placeholder="输入故事标题"
            v-model="story.title"
            style="margin-bottom:20px"
        ></el-input>
        <div id="div1" ref="contentRef"></div>
        <el-button class="btn" type="primary" @click="sendStory"
            >提交</el-button
        >
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { sendStoryRequest } from "@/network/main/story/story";
import { ElMessage } from "element-plus";
import store from "@/store";
export default defineComponent({
    name: "chat",
    setup() {
        let story = ref({ title: "请输入标题", content: "" });
        let contentRef = ref<InstanceType<typeof HTMLElement>>();
        let editor: any;
        onMounted(() => {
            const E = (window as any).wangEditor;
            editor = new E("#div1");
            console.log(editor);
            editor.config.height = 600;
            editor.create();
            editor.config.onchange = function(html: any) {
                story.value.content = html;
            };
        });

        let sendStory = () => {
            console.log(story.value);
            sendStoryRequest(story.value)
                .then(res => {
                    console.log(res);
                    ElMessage.success({
                        message: res.data,
                        type: "success"
                    });
                    story.value.title = "";
                    story.value.content = "";
                    editor.txt.clear();
                })
                .catch(err => {
                    ElMessage.error({
                        message: err,
                        type: "error"
                    });
                });
        };
        return {
            story,
            contentRef,
            sendStory
        };
    }
});
</script>

<style scoped>
#div1 {
    background-color: #fff;
    text-align: left;
    height: 600px;
}
.btn {
    margin-top: 70px;
    width: 15%;
}
</style>
