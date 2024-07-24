//src/components/common/ToastNotification.vue
<script>
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  }
})

export default {
  name: 'ToastNotification',
  methods: {
  showToast(icon, message) {
    Toast.fire({
      icon: icon,
      title: message
    }).then(() => {
      console.log('Toast mostrado exitosamente');
    }).catch((error) => {
      console.error('Error al mostrar el toast:', error);
    });
  }
}
}
</script>
