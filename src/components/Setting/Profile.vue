<template>
  <section class="card">
    <p class="card-label">개인 설정</p>

    <div class="profile-body">
      <!-- 아바타 -->
      <div class="avatar">
        {{ user?.name?.[0] || ' ' }}
      </div>

      <!-- 이름 영역 -->
      <div class="profile-info">
        <div class="info-label">이름</div>

        <!-- 일반 상태 -->
        <div v-if="!isEdit" class="info-row">
          <input class="name-input" :value="user?.name" readonly />
          <button class="btn btn-gray" @click="startEdit">수정</button>
        </div>

        <!-- 수정 상태 -->
        <div v-else class="info-row">
          <input class="name-input" v-model="editName" />
          <button class="btn btn-mint" @click="saveName">완료</button>
          <button class="btn btn-gray" @click="cancelEdit">취소</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';

const store = useUserStore();
const user = computed(() => store.user);

const isEdit = ref(false);
const editName = ref('');

onMounted(async () => {
  try {
    await store.fetchUser();
  } catch {
    alert('DB에서 사용자 정보를 불러오지 못했습니다.');
  }
});

const startEdit = () => {
  editName.value = user.value?.name ?? '';
  isEdit.value = true;
};

const cancelEdit = () => {
  isEdit.value = false;
};

const saveName = async () => {
  const trimmedName = editName.value.trim();
  if (!trimmedName) return;
  try {
    await store.updateUser(trimmedName);
    isEdit.value = false;
  } catch {
    alert('DB 저장에 실패했습니다. json-server 상태를 확인해주세요.');
  }
};
</script>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 24px 28px;
}

.card-label {
  font-size: 15px;
  color: #444;
  margin: 0 0 20px;
}

/* 프로필 가로 배치 */
.profile-body {
  display: flex;
  align-items: center;
  gap: 24px;
}

/* 아바타 원 */
.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #e2a000;
  color: #fff;
  font-size: 36px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* 우측 이름 영역 */
.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-label {
  font-size: 13px;
  color: #555;
}

/* 이름 input + 버튼 가로 배치 */
.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 이름 input - 그림처럼 넓게 */
.name-input {
  flex: 1;
  height: 42px;
  padding: 0 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background: #f5f5f5;
  outline: none;
}

.name-input:not([readonly]) {
  background: #fff;
  border-color: #aaa;
}

/* 버튼 */
.btn {
  height: 42px;
  padding: 0 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}

.btn-gray {
  background: #fff;
  color: #333;
}

.btn-gray:hover {
  background: #f0f0f0;
}

.btn-mint {
  background: #d4f0d4;
  color: #2d8a2d;
  border-color: #d4f0d4;
}
</style>
