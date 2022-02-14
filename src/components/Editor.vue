<template>
  <div class="container">
    <Button class="btn" type='circle' @click="viewMode = !viewMode"> 
      <Tooltip content="切换" trigger="hover" placement="left" transfer>
        <Icon type="ios-color-filter-outline"></Icon>
      </Tooltip>
    </Button>

    <Split v-model="split1" v-if="viewMode" min="210px">
      <div slot="left" class="divL">
        <textarea v-model="content" class="md-text" ref="mdText" />
      </div>
      <div slot="right" class="divR">
        <markdown-it-vue class="md-body" ref="markdown" :content="content" :options="options" />
      </div>
    </Split>

    <mavon-editor v-model="editorText" class="md-editor" v-else ref="editor" @imgAdd="$imgAdd"/>
  </div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
// import mdText from '../assets/tmp.md'

export default {
  name: 'Editor',
  components: {
    "MarkdownItVue":     MarkdownItVue,
  },
  data () {
    return {
      split1: 0.5,
      editorText: '',
      viewMode: true,
      content: '',
      options: {
        markdownIt: {
          linkify: true
        },
        linkAttributes: {
          attrs: {
            target: '_blank',
            rel: 'noopener'
          }
        },
        githubToc: {
          tocFirstLevel: 1,
        },
        image: {    // 设置这个才能显示本地图片，但跟路径是 public
          hAlign: 'left',
          viewer: true
        }
      }
    }
  },
 async mounted() {
    var filename = 'tmp.md'
    await import('@/assets/'+filename).then(myModule => {
     this.content=  myModule.default;
    });

  },
  methods: {
    $imgAdd(pos, $file){
      var fileSize = $file.size;
      var fileMaxSize = 1024; //1M
      var size = fileSize / 1024;
      var filename = $file.name

      if (size > fileMaxSize) {
        this.$Message.warning({
          content: "文件大小不能大于 1M！",
          duration: 3
        });
        this.$refs.editor.$refs.toolbar_left.$imgDelByFilename(filename)
        return 
      }else if (size <= 0) {
        this.$Message.warning({
          content: "文件大小不能为 0M！",
          duration: 3
        });
        this.$refs.editor.$refs.toolbar_left.$imgDelByFilename(filename)
        return 
      }else{
        var formdata = new FormData();
        formdata.append('image', $file);
        // 将图片上传到服务器
        // saveImgAPI(formdata)
        //   .then((res) => {
        //     var urlStr = res.data.body.url
        //     // 替换图片在 md 中的 url
        //     this.$refs.editor.$img2Url(pos, urlStr);
        //   })
        //   .catch(err => {
        //     console.log('Meeting.vue err')
        //     console.log(err)
        //   })
      }
    },
  }
}
  
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
}

.divL {
  height: 100%;
  overflow: scroll;
}

.divR {
  height: 99%;
  overflow: scroll;
}

.md-body {
  width: 95%;
  height: 98%;
  margin: auto;
  overflow: scroll;
}

.md-text {
  width: 100%;
  height: 100%;
  border-radius:5px;
  padding: 20px;
  border:0;
  resize:none;
  border: 1px solid rgba(228, 232, 236, 0.89);
}

.btn {
  z-index: 1000;
  position: absolute;
  top: calc(50% - 10px);
  right: 30px;
  display: block;
}

.md-editor {
  z-index: 100;
}
</style>
