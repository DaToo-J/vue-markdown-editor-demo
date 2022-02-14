[toc]

# 使用 `markdown-it-vue` 实现 markdown 渲染

1. 引入依赖：
   ```
   import MarkdownItVue from 'markdown-it-vue'
   import 'markdown-it-vue/dist/markdown-it-vue.css'
   ```
2. 设置组件：
   ```
    <markdown-it-vue class="md-body" ref="markdown" :content="content" :options="options" />

   ```
3. 本地图片渲染：需要在 `options` 里面设置，只能是相对路径。（ps：试过绝对路径没成功，有实现过的同学欢迎留言交流👏）
    ```
    options: {
     image: {    // 设置这个才能显示本地图片，但根路径是这个前端工程的 public 文件夹
       hAlign: 'left',
       viewer: true
     }
   }
    ```
4. 导入本地 markdown 文件时报错：`You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.`
   1. 下载依赖：`npm i raw-loader --save`
   2. 在 `vue.config.js` 中添加：
      ```
       module.exports = {
        configureWebpack: {
         module: {
           rules: [
             {
               test: /\.md$/i,
               loader: "raw-loader",
             },
           ],
         },
        },
       };
      ```
   3. 参考：[How to Import Markdown Files in Vue CLI ](https://dev.to/praveenpuglia/how-to-import-markdown-files-in-vue-cli-typescript-projects-12ca)

# 使用 `mavon-editor` 实现 markdown 编辑和渲染

1. 下载依赖：`npm install mavon-editor --save`
2. 注册组件：
   ```
    import mavonEditor from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
   ```
3. 设置组件：
   ```
    <mavon-editor v-model="editorText" class="md-editor" v-else ref="editor" @imgAdd="$imgAdd"/>
   ```
4. 设置图片上传的处理函数
   ```
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
   ```