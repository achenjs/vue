<template>
   <div class="department">
      <el-col :span="4" class="add_item">
        <span @click="addOpen">新建部门</span>
      </el-col>
      <div class="">
        <el-table
        v-loading="loading"
        border
        element-loading-text="拼命加载中"
        :data="tableData"
        style="width: 100%">
          <el-table-column
            align="center"
            prop="id"
            width="50"
            label="编号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            width="150"
            label="部门名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="description"
            label="部门描述"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            width="60"
            label="操作">
            <template scope="scope">
              <el-button @click="midClick(scope.row.id)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <transition name="fade">
        <div class="modal" v-if="addShow">
          <div class="modal-dialog">
            <div class="modal-header">
              <span>新建部门</span>
            </div>
            <div class="modal-content">
              <label for=""><i>*</i>部门名称</label>
              <el-input placeholder="部门名称" v-model="form.name"></el-input>
              <label for="">部门描述</label>
              <el-input placeholder="部门描述" v-model="form.description"></el-input>
              <label for=""><i>*</i>状态</label>
              <el-select v-model="form.status" placeholder="请选择">
                <el-option
                v-for="item in states"
                :label="item.label"
                :value="item.value"
                :key="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="modal-footer">
              <el-button type="primary" @click="ensure">确认</el-button>
              <el-button type="primary" @click="cancel">取消</el-button>
            </div>
          </div>
        </div>
      </transition>
      <v-pages :total="total" v-on:currentChange="query"></v-pages>
   </div>
</template>

<script>
import axios from 'axios'
import pages from '../components/pages/pages.vue'
export default {
    data() {
      return {
        tableData: [],
        addShow: false,
        states: [{
          value: true,
          label: '启用',
        }, {
          value: false,
          label: '禁用',
        }],
        form: {
          name: '',
          description: '',
          status: true,
        },
        total: 1,
        loading: false,
        id: '',
        page: ''
      }
    },
    created() {
      this.query(1)
    },
    methods: {
      reset() {
        for(var name in this.$data.form) {
          this.$data.form[name] = ''
        }
      },
      query(page) {
        this.page = page
        axios.get('/admin/api/v1/departments?page=' + page)
          .then((result) => {
            let data = result.data.result
            this.total = data.total
            this.tableData = data.items
          })
          .catch((err) => {
            this.$message.error(err.message)
          })
      },
      addOpen() {
        this.reset()
        this.addShow = true
      },
      cancel() {
        this.addShow = false
      },
      ensure() {
        if (this.id === '') {
          if (this.form.name === '' || this.form.status === '') {
            this.$message.error('必填字段不能为空!')
          } else {
            axios.post('/admin/api/v1/departments', this.form)
              .then((result) => {
                this.addShow = false
                this.$message({
                  message: result.data.message,
                  type: 'success'
                })
                this.query(this.page)
              })
              .catch((err) => {
                this.$message.error(err.message)
              })
          }
        } else {
          if (this.form.name === '' || this.form.status === '') {
            this.$message.error('必填字段不能为空!')
          } else {
            axios.post('/admin/api/v1/departments/' + this.id, this.form)
              .then((result) => {
                this.addShow = false
                this.$message({
                  message: result.data.message,
                  type: 'success'
                })
                this.query(this.page)
              })
              .catch((err) => {
                this.$message.error(err.message)
              })
          }
        }
      },
      //  根据id查看详情和修改
      midClick(id) {
        this.addShow = true
        this.id = id
        axios.get('/admin/api/v1/departments/' + id)
          .then((result) => {
            var data = result.data.result
            this.form = data
          })
          .catch((err) => {
            this.$message.error(err.message)
          })
      },
    },
    components: { 'v-pages': pages }
  }
</script>

<style lang="scss">
.department {
  .add_item {
    text-align: center;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    background-color: #027ee5;
    color: #fff;
    border-radius: 50px;
    margin-bottom: 40px;
    span {
      display: inline-block;
      width: 100%;
      height: 100%;
      font-size: 18px;
    }
  }
}
</style>
