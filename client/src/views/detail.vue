<template>
  <div>
    <h3>login</h3>
    <canvas id="canvas" width="300px" height="300px"></canvas>
  </div>
</template>

<script>
import { fabric } from "fabric";
export default {
  props: ["imageurl"],
  methods: {
    initCanvas() {
      var canvas = new fabric.Canvas("canvas", {
        hoverCursor: "pointer",
        selection: true,
        selectionBorderColor: "green",
        backgroundColor: null
      });

      // Define the URL where your background image is located
      fabric.Image.fromURL(this.imageurl, function(oImg) {
        oImg.scaleToWidth(canvas.width);
        oImg.scaleToHeight(canvas.height);
        canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas));
      });
      // Define
    }
  },
  mounted() {
    this.initCanvas();
  }
};
</script>
<style scoped>
canvas {
  border: 1px solid grey;
}
</style>

