/// <reference path="node_modules/@types/jquery/index.d.ts" />

var bevapp = new Vue({
  el: '#app',
  data: {
    show_table: true,
    show_payment: false,
    accounts: [],
    current_account: {}
  },
  methods: {
    selectNewAcc: function (index) { this.current_account = this.accounts[index]},
    openApp: function (event, app_name) {
      var tabs = document.getElementsByClassName('tablink')
      for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active')
      }
      event.currentTarget.classList.add('active')
      if (app_name === 'bev-table') {
        this.show_table = true
        this.show_payment = false
      }
      if (app_name === 'direct-payment') {
        this.show_table = false
        this.show_payment = true
      }
    },
    updateAccounts: function () {
      var app = this
      getAccounts(function (response) {
        app.accounts = response
        app.current_account = app.accounts[0]
      }, displayError)
    }
  },
created: function () {
  getSessionIDAndThen(function(){})
  loginHooks.push(this.updateAccounts)
}
})



