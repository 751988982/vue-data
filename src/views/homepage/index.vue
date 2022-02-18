<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-input style="width: 200px;" v-model="name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 80px;"
            type="primary"    
            @click="getList"
          >{{$t('buttonInfo.query')}}</el-button>
        </el-form-item>        
        <el-form-item style="float: right;width: 140px;">
          <el-button type="success" @click="openAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="userList"
      border
      fit
      ref="userTable"
      highlight-current-row      
      style="width: 100%"
    >
      <el-table-column type="index" width="80"></el-table-column>
      <el-table-column width="80px" align="center" prop="id" label="ID"></el-table-column>
      <el-table-column width="120px" align="center" prop="title" label="标题"></el-table-column>

      <el-table-column width="300px" label="图片">
        <template slot-scope="{row}">           
          <el-image style="width: 100px; height: 100px"
            :src="row.url"></el-image>
        </template>
      </el-table-column>      
      <el-table-column width="120px" align="center" prop="link" label="连接"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-col :span="24" class="toolbar">
      <el-pagination        
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-col>
    <!--新增界面-->
    <el-dialog
      title="新增轮播图"
      :visible.sync="addFormVisible"
      :close-on-click-modal="false"
      label-width="100%"
    >
      <el-form :model="Info" ref="Info" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="Info.title" clearable ></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="Info.link" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action="/api/home/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="Info.imageUrl" :src="Info.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确定</el-button>          
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import { getSlideshowList } from '@/api/home'
import { validAlphabets } from "@/utils/validate";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      userList: [],
      shuzu: [],
      total: 0,
      pageNo: 1,
      pageSize: 20,
      listLoading: false,
      Info: {        
        title: "",
        imageUrl: "",
        link: "",        
      },
      addFormVisible: false,
      addFormPassword: false,
      changeFormVisible: false,      
      //选中的数据
      pitch_info: {},
      pwdInfo: {
        user_name: "",
        pass: "",
        checkPass: "",
      },
    };
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
   getList() {     
     let para = { name: this.name };
      getSlideshowList(para).then((res) => {
        this.listLoading = false;
        if (res.code == 200) {            
            this.total = res.data.list.length;
            this.shuzu = res.data.list;
            this.userList = this.shuzu.slice(
              (this.pageNo - 1) * this.pageSize,
              this.pageSize * this.pageNo
            );  
        } else {
          this.$message.error(res.msg);
        }
      });      
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.capitalList = this.shuzu.slice(
        (this.pageNo - 1) * this.pageSize,
        this.pageSize * this.pageNo
      );
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.capitalList = this.shuzu.slice(
        (this.pageNo - 1) * this.pageSize,
        this.pageSize * this.pageNo
      );
    },
    openAdd(){
      this.addFormVisible = true;
    },
    handleAvatarSuccess(res, file) {
      console.warn(res);
      console.warn(file);
      if(res.code == 200){
        this.Info.imageUrl = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  mounted() {
    this.getList();
  },
};
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
    border-color: #409EFF;
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