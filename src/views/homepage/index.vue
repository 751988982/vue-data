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
      <el-table-column
        width="120px"
        align="center"
        prop="title"
        label="标题"
      />

      <el-table-column width="300px" label="图片" align="center">
        <template slot-scope="{ row }">
          <el-image
            :src="row.img"
            fit="scale-down"
          />
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        prop="link"
        label="连接"
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
      title="新增轮播图"
      :visible.sync="addFormVisible"
      :close-on-click-modal="false"
      label-width="100%"
    >
      <el-form ref="Info" :model="Info" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="Info.title" clearable />
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="Info.link" clearable />
        </el-form-item>
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
      title="修改轮播图"
      :visible.sync="changeFormVisible"
      :close-on-click-modal="false"
      label-width="100%"
    >
      <el-form ref="Info" :model="pitch_info" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="pitch_info.title" clearable />
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="pitch_info.link" clearable />
        </el-form-item>
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
  getSlideshowList,
  instertSlideshow,
  upSlideshow,
  delSlideshow
} from '@/api/home'

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
        title: '',
        imageUrl: '',
        link: ''
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
      const para = { name: this.name }
      getSlideshowList(para).then((res) => {
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
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.capitalList = this.shuzu.slice(
        (this.pageNo - 1) * this.pageSize,
        this.pageSize * this.pageNo
      )
    },
    handleCurrentChange(val) {
      this.pageNo = val
      this.capitalList = this.shuzu.slice(
        (this.pageNo - 1) * this.pageSize,
        this.pageSize * this.pageNo
      )
    },
    openAdd() {
      this.addFormVisible = true
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        if(this.pitch_info.id) this.pitch_info.img = res.data
        else this.Info.imageUrl = res.data
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
      const { title, link, imageUrl } = this.Info
      if (!title || !link || !imageUrl) {
        this.$message.warning('不能为空')
        return
      }
      const params = { title, link, img: imageUrl }
      instertSlideshow(params).then((res) => {
        if (res.code != 200) this.$message.warning(res.msg)
        this.Info = { title: '', link: '', imageUrl: '' }
        this.addFormVisible = false
        this.getList()
      })
    },
    openUpdate(row) {
      this.changeFormVisible = true
      this.pitch_info = row
    },
    update() {
      const { id, title, link, img } = this.pitch_info
      if (!id || !title || !link || !img) {
        this.$message.warning('不能为空')
        return
      }
      const params = { id, title, link, img }
      upSlideshow(params).then((res) => {
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
      delSlideshow({ id: row.id }).then((res) => {
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
