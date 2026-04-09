<template>
  <aside
    class="d-flex flex-column flex-shrink-0 sidebar-bg"
    style="width: 230px"
  >
    <!-- 로고 -->
    <div class="d-flex align-items-center gap-2 px-3 py-4">
      <div
        class="d-flex align-items-center justify-content-center rounded-2 fw-bold text-white flex-shrink-0 logo-badge"
      >
        KB
      </div>
      <div class="d-flex flex-column">
        <span class="fw-bold text-white" style="font-size: 15px"
          >KB 가계부</span
        >
        <span style="font-size: 11px; color: #8a90a8">IT's Your Life</span>
      </div>
    </div>

    <!-- 네비게이션 -->
    <nav class="flex-grow-1 px-2">
      <!-- 메인 -->
      <div class="mb-2">
        <span class="d-block px-2 mb-1 nav-label">메인</span>
        <RouterLink
          to="/"
          class="nav-item d-flex align-items-center gap-2 px-3 py-2 rounded-2 text-decoration-none w-100"
          :class="
            route.name === 'home' ? 'nav-item-active' : 'nav-item-default'
          "
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="8" height="8" rx="1" />
            <rect x="13" y="3" width="8" height="8" rx="1" />
            <rect x="3" y="13" width="8" height="8" rx="1" />
            <rect x="13" y="13" width="8" height="8" rx="1" />
          </svg>
          대시보드
        </RouterLink>
      </div>

      <!-- 거래 내역 -->
      <div class="mb-2">
        <!-- <button
          class="nav-item nav-item-dummy d-flex align-items-center gap-2 px-3 py-2 rounded-2 w-100 border-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="5" width="18" height="2" rx="1" />
            <rect x="3" y="11" width="18" height="2" rx="1" />
            <rect x="3" y="17" width="18" height="2" rx="1" />
          </svg>
          거래 내역
        </button> -->
        <RouterLink
          to="/register"
          class="nav-item d-flex align-items-center gap-2 px-3 py-2 rounded-2 text-decoration-none w-100"
          :class="
            route.name === 'register' ? 'nav-item-active' : 'nav-item-default'
          "
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="5" width="18" height="2" rx="1" />
            <rect x="3" y="11" width="18" height="2" rx="1" />
            <rect x="3" y="17" width="18" height="2" rx="1" />
          </svg>
          거래 내역
        </RouterLink>
      </div>

      <!-- 관리 -->
      <div class="mb-2">
        <span class="d-block px-2 mb-1 nav-label">관리</span>
        <button
          class="nav-item nav-item-dummy d-flex align-items-center gap-2 px-3 py-2 rounded-2 w-100 border-0 mb-1"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect
              x="2"
              y="5"
              width="20"
              height="14"
              rx="2"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />
            <circle cx="8" cy="12" r="2" />
            <rect x="13" y="10" width="6" height="1.5" rx="0.75" />
            <rect x="13" y="13" width="4" height="1.5" rx="0.75" />
          </svg>
          거래 등록
        </button>
        <button
          class="nav-item nav-item-dummy d-flex align-items-center gap-2 px-3 py-2 rounded-2 w-100 border-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="8" r="4" />
            <path
              d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          설정
        </button>
      </div>
    </nav>

    <!-- 사용자 정보 -->
    <div
      class="d-flex align-items-center gap-2 px-3 py-3 border-top border-secondary"
    >
      <div
        class="d-flex align-items-center justify-content-center rounded-circle fw-bold text-white flex-shrink-0 user-avatar"
      >
        {{ userInitial }}
      </div>
      <span style="font-size: 14px; color: #c0c8e0">{{ userName }}</span>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const userName = ref('');

const userInitial = computed(() => userName.value.charAt(0) || '?');

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/users');
    if (data.length > 0) userName.value = data[0].name;
  } catch (e) {
    console.error('사용자 정보를 불러올 수 없습니다:', e.message);
  }
});
</script>

<style scoped>
.sidebar-bg {
  background-color: #1e2235;
}

.logo-badge {
  width: 40px;
  height: 40px;
  font-size: 13px;
  background-color: #f5a623;
}

.nav-label {
  font-size: 11px;
  font-weight: 600;
  color: #5a607a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-item {
  font-size: 14px;
  font-weight: 500;
  transition:
    background 0.15s,
    color 0.15s;
  text-align: left;
  background: none;
}

.nav-item-default {
  color: #a0a8c0;
}

.nav-item-default:hover {
  background-color: #2a3050 !important;
  color: #fff !important;
}

.nav-item-active {
  background-color: #3d2e0e !important;
  color: #f5a623 !important;
}

.nav-item-dummy {
  color: #a0a8c0;
  opacity: 0.6;
  cursor: not-allowed;
}

.user-avatar {
  width: 34px;
  height: 34px;
  font-size: 14px;
  background-color: #f5a623;
}
</style>
