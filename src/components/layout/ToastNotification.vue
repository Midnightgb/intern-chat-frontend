<script>
import Swal from 'sweetalert2'

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
      })
    }
  }
}
</script>
