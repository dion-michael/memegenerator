<template>
    <div>
        <label>Meme Maker</label>
        <button @click.prevent="toggleSidebar1">Toggle Sidebar</button>
    </div>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    methods:{
        toggleSidebar1(){
            this.$emit("sidebar-state") //nama event di parent
        }
    }
}
</script>

