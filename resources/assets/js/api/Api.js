import axios from 'axios';

const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

export default axios.create({
    baseURL: '/api/',
    headers: {        
        'X-CSRF-TOKEN': csrfToken,
        'X-Requested-With': 'XMLHttpRequest',
    },    
});