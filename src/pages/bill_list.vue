<template>
   <div class="bill_list">
     <div class="deliverable_inline clearfix">
       <el-col :span="4">
         <div style="width: 80%;">
           <label for="">项目名称</label>
           <el-input placeholder="项目名称" v-model="form.project_name"></el-input>
         </div>
       </el-col>
       <el-col :span="4">
         <div style="width: 80%;">
           <label for="">服务名称</label>
           <el-input placeholder="服务名称" v-model="form.service_name"></el-input>
         </div>
       </el-col>
       <el-col :span="4">
         <div style="width: 80%;">
           <label for="">订单号</label>
          <el-input placeholder="订单号" v-model="form.id"></el-input>
         </div>
       </el-col>
       <el-col :span="12">
         <label for="">交易日期</label>
         <el-date-picker
           :editable="false"
           v-model="form.starttime"
           type="date"
           placeholder="选择日期">
         </el-date-picker>
         <span>至</span>
         <el-date-picker
           :editable="false"
           v-model="form.endtime"
           type="date"
           placeholder="选择日期">
         </el-date-picker>
       </el-col>
     </div>
     <div class="query">
       <span @click="query(1)">查&nbsp;&nbsp;询</span>
     </div>
     <div class="deliverable_table">
       <el-table
         :data="tableData"
         border
         style="width: 100%">
         <el-table-column
            align="center"
            prop="id"
            label="订单号"
            show-overflow-tooltip
            width="60">
         </el-table-column>
         <el-table-column
            align="center"
            prop="project_name"
            label="项目名称"
            show-overflow-tooltip>
         </el-table-column>
         <el-table-column
            align="center"
            prop="service_name"
            label="服务名称"
            show-overflow-tooltip>
         </el-table-column>
         <el-table-column
            align="center"
            prop="price"
            label="金额(硬豆)"
            show-overflow-tooltip
            width="80">
         </el-table-column>
         <el-table-column
            align="center"
            label="下单时间"
            show-overflow-tooltip
            width="80">
            <template scope="scope">
              {{scope.row.gmt_create|dateFormat}}
            </template>
          </el-table-column>
         </el-table-column>
       </el-table>
     </div>
     <v-pages :total="total" v-on:currentChange="query"></v-pages>
   </div>
</template>

<script>
import axios from 'axios'
import pages from '../components/pages/pages.vue'
export default {
  data () {
    return {
      form: {
        project_name: '',
        id: '',
        starttime: '',
        endtime: '',
        service_name: '',
        page: 1
      },
      tableData: [],
      total: 1,
      loading: false
    }
  },
  created() {
    this.query(1)
  },
  mounted() {
    document.onkeydown = (ev) => {
      if (ev.keyCode == 13) {
        this.query(1)
      }
    }
  },
  methods: {
    query(page) {
      this.form.page = page
      if (this.form.starttime === '') {
        this.form.starttime = ''
      } else {
        this.form.starttime = Date.parse(new Date(this.form.starttime))
      }
      if (this.form.endtime === '') {
        this.form.endtime = ''
      } else {
        this.form.endtime = Date.parse(new Date(this.form.endtime))
      }
      this.$store.dispatch('increment', {
        path: '/admin/api/v1/bills',
        parameter: {
          project_name: this.form.project_name,
          id: this.form.id,
          starttime: this.form.starttime,
          endtime: this.form.endtime,
          service_name: this.form.service_name,
          page: this.form.page
        }
      })
      var changeUrl = this.$store.getters.changeUrl
      axios({
        url: changeUrl,
        timeout: 10000,
        transformResponse: [(data) => {
          this.loading = true
          return data
        }]
      })
        .then((result) => {
          this.loading = false
          const data = JSON.parse(result.data).result
          this.total = data.total
          this.tableData = data.items
        })
        .catch((err) => {
          if (err.indexOf('timeout') >= 0) {
            this.loading = false
            this.$message.error('请求超时!')
          } else {
            this.$message.error(err.message)
          }
        })
    }
  },
  components: {
    'v-pages': pages
  }
}
</script>

<style lang="scss">
.bill_list {
  .deliverable_inline {
    margin-bottom: 10px;
    label {
      display: block;
      margin-bottom: 5px;
    }
    .el-select {
        width: 100%;
    }
  }
  .query {
     margin: 30px 0;
     text-align: center;
     span {
         display: inline-block;
         font-size: 14px;
         width: 300px;
         height: 40px;
         line-height: 40px;
         cursor: pointer;
         background-color: #027ee5;
         color: #ffffff;
     }
  }
  .buttons {
    margin: 30px 0;
    text-align: center;
  }
}
</style>
