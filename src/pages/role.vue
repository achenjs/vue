<template>
   <div class="role">
      <el-col :span="4" class="add_item">
        <span @click="addOpen">创建角色</span>
      </el-col>
      <div class="">
        <el-table
        :data="tableData"
        border
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
            width="120"
            label="角色名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="description"
            label="角色描述"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="60">
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
              <span>角色信息</span>
            </div>
            <div class="modal-content">
              <label for=""><i>*</i>角色名称</label>
              <el-input placeholder="角色名称" v-model="form.name"></el-input>
              <label for="">角色描述</label>
              <el-input placeholder="角色描述" v-model="form.description"></el-input>
              <label for=""><i>*</i>状态</label>
              <el-select placeholder="请选择" v-model="form.status">
                <el-option
                v-for="item in roles"
                :label="item.label"
                :value="item.value"
                :key="item.value">
                </el-option>
              </el-select>
              <label for="" v-if="searchGet"><i>*</i>权限</label>
              <el-table
                v-if="searchGet"
                :data="tableData3"
                height="200"
                border
                style="width: 100%"
                ref="table"
                @selection-change="handleSelectionChange">
                <el-table-column
                  align="center"
                  type="selection">
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="170"
                  align="center"
                  show-overflow-tooltip
                  label="名称">
                </el-table-column>
                <el-table-column
                  prop="description"
                  align="center"
                  label="描述"
                  show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>
            <div class="modal-footer">
              <el-button type="primary" v-if="searchGet" @click="ensure">确认</el-button>
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
        tableData3: [],
        multipleSelection: '',
        tableData: [],
        addShow: false,
        form: {
          name: '',
          description: '',
          status: '',
          permissions: ''
        },
        roles: [{
          value: true,
          label: '启用',
        }, {
          value: false,
          label: '禁用',
        }],
        total: 1,
        id: '',
        searchGet: true,
        page: ''
      }
    },
    methods: {
      reset() {
        for(let name in this.$data.form) {
          this.$data.form[name] = ''
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      queryClick(id) {
        this.addShow = true
        this.searchGet = false
        axios.get('/admin/api/v1/roles/' + id)
          .then((result) => {
            const data = result.data.result
            this.form.name = data.name
            this.form.description = data.description
            for(var i=0; i<data.permissions.length; i++) {
              this.$refs.table.toggleRowSelection(this.tableData3.find(d => d.key === data.permissions[i]))
            }
            this.form.status = data.status
          })
          .catch((err) => {
            this.$message.error(err.message)
          })
      },
      midClick(id) {
        this.reset()
        this.id = id
        this.queryClick(id)
        this.addShow = true
        this.searchGet = true
      },
      addOpen() {
        this.id = ''
        this.reset()
        this.addShow = true
        this.searchGet = true
      },
      cancel() {
        this.addShow = false
      },
      ensure() {
        var arr = []
        for (var i=0; i<this.multipleSelection.length; i++) {
          arr.push(this.multipleSelection[i].key)
        }
        this.form.permissions = arr.join()
        if (this.id === '') {
          //  新建
          if (this.form.name === '' || this.form.status === '' || this.form.permissions === '') {
            this.$message.error('必填字段不能为空！')
          } else {
            axios.post('/admin/api/v1/roles', this.form)
              .then((result) => {
                this.addShow = false
                this.$message({
                  message: result.data.message,
                  type: 'success'
                })
                this.query(1)
              })
              .catch((err) => {
                this.$message.error(err.message)
              })
          }
        } else {
          //  修改
          if (this.form.name === '' || this.form.status === '' || this.form.permissions === '') {
            this.$message.error('必填字段不能为空！')
          } else {
            axios.post('/admin/api/v1/roles/' + this.id, this.form)
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
      query(page) {
        this.page = page
        axios.get('/admin/api/v1/roles?page=' + page)
          .then((result) => {
            const data = result.data.result
            this.total = data.total
            this.tableData = data.items
          })
          .catch((err) => {
            this.$message.error(err.message)
          })
      }
    },
    created() {
      //  所有角色
      this.query(1)
      //  所有权限
      axios.get('/admin/api/v1/permissions')
        .then((result) => {
          const data = result.data.result
          for (let i in data) {
            data[i]['key'] = i
          }
          var arr = []
          for (let i in data) {
            arr.push(data[i])
          }
          this.tableData3 = arr
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    components: {
      'v-pages': pages
    }
  }
</script>

<style lang="scss">
@import "../assets/css/modal.scss";
.role {
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
