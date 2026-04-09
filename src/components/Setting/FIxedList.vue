<template>
  <div class="section">
    <div class="one-col">
      <div v-for="item in items" :key="item.id" class="list-row">
        <!-- 수정 중인 항목 -->
        <template v-if="editingId === item.id">
          <input
            class="edit-input"
            v-model="editingTitle"
            @keyup.enter="saveEdit(item)"
            @keyup.escape="cancelEdit"
          />
          <div class="row-actions">
            <button class="btn btn-mint" @click="saveEdit(item)">완료</button>
            <button class="btn btn-gray" @click="cancelEdit">취소</button>
          </div>
        </template>

        <!-- 일반 상태 -->
        <template v-else>
          <div class="row-title">{{ item.title }}</div>
          <div>{{ item.amount.toLocaleString() }}원</div>
          <div class="row-actions">
            <button class="btn btn-mint" @click="startEdit(item)">수정</button>
            <button class="btn btn-red" @click="$emit('delete', item.id)">
              삭제
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: String,
  items: Array,
});

const emit = defineEmits(['edit', 'delete']);

const editingId = ref(null);
const editingTitle = ref('');

const startEdit = (item) => {
  editingId.value = item.id;
  editingTitle.value = item.title;
};

const cancelEdit = () => {
  editingId.value = null;
  editingTitle.value = '';
};

const saveEdit = (item) => {
  const trimmed = editingTitle.value.trim();
  if (!trimmed) return;
  emit('edit', { ...item, title: trimmed });
  cancelEdit();
};
</script>
