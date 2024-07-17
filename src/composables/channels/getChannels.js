//src/composables/channels/getChannels.js
import { ref, onMounted } from 'vue';
import { getChannels } from '@/services/api';

export const useFetchChannels = () => {
  const channels = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const fetchChannels = async () => {
    try {
      const response = await getChannels();
      channels.value = response.data;
    } catch (err) {
      if (err.response && err.response.status === 403) {
        error.value = 'Acceso denegado. Verifica tus credenciales.';
      } else {
        error.value = 'Ocurrió un error al obtener los servidores.';
      }
      console.error('Error fetching channels:', err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchChannels();
  });

  return { channels, loading, error };
};
