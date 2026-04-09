<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['swap']);

const editingId = ref(null);
const selectedId = ref(null);

/* 🔥 slot 기준 정렬 */
const sorted = computed(() =>
  [...props.categories].sort((a, b) => a.slot - b.slot),
);

/* 🔥 1~4 / 5~8 */
const leftCategories = computed(() => sorted.value.slice(0, 4));
const rightCategories = computed(() => sorted.value.slice(4, 8));

const startEdit = (cat) => {
  editingId.value = cat.id;
  selectedId.value = cat.id;
};

const cancelEdit = () => {
  editingId.value = null;
};

const applyChange = (cat) => {
  const selected = props.categories.find((c) => c.id === selectedId.value);

  if (!selected) return;

  emit('swap', {
    target: cat,
    selected,
  });

  editingId.value = null;
};
</script>

<template>
  <div class="section">
    <div class="section-header center">카테고리 수정</div>

    <div class="two-col">
      <!-- 왼쪽 -->
      <div>
        <div v-for="cat in leftCategories" :key="cat.id" class="row">
          <template v-if="editingId === cat.id">
            <select v-model="selectedId">
              <option
                v-for="option in categories"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </select>

            <button @click="applyChange(cat)">완료</button>
            <button @click="cancelEdit">취소</button>
          </template>

          <template v-else>
            <span>{{ cat.name }}</span>
            <button @click="startEdit(cat)">수정</button>
          </template>
        </div>
      </div>

      <!-- 오른쪽 -->
      <div>
        <div v-for="cat in rightCategories" :key="cat.id" class="row">
          <template v-if="editingId === cat.id">
            <select v-model="selectedId">
              <option
                v-for="option in categories"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </select>

            <button @click="applyChange(cat)">완료</button>
            <button @click="cancelEdit">취소</button>
          </template>

          <template v-else>
            <span>{{ cat.name }}</span>
            <button @click="startEdit(cat)">수정</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
