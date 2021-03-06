// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('es6-promise').polyfill()
import Vue from 'vue'
import App from './App'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/reset.scss'
import axios from 'axios'
import route from './router'
import store from './vuex/store'

import Autocomplete from 'element-ui/lib/autocomplete'
import Col from 'element-ui/lib/col'
import Row from 'element-ui/lib/row'
import Menu from 'element-ui/lib/menu'
import Submenu from 'element-ui/lib/submenu'
import MenuItem from 'element-ui/lib/menu-item'
import Select from 'element-ui/lib/select'
import Option from 'element-ui/lib/option'
import Button from 'element-ui/lib/button'
import Table from 'element-ui/lib/table'
import TableColumn from 'element-ui/lib/table-column'
import Input from 'element-ui/lib/input'
import Form from 'element-ui/lib/form'
import FormItem from 'element-ui/lib/form-item'
import Breadcrumb from 'element-ui/lib/breadcrumb'
import BreadcrumbItem from 'element-ui/lib/breadcrumb-item'
import Pagination from 'element-ui/lib/pagination'
import Loading from 'element-ui/lib/loading'
import DatePicker from 'element-ui/lib/date-picker'
import Tabs from 'element-ui/lib/tabs'
import TabPane from 'element-ui/lib/tab-pane'
import InputNumber from 'element-ui/lib/input-number'
import Message from 'element-ui/lib/message'
import MessageBox from 'element-ui/lib/message-box'
import Checkbox from 'element-ui/lib/checkbox'
import Notification from 'element-ui/lib/notification'
import Upload from 'element-ui/lib/upload'
import CheckboxGroup from 'element-ui/lib/checkbox-group'
import Dialog from 'element-ui/lib/dialog'

Vue.use(Autocomplete)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Pagination)
Vue.use(Loading)
Vue.use(DatePicker)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(InputNumber)
Vue.use(Checkbox)
Vue.use(Upload)
Vue.use(CheckboxGroup)
Vue.use(Dialog)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification

const VueCookie = require('vue-cookie')
const router = route.router

axios.defaults.withCredentials = true

router.beforeEach ((to, from, next) => {
  if (to.path != '/attaDetails') {
    localStorage.removeItem('attaDetailsId')
  }
  if (to.path == '/404') {
    if (router.options.routes[0].children) {
      var start_path = router.options.routes[0].children[0].path
      next({
        path: start_path
      })
    } else {
      next()
    }
  }
  next()
})

axios.interceptors.request.use(
  request => {
     if (request.method == 'get') {
       if (request.url.indexOf('?') > 0) {
         request.url += '&_=' + new Date().getTime()
       } else {
         request.url += '?_=' + new Date().getTime()
       }
     }
     return request
   },
   error => {
     return Promise.reject(error)
   }
 )

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        router.push('/signin')
      }
    } else {
      return Promise.reject(error.message)
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  }
)

Vue.filter('dateFormat', (value, format) => {
  const timer = new Date(value)
  const formats = format
  timer.setTime(timer.getTime() + 0)
  var year = timer.getUTCFullYear()
  var month = timer.getUTCMonth() + 1
  var date = timer.getUTCDate()
  var hour = timer.getUTCHours()
  var minute = timer.getUTCMinutes()
  var second = timer.getUTCSeconds()
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  var time = year + "-" + month + "-" + date
  var times = year + "-" + month + "-" + date + ' ' + hour + ':' + minute + ':' + second
  switch (formats) {
    case 'Y-M-D':
      return time
      break;
    case 'Y-M-D h-m-s':
      return times
      break;
    default:
      return time
      break;
  }
})

Vue.use(VueCookie)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
