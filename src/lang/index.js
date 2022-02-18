import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { getLang } from '@/common/lang'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementViLocale from 'element-ui/lib/locale/lang/vi'
import zhLocale from './zh'
import viLocale from './vi'

Vue.use(VueI18n)

const messages = {  
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  vi: {
    ...viLocale,
    ...elementViLocale
  },
}

const i18n = new VueI18n({
  locale: getLang() || 'zh',
  messages
})

export default i18n
