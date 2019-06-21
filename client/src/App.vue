<template>
    <div class="contentwrapper d-flex flex-column">
        <div class="header">
            <headermeme v-on:sidebar-state="toggleSidebar"/>
        </div>

        <div class="maincontent d-flex">
            <div v-bind:class="showSidebar ? 'sidebarwrapper' : 'sidebarwrapper-closed'">
                <sidenav v-bind:showSidebarProps="showSidebar"/>
            </div>

            <div class="content" v-bind:class="showSidebar ? 'content-pushed' : 'content-full'">
                <div class="bv-example-row">
                    <b-row align-h="between" class="flex-wrap">
                        <cardmeme v-for="i in 10" :key="i"/>
                    </b-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import headermeme from './components/headermeme.vue';
import cardmeme from './components/cardmeme.vue';
import sidenav from './components/sidenav.vue';
import toast from './components/toast.vue';


export default {
    data() {
        return {
            showSidebar: false
        }
    },
    components: {
        headermeme,
        cardmeme,
        sidenav,
        toast
    },
    methods:{
        toggleSidebar(){
            this.showSidebar = this.showSidebar ? false : true;
        },
        sideBar(value){
            alert(value)
        }
    }
}
</script>
<style>

html, body, .contentwrapper{
    height: 100%;
    width: 100%;
}

.header {
    height: 10%
}

.maincontent {
    height: 90%
}

.sidebarwrapper{
    width: 20%;
    transition: width 0.5s;
}

.sidebarwrapper-closed{
    width: 0;
    transition: width 0.5s;
}

.content {
    overflow: auto;
    transition: width 0.5s;
}

.content-full {
    width: 100%;
}

.content-pushed {
    width: 80%;
}

</style>
