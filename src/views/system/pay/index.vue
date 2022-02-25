<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-form :inline="true">        
        <el-form-item style="float: right; width: 140px">
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
        width="80px"
        align="center"
        prop="id"
        label="ID"
      />     
      <el-table-column width="300px" label="图片" align="center">
        <template slot-scope="{ row }">
          <el-image
            :src="row.img"
            fit="scale-down"
          />
        </template>
      </el-table-column>      
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

    <!--新增界面-->
    <el-dialog
      title="新增"
      :visible.sync="addFormVisible"
      :close-on-click-modal="false"
      label-width="100%"
    >
      <el-form ref="Info" :model="Info" label-width="100px">        
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action="/api/home/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="Info.imageUrl" :src="Info.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
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
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action="/api/home/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="pitch_info.img" :src="pitch_info.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
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
  getPayList,    
    upPay,
    insertPay,
    delPay
} from '@/api/system'

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
        imageUrl: ''        
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
      getPayList().then((res) => {
        this.listLoading = false
        if (res.code == 200) {          
          this.userList = res.data.list         
        } else {
          this.$message.error(res.msg)
        }
      })
    },    
    openAdd() {
      this.addFormVisible = true
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.Info.imageUrl = res.data
      } else {
        this.$message.error(res.msg)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    insert() {
      const { imageUrl } = this.Info
      if (!imageUrl) {
        this.$message.warning('不能为空')
        return
      }
      const params = { img: imageUrl }
      insertPay(params).then((res) => {
        if (res.code != 200) this.$message.warning(res.msg)
        this.Info = { imageUrl: '' }
        this.addFormVisible = false
        this.getList()
      })
    },
    openUpdate(row) {
      this.changeFormVisible = true
      this.pitch_info = row
    },
    update() {
      const { id, img } = this.Info
      if (!id || !img) {
        this.$message.warning('不能为空')
        return
      }
      const params = { id, title, link, img }
      upPay(params).then((res) => {
        if (res.code != 200) this.$message.warning(res.msg)
        this.pitch_info = {}
        this.changeFormVisible = false
        this.getList()
      })
    },
    delDrop(row) {
      if (!row.id) {
        this.$message.warning('请选择一条数据')
        return
      }
      delPay({ id: row.id }).then((res) => {
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
