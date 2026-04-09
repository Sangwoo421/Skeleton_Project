import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  // 🔥 BASE URL (proxy 사용)
  const BASE_URL = '/api';
  const USER_ID = 'u1';

  const normalizeUser = (rawUser) => ({
    id: rawUser?.id ?? USER_ID,
    name: rawUser?.name ?? '',
  });

  // 유저 조회
  const fetchUser = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await axios.get(`${BASE_URL}/users/${USER_ID}`);
      user.value = normalizeUser(res.data);
      return user.value;
    } catch (err) {
      console.error(err);
      error.value = '사용자 정보를 불러오지 못했습니다.';
      user.value = null;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 유저 수정
  const updateUser = async (name) => {
    try {
      await axios.put(`${BASE_URL}/users/${USER_ID}`, {
        id: USER_ID,
        name,
      });
      await fetchUser();
    } catch (err) {
      console.error(err);
      error.value = '사용자 이름을 저장하지 못했습니다.';
      throw err;
    }
  };

  return {
    user,
    isLoading,
    error,
    fetchUser,
    updateUser,
  };
});
