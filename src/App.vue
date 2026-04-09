<script setup>
import { useRoute } from 'vue-router';
// import Sidebar from '@/components/Sidebar.vue';
import TopBar from '@/components/layout/TopBar.vue';

const route = useRoute();
</script>

<template>
  <div class="layout">
    <!-- <Sidebar /> -->

    <div class="main">
      <!-- <TopBar :title="pageTitle" /> -->

      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>