import { createApp } from 'vue';

import router from './router.js';
import App from './App.vue';
import router from './router'

const app = createApp(App).use(router);

app.use(router);
// app.component()
app.mount('#app');
