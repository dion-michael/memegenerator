<template>
  <div class="container">
    <div class="container">
      <b-field style="margin-bottom: 20px;">
        <b-input v-model="search" placeholder="Search..." expanded></b-input>
        <p class="control">
          <button class="button is-primary">Search</button>
        </p>
      </b-field>
    </div>
    <div class="columns is-vcentered">
      <div class="column">
        <div id="canvascon">
          <canvas id="canvas" width="300px"></canvas>
        </div>
        <button @click="addText">add text</button>
        <button @click="saveAsPNG">Save</button>
      </div>
    </div>
    <transition name="slide-fade">
      <div v-if="show" class="columns is-multiline">
        <div class="column is-3" v-for="meme in filteredPosts" :key="meme.id">
          <card :meme="meme" @selected="setImg"/>
        </div>
      </div>
    </transition>
    <button @click="show = !show">Hide</button>
  </div>
</template>
<script>
import card from "../components/card.vue";
import axios from "axios";
import { fabric } from "fabric";
import Swal from "sweetalert2";
export default {
  components: {
    card
  },
  data() {
    return {
      show: true,
      memes: [],
      selected: "",
      imgurl: "",
      fabric: "",
      canvas: "",
      search: ""
    };
  },
  methods: {
    getMemes() {
      axios({
        url: "http://localhost:3000/memes",
        method: "GET"
      })
        .then(({ data }) => {
          this.memes = data;
          console.log(this.memes);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addText() {
      var newText = new fabric.IText("hello\nworld", {
        left: 50,
        top: 50,
        fontFamily: "Impact",
        fill: "#FFF",
        stroke: "#000",
        lineHeight: 1.1
      });
      this.canvas.add(newText);
      this.canvas.renderAll();
    },
    setImg(url) {
      // Define the URL where your background image is located
      var image = new Image();
      //   image.crossOrigin = "anonymous";
      image.src = url;
      let scale = 500 * (image.width / image.height);
      image.height = 500;
      image.width = scale;
      //   canva.drawImage(image, 0, 0);

      fabric.Image.fromURL(url, oImg => {
        oImg.scaleToHeight(canvas.height);
        console.log(oImg.width);
        console.log(oImg.height);
        let width = 500 * (image.width / image.height);
        // console.log(this.canvas.width);
        this.canvas.width = width;
        this.canvas.setBackgroundImage(oImg);
        // this.canvas.setToBack(oImg);
        this.canvas.setDimensions({ width, height: 500 });
        // this.renderCanvas(width);
      });
      // canvas.selection = true;
      var iTextSample = new fabric.IText("TEXT 1", {
        left: 50,
        top: 50,
        fontFamily: "Impact",
        fill: "#FFF",
        stroke: "#000",
        lineHeight: 1.1
      });
      var iTextSample2 = new fabric.IText("TEXT 2", {
        left: 50,
        top: 300,
        fontFamily: "Impact",
        fill: "#FFF",
        stroke: "#000",
        lineHeight: 1.1
      });

      this.canvas.add(iTextSample);
      this.canvas.add(iTextSample2);
      // this.canvas.setOverlayImage(oImg, () => {
      //   this.canvas.renderAll();
      // });
      this.canvas.renderAll();
      // this.canvas.setToBack(oImg);
      console.log(this.canvas);
      this.canvas.isDrawingMode = false;
    },
    renderCanvas(width) {
      this.canvas = new fabric.Canvas("canvas", {
        hoverCursor: "pointer",
        width,
        height: 500
      });
    },
    saveAsPNG: function() {
      let meme = document.getElementById("canvas");
      console.log(meme);
      //   this.canvas
      //     .createPNGStream()
      //     .pipe(fs.createWriteStream(__dirname + "/output.png"));
      //   const dataUri = meme.toDataURL();
      //   console.log(dataUri);
      //   let dataUri = meme.toDataURL();
      //   console.log(dataUri);
      this.sendConvertedHtml(meme);
    },
    sendConvertedHtml(meme) {
      console.log(meme, "line 126");
      //   let dataurl = meme.toDataURL();
      //   console.log(dataurl);
      html2canvas(meme)
        .then(canvas => {
          const dataUri = canvas.toDataURL({
            format: "png",
            left: 0,
            top: 0,
            width: canvas.width,
            height: canvas.height
          });
          return new Promise(resolve => {
            this.dataURLtoBlob(dataUri, blob => {
              resolve(blob);
            });
          });
        })
        .then(blob => {
          const data = new FormData();

          data.append("image", blob);
          return axios({
            method: "POST",
            url: "http://localhost:3000/upload",
            data,
            headers: {
              token: localStorage.getItem("token")
            }
          });
        })
        .then(({ data }) => {
          console.log(data);
          this.imageUrl = data.link;
          Swal.fire({
            title: "Share your Meme!",
            text: "share",
            type: null,
            imageUrl: this.imageUrl,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            html: ` <a id="facebook-share" href="https://www.facebook.com/sharer/sharer.php?u=${
              this.imageUrl
            }" target="_blank" style="background-color: #3b5998; color: white; margin: 5px; padding: 10px 20px; border-radius: 5px;" >Facebook</a>
                              <a id="twitter-share" class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Tweet+ini+nyata&amp;url=${
                                this.imageUrl
                              }" target="_blank" style="background-color: #1da1f2; color: white; margin: 5px; padding: 10px 20px; border-radius: 5px;"></i>Twitter</a>`,
            animation: false
          });
          // console.log(time);
        })
        .catch(error => {
          console.log(error);
        });
    },
    dataURLtoBlob(dataUrl, callback) {
      const req = new XMLHttpRequest();

      req.open("GET", dataUrl);
      req.responseType = "arraybuffer";
      req.onload = function fileLoaded(event) {
        const mime = this.getResponseHeader("content-type");
        callback(new Blob([this.response], { type: mime }));
      };
      req.send();
    }
  },
  created() {
    this.getMemes();
  },
  mounted() {
    this.renderCanvas();
  },
  computed: {
    filteredPosts() {
      console.log(this.search);
      let filter = this.memes.filter(memes => {
        return memes.name.toLowerCase().includes(this.search.toLowerCase());
      });
      if (filter.length === 0) return this.memes;
      else return filter;
    }
  }
};
</script>
<style scoped>
@font-face {
  font-family: "Impact";
  src: url("../fonts/impact.ttf") format("truetype"); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

canvas {
  border: 1px solid grey;
  border-radius: 20px;
  padding-left: 0;
  padding-right: 0;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>

