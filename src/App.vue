<template>
  <div class="layout">
    <!-- <Sidebar /> -->

    <div class="main">
      <TopBar :title="pageTitle" />

      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
// import { computed } from 'vue';
import { useRoute } from 'vue-router';
// import Sidebar from '@/components/Sidebar.vue';
import TopBar from '@/components/layout/TopBar.vue';

const route = useRoute();
// const pageTitle = computed(() => route.meta.title || '설정');
</script>
