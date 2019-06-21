<template>
  <section class="hero" v-bind:class="[size, color, font_weight]">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Primary bold title</h1>
        <h2 class="subtitle">Primary bold subtitle</h2>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      size: "is-fullheight",
      color: "is-dark",
      font_weight: "is-bold"
    };
  }
};
</script>

