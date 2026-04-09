<template>
  <section class="profile-card">
    <div class="sub-title">개인 설정</div>

    <div class="content">
      <div class="profile-avatar">
        <div class="profile-avatar-circle">
          {{ user?.name?.[0] || ' ' }}
        </div>
      </div>

      <div class="profile-info">
        <div class="label">이름</div>

        <div class="row">
          <template v-if="!isEdit">
            <div class="user-name">{{ user?.name }}</div>
            <button class="btn btn-gray" @click="startEdit">수정</button>
          </template>

          <template v-else>
            <input class="field-input" v-model="editName" />
            <button class="btn btn-mint" @click="saveName">완료</button>
            <button class="btn btn-gray" @click="cancelEdit">취소</button>
          </template>
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

// 데이터 불러오기
onMounted(async () => {
  try {
    await store.fetchUser();
  } catch {
    alert('DB에서 사용자 정보를 불러오지 못했습니다.');
  }
});

// 수정 시작
const startEdit = () => {
  editName.value = user.value?.name ?? '';
  isEdit.value = true;
};

// 취소
const cancelEdit = () => {
  isEdit.value = false;
};

// 저장
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
.profile-card {
  padding: 20px;
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e5e5e5;
}

/* 타이틀 */
.sub-title {
  margin-bottom: 16px;
  font-weight: bold;
  font-size: 16px;
}

/* 내부 레이아웃 */
.content {
  display: flex;
  gap: 20px;
}

.profile-avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #e2a000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
}

/* 오른쪽 */
.profile-info {
  flex: 1;
}

/* 라벨 */
.label {
  font-size: 13px;
  color: #888;
  margin-bottom: 6px;
}

/* 핵심: 가로 정렬 */
.row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
}

/* input */
.field-input {
  height: 36px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

/* 버튼 */
.btn {
  height: 32px;
  padding: 0 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.btn-mint {
  background: #bfead7;
}

.btn-gray {
  background: #eee;
}
</style>
