import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'http://localhost:3000/api'
//const baseURL = 'https://damp-wave-52946.herokuapp.com'

export const apiHelper = axios.create({
  baseURL
})

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
