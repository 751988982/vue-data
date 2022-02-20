<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-form :inline="true">
        <el-form-item label="分类：">
          <el-select v-model="game_type" clearable>
            <el-option
              v-for="item in gameList"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="date">
          <el-form-item label="时间：">
            <el-date-picker
              v-model="endTime"
              type="datetimerange"
              align="center"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">查询</el-button>
        </el-form-item>
        <el-form-item style="float: right; width: 140px">
          <el-button
            type="success"
            @click="addFormVisible = true"
          >新增</el-button>
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
        prop="time"
        label="时间"
        width="200"
        sortable
        align="center"
        :formatter="formTime"
      />
      <el-table-column
        prop="id"
        label="历史票"
        width="200"
        sortable
        align="center"
      />
      <el-table-column
        prop="status"
        label="类型"
        width="200"
        sortable
        align="center"
        :formatter="formStatus"
      />
      <el-table-column align="center" label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            @click="openGet(scope.row)"
          >查询文案</el-button>
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
      title="新增历史票"
      :visible.sync="addFormVisible"
      :close-on-click-modal="false"
      label-width="100%"
    >
      <el-form ref="channlInfo" :model="channlInfo" label-width="100px">
        <el-form-item label="历史票">
          <el-input v-model="channlInfo.id" clearable />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="channlInfo.status" clearable>
            <el-option
              v-for="item in payType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="channlInfo.game_type" clearable>
            <el-option
              v-for="item in gameList"
              :key="item.type"
              :label="item.name"
              :value="item.type"
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
      title="修改历史票"
      :visible.sync="changeFormVisible"
      :close-on-click-modal="false"
      label-width="100%"
    >
      <el-form ref="pitch_info" :model="pitch_info" label-width="100px">
        <el-form-item label="历史票">
          <el-input v-model="pitch_info.id" clearable />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="pitch_info.status">
            <el-option
              v-for="item in payType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="pitch_info.game_type" clearable>
            <el-option
              v-for="item in gameList"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkChannl">确定</el-button>
          <el-button @click="changeFormVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--查询界面-->
    <el-dialog
      title="文案列表"
      :visible.sync="listFormVisible"
      :close-on-click-modal="false"
      label-width="100%"
    >
      <el-form :inline="true">
        <el-form-item label="追踪票:">
          <el-input
            v-model="query"
            auto-complete="off"
            style="width: 160px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getBillInfo()">查询</el-button>
        </el-form-item>
        <el-form-item style="float: right; width: 140px">
          <el-button
            type="success"
            @click="addBillFormVisible = true"
          >新增</el-button>
        </el-form-item>
      </el-form>
      <!--列表-->
      <el-table
        v-loading="payListLoading"
        :data="billList"
        border
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="200"
          sortable
        />
        <el-table-column
          prop="bill"
          label="追踪票"
          width="120"
          sortable
        />
        <el-table-column
          prop="title"
          label="标题"
          width="200"
          sortable
        />
        <el-table-column label="时间" width="120" sortable>
          <template slot-scope="{ row }">
            <span>{{ new Date(row.time).toLocaleDateString() }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="240">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              @click="openChangeBill(scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              @click="dropBill(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--新增界面-->
    <el-dialog
      title="新增文案"
      :visible.sync="addBillFormVisible"
      :close-on-click-modal="false"
      :fullscreen="true"
      label-width="100%"
    >
      <el-form ref="billInfo" :model="billInfo" label-width="100px">
        <el-form-item label="追踪票">
          <el-input v-model="billInfo.bill" clearable />
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="billInfo.title" clearable />
        </el-form-item>
        <el-form-item label="内容">
          <tinymce v-model="billInfo.txt" :height="300" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="inertBill"> 创建 </el-button>
          <el-button @click="addBillFormVisible = false"> 关闭 </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--修改界面-->
    <el-dialog
      title="修改文案"
      :visible.sync="upBillFormVisible"
      :close-on-click-modal="false"
      :fullscreen="true"
      label-width="100%"
    >
      <el-form ref="bill_info" :model="bill_info" label-width="100px">
        <el-form-item label="追踪票">
          <el-input v-model="bill_info.bill" clearable />
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="bill_info.title" clearable />
        </el-form-item>
        <el-form-item label="内容">
          <tinymce v-model="bill_info.txt" :height="300" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateBill"> 创建 </el-button>
          <el-button @click="upBillFormVisible = false"> 关闭 </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import {
  getGameTypeList,
  getBillTypeList,
  insertBillType,
  upBillType,
  delBillType,
  getBillList,
  insertBillInfo,
  upBillInfo,
  delBillInfo
} from '@/api/game'

import Tinymce from '@/components/Tinymce'

export default {
  components: { Tinymce },
  data() {
    return {
      game_type: '',
      endTime: [],
      gameList: [],
      channlList: [],
      shuzu: [],
      query: '',
      billList: [],
      total: 0,
      pageNo: 1,
      pageSize: 10,
      listLoading: false,
      payListLoading: false,
      channlInfo: {
        id: '',
        status: '',
        game_type: ''
      },
      billInfo: {
        bill: '',
        title: '',
        txt: ''
      },
      addFormVisible: false,
      listFormVisible: false,
      changeFormVisible: false,
      addBillFormVisible: false,
      upBillFormVisible: false,
      // 选中的数据
      pitch_info: {},
      bill_info: {},
      payType: [
        { value: 0, label: '付费' },
        { value: 1, label: '免费' }
      ]
    }
  },
  mounted() {
    this.getList()
    console.log('加载', this.gameList)
  },
  methods: {
    formStatus: function(row, column) {
      const data = this.payType.find((data) => {
        return (data.value = row.status)
      })
      if (data) return data.label
      else return ''
    },
    formTime: function(row, column) {
      return new Date(row.time).toLocaleDateString()
    },
    async getList() {
      if (this.gameList.length == 0) {
        const data = await getGameTypeList({ guishu: 1 })
        if (data.code == 200) this.gameList = data.data.list
        this.game_type = this.gameList[0].type || 0
      }
      const game_type = this.game_type || this.gameList[0].type || 0
      this.listLoading = true
      const res = await getBillTypeList({ game_type })
      if (res.code == 200) {
        this.total = res.data.list.length
        this.shuzu = res.data.list
        this.channlList = this.shuzu.slice(
          (this.pageNo - 1) * this.pageSize,
          this.pageSize * this.pageNo
        )
      } else {
        this.$message.error(res.msg)
      }
      this.listLoading = false
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.channlList = this.shuzu.slice(
        (this.pageNo - 1) * this.pageSize,
        this.pageSize * this.pageNo
      )
    },
    handleCurrentChange(val) {
      this.pageNo = val
      this.channlList = this.shuzu.slice(
        (this.pageNo - 1) * this.pageSize,
        this.pageSize * this.pageNo
      )
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
        this.$message.warning('请重新填写')
        return
      }
      upBillType(this.pitch_info).then((res) => {
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
      delBillType({ id: row.id }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addChannlAsync() {
      insertBillType(this.channlInfo).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.getList()
          this.addFormVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    openGet(row) {
      this.pitch_info = row
      if (!row.id) {
        this.$message.warning('请选中一行数据')
        return
      }
      this.listFormVisible = true
      this.getBillInfo()
    },
    getBillInfo() {
      const { id } = this.pitch_info
      if (!id) {
        this.$message.warning('请选中一行数据')
        return
      }
      const info = { old_bill: id, bill: this.query }
      this.payListLoading = true
      getBillList(info).then((res) => {
        if (res.code != 200) return this.$message.success(res.msg)
        this.billList = res.data.list
        this.payListLoading = false
      })
    },
    openChangeBill(row) {
      this.bill_info = row
      if (!row.id) {
        this.$message.warning('请选中一行数据')
        return
      }
      this.upBillFormVisible = true
    },
    updateBill() {
      const { id, bill, title, txt } = this.bill_info
      const old_bill = this.pitch_info.id
      if (!old_bill) {
        this.$message.warning('请选中一行数据')
        return
      }
      const info = { id, old_bill, bill, title, txt }
      if (!id || !old_bill || !bill || !title || !txt) {
        this.$message.warning('数据不能为空')
        return
      }
      this.payListLoading = true
      upBillInfo(info).then((res) => {
        if (res.code != 200) return this.$message.success(res.msg)
        this.payListLoading = false
        this.upBillFormVisible = false
        this.getBillInfo()
      })
    },
    dropBill(row) {
      if (!row.id) {
        this.$message.warning('请选中一行数据')
        return
      }
      delBillInfo({ id: row.id }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.getBillInfo()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    inertBill() {
      const { bill, title, txt } = this.billInfo
      const old_bill = this.pitch_info.id
      if (!old_bill) {
        this.$message.warning('请选中一行数据')
        return
      }
      const info = { old_bill, bill, title, txt }
      if (!old_bill || !bill || !title || !txt) {
        this.$message.warning('数据不能为空')
        return
      }
      this.payListLoading = true
      insertBillInfo(info).then((res) => {
        if (res.code != 200) return this.$message.success(res.msg)
        this.payListLoading = false
        this.addBillFormVisible = false
        this.getBillInfo()
      })
    }
  }
}
</script>

<style scoped>
</style>
