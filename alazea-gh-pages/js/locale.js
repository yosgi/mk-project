const DEFAULT_LANG = 'zh'
const LOCALE_KEY = 'localeLanguage'

const en = $.getJSON({ url:'../locales/en.json', async: false }).responseJSON
const zh = $.getJSON({ url:'../locales/zh.json', async: false }).responseJSON

const locales = {
  en,
  zh
}

const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: locales
})

const switchLocale = lang => {
  if (lang === undefined) {
    lang = window.localStorage.getItem(LOCALE_KEY)
    if (locales[lang] === undefined) {
      lang = DEFAULT_LANG
    }
  }
  window.localStorage.setItem(LOCALE_KEY, lang)

  Vue.config.lang = lang
  i18n.locale = lang
}

switchLocale()
