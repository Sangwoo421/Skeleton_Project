<template>
  <div class="category-selector">
    <div class="category-grid">
      <div
        v-for="(cat, index) in visibleCategories"
        :key="cat.id"
        class="category-item"
        :class="{ selected: selectedId === cat.id }"
        @click="selectCategory(cat)"
      >
        <!-- 수정 중일 때: 텍스트 자리가 드롭다운으로 전환 -->
        <template v-if="editable && openIndex === index">
          <div class="select-wrapper" @click.stop>
            <select
              class="category-select"
              :value="cat.id"
              @change="onSelectChange(index, $event)"
            >
              <option
                v-for="option in props.categories"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </select>
          </div>
          <button class="cancel-btn" @click.stop="closeMenu">취소</button>
        </template>

        <!-- 일반 상태: 이름 + 수정 버튼 -->
        <template v-else>
          <span class="category-name">{{ cat.name }}</span>
          <button
            v-if="editable"
            class="edit-btn"
            @click.stop="toggleMenu(index)"
          >
            수정
          </button>
        </template>
      </div>
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

// select onChange: 선택한 카테고리로 해당 칸 교체
const onSelectChange = (index, event) => {
  const selectedId = event.target.value;
  const newCat = props.categories.find((c) => c.id === selectedId);
  if (!newCat) return;

  const updated = [...visibleCategories.value];
  updated[index] = newCat;
  visibleCategories.value = updated;
  closeMenu();
};

// 현재 칸 제외한 전체 카테고리
const dropdownOptions = (currentCat) =>
  props.categories.filter((c) => c.id !== currentCat.id);

// 거래 등록 화면에서 칸 클릭 → 선택
const selectCategory = (cat) => {
  if (!props.editable) emit('update:modelValue', cat);
};
</script>
