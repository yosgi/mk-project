window.onload = function () {
  new Vue({
    el: '#aboutPage',
    i18n,
    data() {
      return {
        currentYear: new Date().getFullYear()
      }
    },
    methods: {
      switchLocale(lang) {
        switchLocale(lang)
      }
    }
  });
}
