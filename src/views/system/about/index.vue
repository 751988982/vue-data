<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">        
        <el-form-item style="float: right; width: 140px">
          <el-button type="success" @click="openAddChannl">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="channlList"
      border
      style="width: 100%"
    >
      <el-table-column prop="txt" label="内容" width="100" type="expand">
        <template slot-scope="{ row }">
          <el-card :body-style="{ padding: '0px' }">
            <div class="editor-content" v-html="row.txt" />
          </el-card>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="200" sortable align="center" />      
      <el-table-column align="center" label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            @click="openChangeChannl(scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="small"
            @click="removeChannl(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新增界面-->
    <el-dialog
      title="新增"
      :visible.sync="addFormVisible"
      :close-on-click-modal="false"
      :fullscreen="true"
      label-width="100%"
    >
      <el-form ref="channlInfo" :model="channlInfo" label-width="100px">       
        <el-form-item label="内容">
          <tinymce v-model="channlInfo.txt" :height="300" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addChannlAsync">创建</el-button>
          <el-button @click="addFormVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--修改界面-->
    <el-dialog
      title="修改"
      :visible.sync="changeFormVisible"
      :close-on-click-modal="false"
      :fullscreen="true"
      label-width="100%"
    >
      <el-form ref="pitch_info" :model="pitch_info" label-width="100px">        
        <el-form-item label="内容">
          <tinymce v-model="pitch_info.txt" :height="300" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkChannl">创建</el-button>
          <el-button @click="changeFormVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import {
 getAboutList,    
    upAbout,
    insertAbout,
    delAbout,
} from '@/api/system'

import Tinymce from '@/components/Tinymce'

export default {
  components: { Tinymce },
  data() {
    return {
      name: '',
      channlList: [],
      listLoading: false,
      channlInfo: {        
        txt: ''
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
      getAboutList().then(res => {
        this.listLoading = false
        if (res.code == 200) {
          if (res.data) {
            this.channlList = res.data.list
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    openAddChannl: function() {
      this.addLoading = false
      this.addFormVisible = true
    },    
    openChangeChannl: function(row) {
      this.pitch_info = row
      if (!row.id) {
        this.$message.warning('请选中一行数据')
        return
      }      
      this.addLoading = false
      this.changeFormVisible = true
    },
    checkChannl() {
      if (!this.pitch_info.id) {
        this.$message.warning('请选中一行数据')
        return
      }      
      upAbout(this.pitch_info).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.getList()
          this.changeFormVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    removeChannl(row) {
      if (!row.id) {
        this.$message.warning('请选中一行数据')
        return
      }
      delAbout({ id: row.id }).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addChannlAsync() {
      insertAbout(this.channlInfo).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.getList()
          this.addFormVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
