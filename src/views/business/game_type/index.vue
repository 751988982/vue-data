<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-form :inline="true">
        <el-form-item>
          <el-select v-model="game">
            <el-option
              v-for="item in gameList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">查询</el-button>
        </el-form-item>
        <el-form-item style="float: right; width: 140px">
          <el-button type="success" @click="addFormVisible = true"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 表格 -->
    <el-table
      ref="userTable"
      v-loading="listLoading"
      :data="channlList"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" width="80" />
      <el-table-column
        prop="id"
        label="ID"
        width="200"
        sortable
        align="center"
      />
      <el-table-column
        prop="name"
        label="名称"
        width="200"
        sortable
        align="center"
      />
      <el-table-column
        prop="type"
        label="类型"
        width="200"
        sortable
        align="center"
      />
      <el-table-column
        prop="guishu"
        label="归属"
        width="200"
        sortable
        align="center"
        :formatter="formName"
      />
      <el-table-column align="center" label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            @click="openChangeChannl(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="removeChannl(scope.row)"
            >删除</el-button
          >
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
      <el-form ref="channlInfo" :model="channlInfo" label-width="100px">
        <el-form-item label="名称">
          <el-input v-model="channlInfo.name" clearable />
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="channlInfo.type" clearable />
        </el-form-item>
        <el-form-item label="归属">
          <el-select v-model="channlInfo.guishu" clearable>
            <el-option
              v-for="item in gameList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addChannlAsync"> 创建 </el-button>
          <el-button @click="addFormVisible = false"> 关闭 </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--修改界面-->
    <el-dialog
      title="修改"
      :visible.sync="changeFormVisible"
      :close-on-click-modal="false"
      label-width="100%"
    >
      <el-form ref="pitch_info" :model="pitch_info" label-width="100px">
        <el-form-item label="名称">
          <el-input v-model="pitch_info.name" />
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="pitch_info.type" clearable />
        </el-form-item>
        <el-form-item label="归属">
          <el-select v-model="channlInfo.guishu" clearable>
            <el-option
              v-for="item in gameList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkChannl">确定</el-button>
          <el-button @click="changeFormVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import {
  getGameTypeList,
  insertGameType,
  upGameType,
  delGameType,
} from "@/api/game";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      game: 1,
      channlList: [],
      fileList: [],
      listLoading: false,
      channlInfo: {
        name: "",
        type: "",
        guishu: "",
      },
      addFormVisible: false,
      changeFormVisible: false,
      // 选中的数据
      pitch_info: {},
    };
  },
  computed: {
    ...mapGetters(["gameList"]),
  },
  mounted() {
    this.getList();
  },
  methods: {
    formName: function (row, column) {
      const list = this.gameList;
      const data = list.filter((data) => {
        return data.id == row.guishu;
      });      
      if (data.length > 0) return data[0].name;
      else return "";
    },
    getList() {
      const guishu = this.game;
      getGameTypeList({ guishu }).then((res) => {
        this.listLoading = false;
        if (res.code == 200) {
          if (res.data) {
            this.channlList = res.data.list;
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    openChangeChannl: function (row) {
      this.pitch_info = row;
      if (!row.id) {
        this.$message.warning("请选中一行数据");
        return;
      }
      this.addLoading = false;
      this.changeFormVisible = true;
    },
    checkChannl() {
      if (!this.pitch_info.id) {
        this.$message.warning("请重新填写");
        return;
      }
      upGameType(this.pitch_info).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.getList();
          this.changeFormVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    removeChannl(row) {
      if (!row.id) {
        this.$message.warning("请选中一行数据");
        return;
      }
      delGameType({ id: row.id }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.getList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    addChannlAsync() {
      if(!(parseInt(this.channlInfo.type) > 0)) {
         this.$message.warning("类型请填写唯一的数字");
        return;
      }
      insertGameType(this.channlInfo).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.getList();
          this.addFormVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
