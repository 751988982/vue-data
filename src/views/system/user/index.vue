<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-form :inline="true">        
        <el-form-item>
          <el-button type="success" @click="openAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 表格 -->
    <el-table
      ref="userTable"
      v-loading="listLoading"
      :data="userList"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" width="80" />
      <el-table-column
        width="180px"
        align="center"
        prop="user_name"
        label="账号"
      />
      <el-table-column
        width="240px"
        align="center"
        prop="password"
        label="密码"
      />      
      <el-table-column align="center" label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            @click="openUpdate(scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="small"
            @click="delDrop(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-col :span="24" class="toolbar">
      <el-pagination
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-col>
    <!--新增界面-->
    <el-dialog
      title="新增"
      :visible.sync="addFormVisible"
      :close-on-click-modal="false"
      label-width="100%"
    >
      <el-form ref="Info" :model="Info" label-width="100px">
        <el-form-item label="账号">
          <el-input v-model="Info.user_name" clearable />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="Info.password" clearable />
        </el-form-item>       
        <el-form-item>
          <el-button type="primary" @click="insert()">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--新增界面-->
    <el-dialog
      title="修改"
      :visible.sync="changeFormVisible"
      :close-on-click-modal="false"
      label-width="100%"
    >
      <el-form ref="Info" :model="pitch_info" label-width="100px">
        <el-form-item label="账号">
          <el-input v-model="pitch_info.user_name" clearable />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="pitch_info.password" clearable />
        </el-form-item>        
        <el-form-item>
          <el-button type="primary" @click="update()">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import {
  getUserList,
  insertAdmin,
  upPassworld,
  delAdmin
} from '@/api/user'

export default {
  data() {
    return {
      name: '',
      userList: [],
      shuzu: [],
      total: 0,
      pageNo: 1,
      pageSize: 10,
      listLoading: false,
      Info: {
        user_name: '',
        password: '',        
      },
      addFormVisible: false,
      changeFormVisible: false,
      // 选中的数据
      pitch_info: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {      
      getUserList({}).then((res) => {
        this.listLoading = false
        if (res.code == 200) {
          this.total = res.data.list.length
          this.shuzu = res.data.list;
          this.userList = this.shuzu.slice(
            (this.pageNo - 1) * this.pageSize,
            this.pageSize * this.pageNo
          )
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.userList = this.shuzu.slice(
        (this.pageNo - 1) * this.pageSize,
        this.pageSize * this.pageNo
      )
    },
    handleCurrentChange(val) {
      this.pageNo = val
      this.userList = this.shuzu.slice(
        (this.pageNo - 1) * this.pageSize,
        this.pageSize * this.pageNo
      )
    },
    openAdd() {
      this.addFormVisible = true
    },        
    insert() {
      insertAdmin(this.Info).then((res) => {
        if (res.code != 200) this.$message.warning(res.msg)        
        this.addFormVisible = false
        this.getList()
      })
    },
    openUpdate(row) {
      this.changeFormVisible = true
      this.pitch_info = row
    },
    update() {
      const { user_name, password } = this.pitch_info
      if (!user_name || !password) {
        this.$message.warning('不能为空')
        return
      }
      const params = { user_name, password }
      upPassworld(params).then((res) => {
        if (res.code != 200) this.$message.warning(res.msg)
        this.pitch_info = {}
        this.changeFormVisible = false
        this.getList()
      })
    },
    delDrop(row) {
      if (!row.user_name) {
        this.$message.warning('请选择一条数据')
        return
      }
      delAdmin({ user_name: row.user_name }).then((res) => {
        if (res.code != 200) this.$message.warning(res.msg)
        this.getList()
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
