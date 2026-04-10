<template>
  <div class="category-grid">
    <div
      v-for="(cat, index) in visibleCategories"
      :key="cat.id"
      class="category-row"
      :class="{ selected: selectedId === cat.id }"
      @click="selectCategory(cat)"
    >
      <!-- 수정 중: select 드롭다운으로 전환 -->
      <template v-if="editable && openIndex === index">
        <select
          class="category-select"
          :value="cat.id"
          @change="onSelectChange(index, $event)"
          @click.stop
        >
          <option
            v-for="option in props.categories"
            :key="option.id"
            :value="option.id"
          >
            {{ option.name }}
          </option>
        </select>
        <button class="btn btn-gray" @click.stop="closeMenu">취소</button>
      </template>

      <!-- 일반 상태 -->
      <template v-else>
        <span class="category-name">{{ cat.name }}</span>
        <button
          v-if="editable"
          class="btn btn-mint"
          @click.stop="toggleMenu(index)"
        >
          수정
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  categories: { type: Array, required: true },
  editable: { type: Boolean, default: true },
  modelValue: { type: Object, default: null },
});

const emit = defineEmits(['update:modelValue']);

const visibleCategories = ref([]);
const selectedId = computed(() => props.modelValue?.id ?? null);
const openIndex = ref(null);

watch(
  () => props.categories,
  (newVal) => {
    if (newVal.length > 0 && visibleCategories.value.length === 0) {
      visibleCategories.value = newVal.slice(0, 8);
    }
  },
  { immediate: true },
);

const toggleMenu = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

const closeMenu = () => {
  openIndex.value = null;
};

const handleOutsideClick = (e) => {
  if (!e.target.closest('.category-row')) closeMenu();
};

onMounted(() => document.addEventListener('click', handleOutsideClick));
onUnmounted(() => document.removeEventListener('click', handleOutsideClick));

const onSelectChange = (index, event) => {
  const selectedId = event.target.value;
  const newCat = props.categories.find((c) => c.id === selectedId);
  if (!newCat) return;
  const updated = [...visibleCategories.value];
  updated[index] = newCat;
  visibleCategories.value = updated;
  closeMenu();
};

const selectCategory = (cat) => {
  if (!props.editable) emit('update:modelValue', cat);
};
</script>

<style scoped>
/* 2열 그리드 */
.category-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 60px;
}

/* 각 행: 이름 왼쪽, 버튼 오른쪽 */
.category-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
  cursor: pointer;
}

.category-name {
  font-size: 14px;
  color: #333;
}

/* select 드롭다운 */
.category-select {
  flex: 1;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 13px;
  margin-right: 8px;
  cursor: pointer;
}

/* 버튼 공통 */
.btn {
  padding: 4px 14px;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.btn-mint {
  background: #d4f0d4;
  color: #2d8a2d;
}

.btn-gray {
  background: #eee;
  color: #555;
}
</style>
