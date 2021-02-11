import Vue from 'vue'
import i18n from '@/plugin'
import Demo from '@/Demo.vue'

Vue.config.productionTip = false

Vue.use(i18n, {
  lng: 'en',
  fallbackLng: 'en',
  namespace: ['demo', 'other'],
  callback() {
    console.log('in callBack')
    new Vue({ render: h => h(Demo) }).$mount('#i18n-demo')
  }
})