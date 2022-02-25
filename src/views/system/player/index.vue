<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-form :inline="true">        
        <el-form-item>
          <el-input v-model="name" style="width: 200px" />
        </el-form-item>
        <el-form-item>
          <el-button style="width: 80px" type="primary" @click="getList">查询</el-button>
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
      <el-table-column width="180px" align="center" prop="user_name" label="账号" />
      <el-table-column width="120px" align="center" prop="name" label="昵称" />
      <el-table-column width="80px" align="center" prop="sex" label="性别" />
      <el-table-column width="160px" align="center" prop="birthday" label="生日" />
      <el-table-column width="160px" align="center" prop="abode" label="居住地" />
      <el-table-column width="300px" align="center" prop="introduce" label="个人简介" />
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
  </section>
</template>

<script>
import {
  getPlayerList,
  
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
    async getList() {
      let params = {};
      if(this.name) params.user_name = this.name;
      let res = await getPlayerList(params);
      this.listLoading = false
      if (res.code == 200) {
        this.total = res.data.list.length
        this.shuzu = res.data.list
        this.userList = this.shuzu.slice(
          (this.pageNo - 1) * this.pageSize,
          this.pageSize * this.pageNo
        )
      } else {
        this.$message.error(res.msg)
      }      
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
