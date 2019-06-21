<template>
  <div>
    <navbar></navbar>
    <!-- <hero></hero> -->
    <router-view class="view"/>
  </div>
</template>

<script>
import navbar from "./components/navbar.vue";
import card from "./components/card.vue";
import hero from "./components/hero.vue";
import axios from "axios";
export default {
  data() {
    return {
      message: "hello",
      show: true,
      memes: []
    };
  },
  components: {
    navbar,
    card,
    hero
  },
  created() {
    this.getMemes();
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
    }
  },
  mounted() {}
};
</script>
<style scoped>
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
</style>
