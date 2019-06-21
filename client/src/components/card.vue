<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img class="fit" :src="meme.url" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <a class="title is-6" @click="$emit('selected', meme.url)">{{meme.name}}</a>
        </div>
      </div>

      <!-- <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris.
        <a>@bulmaio</a>.
        <a href="#">#css</a>
        <a href="#">#responsive</a>
        <br>
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>-->
    </div>
  </div>
</template>

<script>
import cardmodal from "./cardmodal.vue";

export default {
  props: ["meme"]
};
</script>

<style scoped>
.fit {
  object-fit: cover;
}
.small-fit {
  object-fit: cover;
}
</style>


