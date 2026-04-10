<template>
  <div class="p-4">
    <!-- 월 이동 -->
    <div class="d-flex align-items-center justify-content-center gap-3 mb-3">
      <button class="btn btn-sm btn-outline-secondary" @click="prevMonth">
        &lt;
      </button>
      <span class="fw-bold fs-5"
        >{{ year }}.{{ String(month).padStart(2, '0') }}</span
      >
      <button class="btn btn-sm btn-outline-secondary" @click="nextMonth">
        &gt;
      </button>
    </div>

    <!-- 캘린더 전체 컨테이너 -->
    <div class="calendar-container mx-auto">
      <!-- 요일 헤더 -->
      <div class="d-grid mb-1 calendar-grid">
        <span
          v-for="day in days"
          :key="day"
          class="text-center fw-semibold py-2"
          :class="
            day === '일'
              ? 'text-danger'
              : day === '토'
                ? 'text-primary'
                : 'text-secondary'
          "
          style="font-size: 13px"
          >{{ day }}</span
        >
      </div>

      <!-- 날짜 셀 -->
      <div class="d-grid gap-2 calendar-grid">
        <div
          v-for="cell in calendarCells"
          :key="cell.date"
          class="rounded-3 p-2 calendar-cell"
          :class="
            cell.isToday
              ? 'bg-warning bg-opacity-10 border border-warning border-2'
              : 'bg-white border'
          "
          :style="!cell.isCurrentMonth ? 'opacity: 0.35;' : ''"
        >
          <span
            class="date-number"
            :class="
              cell.isToday
                ? 'd-inline-flex align-items-center justify-content-center rounded-circle bg-warning text-white fw-bold'
                : !cell.isCurrentMonth
                  ? 'text-secondary'
                  : ''
            "
            :style="
              cell.isToday ? 'width:24px; height:24px; font-size:12px;' : ''
            "
          >
            {{ cell.day }}
          </span>

          <div v-if="cell.isCurrentMonth">
            <div
              v-for="tx in cell.transactions.slice(0, 3)"
              :key="tx.id + tx.date"
              :class="tx.type === 'income' ? 'text-success' : 'text-danger'"
              style="
                font-size: 11px;
                font-weight: 600;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              {{ tx.type === 'income' ? '+' : '-' }}{{ formatAmount(tx.title) }}
              {{ formatAmount(tx.amount) }}원
            </div>
            <div
              v-if="cell.transactions.length > 3"
              style="font-size: 11px; color: #888; font-weight: 600"
            >
              +{{ cell.transactions.length - 3 }}개
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- calendar-container -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const today = new Date();
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

const year = ref(today.getFullYear());
const month = ref(today.getMonth() + 1);
const transactions = ref([]);

const days = ['일', '월', '화', '수', '목', '금', '토'];

// 날짜별 거래 배열 맵 { 'YYYY-MM-DD': [tx, ...] }
const txByDate = computed(() => {
  const map = {};

  for (const tx of transactions.value) {
    const dateKey = tx.date.slice(0, 10);
    if (!map[dateKey]) map[dateKey] = [];
    map[dateKey].push(tx);

    // 고정 거래는 현재 보는 달에도 표시
    if (tx.fix) {
      const txDate = new Date(tx.date);
      const txYear = txDate.getFullYear();
      const txMonth = txDate.getMonth() + 1;
      const txDay = txDate.getDate();
      const isDifferentMonth = txYear !== year.value || txMonth !== month.value;
      const viewedDate = new Date(year.value, month.value - 1, 1);
      const txOriginDate = new Date(txYear, txMonth - 1, 1);

      if (isDifferentMonth && viewedDate >= txOriginDate) {
        const lastDay = new Date(year.value, month.value, 0).getDate();
        if (txDay <= lastDay) {
          const viewedKey = `${year.value}-${String(month.value).padStart(2, '0')}-${String(txDay).padStart(2, '0')}`;
          if (!map[viewedKey]) map[viewedKey] = [];
          map[viewedKey].push({ ...tx, date: viewedKey });
        }
      }
    }
  }

  return map;
});

const calendarCells = computed(() => {
  const firstDay = new Date(year.value, month.value - 1, 1).getDay();
  const lastDate = new Date(year.value, month.value, 0).getDate();
  const prevLastDate = new Date(year.value, month.value - 1, 0).getDate();

  const cells = [];

  // 이전 달 빈 칸
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      date: `prev-${i}`,
      day: prevLastDate - i,
      isCurrentMonth: false,
      isToday: false,
      transactions: [],
    });
  }

  // 현재 달
  for (let d = 1; d <= lastDate; d++) {
    const dateKey = `${year.value}-${String(month.value).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({
      date: dateKey,
      day: d,
      isCurrentMonth: true,
      isToday: dateKey === todayStr,
      transactions: txByDate.value[dateKey] ?? [],
    });
  }

  // 다음 달 빈 칸
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({
      date: `next-${d}`,
      day: d,
      isCurrentMonth: false,
      isToday: false,
      transactions: [],
    });
  }

  return cells;
});

function formatAmount(amount) {
  return amount.toLocaleString('ko-KR');
}

function prevMonth() {
  if (month.value === 1) {
    year.value--;
    month.value = 12;
  } else month.value--;
}

function nextMonth() {
  if (month.value === 12) {
    year.value++;
    month.value = 1;
  } else month.value++;
}

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/transactions');
    transactions.value = data;
  } catch (e) {
    console.error('거래 내역을 불러올 수 없습니다:', e.message);
  }
});
</script>

<style scoped>
.calendar-container {
  width: 80%;
  height: calc(100vh - 64px);
}

.calendar-grid {
  grid-template-columns: repeat(7, 1fr);
}

.calendar-cell {
  min-height: 120px;
}

.date-number {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}

.today-shadow {
  box-shadow: 0 4px 12px rgba(245, 166, 35, 0.45);
}
</style>
