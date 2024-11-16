<template>
	<div class="app-container">
		<el-form :model="queryParams" ref="queryRef" :inline="true"
			style="display: flex; justify-content: space-between;flex-wrap: wrap;">
			<el-form-item label="检测单位名称" prop="jcdwmc">
				<el-input v-model="queryParams.jcdwmc" placeholder="请输入检测单位名称" clearable style="width: 200px"
					@keyup.enter="handleQuery" />
			</el-form-item>

			<el-form-item label="工程名称" prop="gcmc">
				<el-input v-model="queryParams.gcmc" placeholder="请输入工程名称" clearable style="width: 200px"
					@keyup.enter="handleQuery" />
			</el-form-item>

			<el-form-item label="施工单位" prop="sgdw">
				<el-input v-model="queryParams.sgdw" placeholder="请输入施工单位" clearable style="width: 200px"
					@keyup.enter="handleQuery" />
			</el-form-item>

			<el-form-item label="监理单位" prop="jldw" label-width="">
				<el-input v-model="queryParams.jldw" placeholder="请输入监理单位" clearable style="width: 200px"
					@keyup.enter="handleQuery" />
			</el-form-item>

			<el-form-item label="合同段" prop="htd">
				<el-input v-model="queryParams.htd" placeholder="请输入合同段" clearable style="width: 200px"
					@keyup.enter="handleQuery" />
			</el-form-item>

			<el-form-item label="记录编号" prop="jlbh">
				<el-input v-model="queryParams.jlbh" placeholder="请输入记录编号" clearable style="width: 200px"
					@keyup.enter="handleQuery" />
			</el-form-item>

			<el-form-item label="主要仪器设备名称及编号" prop="zyyqsbmcjbh">
				<el-input v-model="queryParams.zyyqsbmcjbh" placeholder="请输入主要仪器设备名称及编号" clearable style="width: 200px"
					@keyup.enter="handleQuery" />
			</el-form-item>

			<el-form-item label="取样地点" prop="qydd">
				<el-input v-model="queryParams.qydd" placeholder="请输入取样地点" clearable style="width: 200px"
					@keyup.enter="handleQuery" />
			</el-form-item>

			<el-form-item label="集料产地" prop="jlcd">
				<el-input v-model="queryParams.jlcd" placeholder="请输入集料产地" clearable style="width: 200px"
					@keyup.enter="handleQuery" />
			</el-form-item>

			<el-form-item>
				<el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
				<el-button icon="Refresh" @click="resetQuery">重置</el-button>
				<el-button icon="Edit" @click="seeRecord">查看</el-button>
			</el-form-item>

		</el-form>

		<el-table v-if="refreshTable" v-loading="loading" :data="cx02List" row-key="id">
			<el-table-column prop="id" label="ID" width="60"></el-table-column>
			<el-table-column prop="jcdwmc" label="检测单位名称" width="260"></el-table-column>
			<el-table-column prop="gcmc" label="工程名称" width="200"></el-table-column>
			<el-table-column prop="jlbh" label="记录编号" width="150"></el-table-column>
			<el-table-column prop="htd" label="合同段" width="150"></el-table-column>
			<el-table-column prop="sgdw" label="施工单位" width="150"></el-table-column>
			<el-table-column prop="jldw" label="监理单位" width="150"></el-table-column>
			<el-table-column prop="gcbw_yt" label="工程部位/用途" width="150"></el-table-column>
			<el-table-column prop="ypxx" label="样品信息" width="150"></el-table-column>
			<el-table-column prop="sytj" label="试验条件" width="150"></el-table-column>
			<el-table-column prop="jcyj" label="检测依据" width="150"></el-table-column>
			<el-table-column prop="pdyj" label="判定依据" width="150"></el-table-column>
			<el-table-column prop="zyyqsbmcjbh" label="主要仪器设备名称及编号" width="150"></el-table-column>
			<el-table-column prop="qydd" label="取样地点" width="150"></el-table-column>
			<el-table-column prop="pzgg" label="品种规格" width="150"></el-table-column>
			<el-table-column prop="jlcd" label="集料产地" width="150"></el-table-column>
			<!-- <el-table-column prop="position" label="位置经纬度" width="260"></el-table-column> -->

			<el-table-column label="创建时间" align="center" prop="createTime" width="150">
				<template #default="scope">
					<span>{{ parseTime(scope.row.createTime) }}</span>
				</template>
			</el-table-column>
			<el-table-column label="更新时间" align="center" prop="updateTime" width="150">
				<template #default="scope">
					<span>{{ parseTime(scope.row.updateTime) }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template #default="scope">
					<el-button link type="primary" icon="Edit" @click="seeRecord(scope.row)">查看</el-button>
					<!-- <el-button link type="primary" icon="Plus" @click="handleAdd(scope.row)" >新增</el-button>
		         <el-button v-if="scope.row.parentId != 0" link type="primary" icon="Delete" @click="handleDelete(scope.row)" >删除</el-button> -->
					<el-button v-if="scope.row.parentId != 0" link type="primary" icon="Delete"
						@click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
			v-model:limit="queryParams.pageSize" @pagination="getList" />

		<!-- 添加或修改用户配置对话框 -->
		<el-dialog :title="title" v-model="open" width="880px" append-to-body>
			<el-form :model="form" :rules="rules" ref="cx02Ref" label-width="0px">
				<table id="cx02Table" border="0" cellpadding="0" cellspacing="0" width="653"
					style="border-collapse: collapse; table-layout: fixed; width: 488pt;">
					<col class="xl66" width="56" span="2"
						style="mso-width-source: userset; mso-width-alt: 1792; width: 42pt;">
					<col class="xl66" width="97" style="mso-width-source: userset; mso-width-alt: 3104; width: 73pt;">
					<col class="xl66" width="67" style="mso-width-source: userset; mso-width-alt: 2144; width: 50pt;">
					<col class="xl66" width="47" style="mso-width-source: userset; mso-width-alt: 1504; width: 35pt;">
					<col class="xl66" width="55" span="6"
						style="mso-width-source: userset; mso-width-alt: 1760; width: 41pt;">
					<tr height="21" style="mso-height-source: userset; height: 16.15pt;">
						<td colspan="2" height="21" class="xl78" width="112" style="height: 16.15pt; width: 84pt"><a
								name="Print_Area">细集料试表CX02</a></td>
						<td class="xl67" width="97" style="width: 73pt"></td>
						<td class="xl67" width="67" style="width: 50pt"></td>
						<td class="xl67" width="47" style="width: 35pt"></td>
						<td class="xl67" width="55" style="width: 41pt"></td>
						<td class="xl67" width="55" style="width: 41pt"></td>
						<td class="xl67" width="55" style="width: 41pt"></td>
						<td class="xl67" width="55" style="width: 41pt"></td>
						<td colspan="2" class="xl68" width="110" style="width: 82pt">第 页，共 页</td>
					</tr>

					<tr height="35" style="mso-height-source: userset; height: 26.25pt;">
						<td height="35" class="xl68" style="height: 26.25pt"></td>
						<td class="xl69" width="56" style="width: 42pt"></td>
						<td colspan="7" class="xl79" width="431" style="width: 322pt">细集料堆积密度、空隙率试验检测记录表</td>
						<td colspan="2" class="xl80" width="110" style="width: 82pt"></td>
					</tr>

					<tr height="40" style="mso-height-source: userset; height: 30.0pt;">
						<td colspan="2" height="40" class="xl81" style="height: 30.0pt">检测单位名称:</td>
						<td colspan="5" class="xl83" width="110" style="width: 82pt; padding-top: 15px;">
							<!-- 与前端校验规则进行绑定，限制校验信息是否输出 -->
							<el-form-item prop="jcdwmc" :rules="rules.jcdwmc.rules" :error="errorsMsg.jcdwmc.errMsg"
								:show-message="errorsMsg.jcdwmc.hasError">
								<el-input v-model="form.jcdwmc" clearable /> <span
									class="hidden-span">{{form.jcdwmc}}</span>
							</el-form-item>
						</td>
						<td colspan="2" class="xl85" width="110" style="width: 82pt">记录编号:</td>
						<td colspan="2" class="xl83" width="110" style="width: 82pt;padding-top: 15px;">
							<el-form-item prop="jlbh" :rules="rules.jlbh.rules" :error="errorsMsg.jlbh.errMsg"
								:show-message="errorsMsg.jlbh.hasError">
								<el-input v-model="form.jlbh" clearable /> <span
									class="hidden-span">{{form.jlbh}}</span>
							</el-form-item>
						</td>
					</tr>
					<!-- <tr height="0" style="display:none; mso-height-source:userset; mso-height-alt: 255">
						<td colspan="2" class="xl87" width="112" style="width: 84pt">　</td>
						<td colspan="4" class="xl70" width="266" style="border-left:none; width: 199pt">　</td>
						<td colspan="2" class="xl70" width="110" style="border-left:none; width: 82pt">　</td>
						<td colspan="3" class="xl90" width="165" style="border-left:none; width: 123pt">　</td>
					</tr>
					<tr height="0" style="display:none; mso-height-source:userset; mso-height-alt: 255">
						<td colspan="2" class="xl87" width="112" style="width: 84pt">　</td>
						<td colspan="4" class="xl70" width="266" style="border-left:none; width: 199pt">　</td>
						<td colspan="2" class="xl70" width="110" style="border-left:none; width: 82pt">　</td>
						<td colspan="3" class="xl90" width="165" style="border-left:none; width: 123pt">　</td>
					</tr> -->
					<tr height="30" style="mso-height-source: userset; height: 22.9pt;">
						<td colspan="2" height="30" class="xl87" width="112" style="height: 22.9pt; width: 84pt">工程名称
						</td>
						<td colspan="4" class="xl70" style="border-left: none; width: 199pt; padding: 0;">
						    <el-form-item 
						        prop="gcmc" 
						        :rules="rules.gcmc.rules" 
						        :error="errorsMsg.gcmc.errMsg" 
						        :show-message="errorsMsg.gcmc.hasError"
						        style="margin: 0;"
						    >
						        <el-input 
						            v-model="form.gcmc" 
						            clearable 
						            style="width: 100%; height: 100%; box-sizing: border-box;"
						        />
						    </el-form-item>
						    <!-- 同步显示输入值的隐藏文本，供导出 Excel 使用 -->
						    <span style="display: none;">{{ form.gcmc }}</span>
						</td>

						<td colspan="2" class="xl70" width="110" style="border-left:none; width: 82pt">合同段</td>
						<td colspan="3" class="xl90" width="165" style="border-left:none; width: 123pt"><span
								style="mso-spacerun:yes">&nbsp; </span>string</td>
					</tr>
					<tr height="30" style="mso-height-source: userset; height: 22.9pt;">
						<td colspan="2" height="30" class="xl87" width="112" style="height: 22.9pt; width: 84pt">施工单位
						</td>
						<td colspan="4" class="xl70" width="266" style="border-left:none; width: 199pt"><span
								style="mso-spacerun:yes">&nbsp;&nbsp; </span>string</td>
						<td colspan="2" class="xl70" width="110" style="border-left:none; width: 82pt">监理单位</td>
						<td colspan="3" class="xl90" width="165" style="border-left:none; width: 123pt"><span
								style="mso-spacerun:yes">&nbsp; </span>string<span
								style="mso-spacerun:yes">&nbsp;</span></td>
					</tr>
					<tr height="30" style="mso-height-source: userset; height: 22.9pt;">
						<td colspan="2" height="30" class="xl87" width="112" style="height: 22.9pt; width: 84pt">工程部位/用途
						</td>
						<td colspan="9" class="xl92" width="541" style="border-left:none; width: 404pt"><span
								style="mso-spacerun:yes">&nbsp; </span>string</td>
					</tr>
					<tr height="30" style="mso-height-source: userset; height: 22.9pt;">
						<td colspan="2" height="30" class="xl87" width="112" style="height: 22.9pt; width: 84pt">样品信息
						</td>
						<td colspan="9" class="xl92" width="541" style="border-left:none; width: 404pt"><span
								style="mso-spacerun:yes">&nbsp;&nbsp; </span>string</td>
					</tr>
					<tr height="41" style="mso-height-source: userset; height: 31.15pt;">
						<td colspan="2" height="41" class="xl87" width="112" style="height: 31.15pt; width: 84pt">试验检测日期
						</td>
						<td colspan="4" class="xl70" width="266" style="border-left:none; width: 199pt">Year-month-day
						</td>
						<td colspan="2" class="xl70" width="110" style="border-left:none; width:82pt">试验条件</td>
						<td colspan="3" class="xl94" width="165" style="border-left:none; width:123pt">温度：<span
								style="mso-spacerun:yes">&nbsp; </span>℃ ，相对湿度：<span style="mso-spacerun:yes">&nbsp;
							</span>%</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td colspan="2" height="30" class="xl87" width="112" style="height:22.9pt;width:84pt">检测依据</td>
						<td colspan="4" class="xl70" width="266" style="border-left:none;width:199pt"><span
								style="mso-spacerun:yes">&nbsp; </span>string</td>
						<td colspan="2" class="xl70" width="110" style="border-left:none;width:82pt">判定依据</td>
						<td colspan="3" class="xl90" width="165" style="border-left:none;width:123pt"><span
								style="mso-spacerun:yes">&nbsp; </span>string</td>
					</tr>
					<tr height="40" style="mso-height-source:userset;height:30.0pt">
						<td colspan="2" height="40" class="xl87" width="112" style="height:30.0pt;width:84pt">
							主要仪器设备<br>名称及编号</td>
						<td colspan="9" class="xl92" width="541" style="border-left:none;width:404pt"><span
								style="mso-spacerun:yes">&nbsp;&nbsp; </span>string</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td colspan="2" height="30" class="xl87" width="112" style="height:22.9pt;width:84pt">取样地点</td>
						<td class="xl72" width="97" style="border-top:none;border-left:none;width:73pt"><span
								style="mso-spacerun:yes">&nbsp; </span>string</td>
						<td class="xl72" width="67" style="border-top:none;width:50pt">取样日期</td>
						<td colspan="2" class="xl72" width="102" style="width:76pt">Year-month-day</td>
						<td colspan="2" class="xl70" width="110" style="width:82pt">代表数量(m³)</td>
						<td colspan="3" class="xl90" width="165" style="border-left:none;width:123pt">Float</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td colspan="2" height="30" class="xl87" width="112" style="height:22.9pt;width:84pt">集料产地</td>
						<td colspan="4" class="xl70" width="266" style="border-left:none;width:199pt"><span
								style="mso-spacerun:yes">&nbsp; </span>string</td>
						<td colspan="2" class="xl70" width="110" style="border-left:none;width:82pt">品种规格</td>
						<td colspan="3" class="xl90" width="165" style="border-left:none;width:123pt"><span
								style="mso-spacerun:yes">&nbsp; </span>string</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td colspan="5" height="30" class="xl87" width="323" style="height:22.9pt;width:242pt">试验次数</td>
						<td colspan="3" class="xl70" width="165" style="border-left:none;width:123pt">1</td>
						<td colspan="3" class="xl90" width="165" style="border-left:none;width:123pt">2</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td rowspan="4" height="120" class="xl87" width="56"
							style="height:91.6pt;border-top:none;width:42pt">容量筒容积校正</td>
						<td colspan="4" class="xl70" width="267" style="border-left:none;width:200pt">容量筒和玻璃板总质量(g)</td>
						<td colspan="3" class="xl70" width="165" style="border-left:none;width:123pt">Float（M1）</td>
						<td colspan="3" class="xl90" width="165" style="border-left:none;width:123pt">同左</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td colspan="4" height="30" class="xl70" width="267"
							style="height:22.9pt;border-left:none;width:200pt">容量筒、玻璃板和水总质量(g)</td>
						<td colspan="3" class="xl70" width="165" style="border-left:none;width:123pt">Float（M3）</td>
						<td colspan="3" class="xl90" width="165" style="border-left:none;width:123pt">同左</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td colspan="2" rowspan="2" height="60" class="xl70" width="153"
							style="height:45.8pt;width:115pt">容量筒容积(mL)</td>
						<td colspan="2" class="xl70" width="114" style="border-left:none;width:85pt">单值</td>
						<td colspan="3" class="xl70" width="165" style="border-left:none;width:123pt">V=(M3-M1)/ρ_T</td>
						<td colspan="3" class="xl90" width="165" style="border-left:none;width:123pt">同左</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td colspan="2" height="30" class="xl70" width="114"
							style="height:22.9pt;border-left:none;width:85pt">平均值</td>
						<td colspan="6" class="xl90" width="330" style="border-left:none;width:246pt">V的平均值</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td colspan="5" height="30" class="xl87" width="323" style="height:22.9pt;width:242pt">
							试验温度T时水的密度</td>
						<td colspan="6" class="xl90" width="330" style="border-left:none;width:246pt">Float（ρ_T）</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td colspan="5" height="30" class="xl87" width="323" style="height:22.9pt;width:242pt">
							砂的表观密度(g/cm³)</td>
						<td colspan="6" class="xl90" width="330" style="border-left:none;width:246pt">Float（ρ_砂）</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td colspan="5" height="30" class="xl87" width="323" style="height:22.9pt;width:242pt">容量筒质量(g)
						</td>
						<td colspan="6" class="xl90" width="330" style="border-left:none;width:246pt">Float（M0）</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td rowspan="4" height="120" class="xl87" width="56"
							style="height:91.6pt;border-top:none;width:42pt">堆积密度及空隙率</td>
						<td colspan="4" class="xl70" width="267" style="border-left:none;width:200pt">容量筒和堆积砂的总质量(g)
						</td>
						<td colspan="3" class="xl70" width="165" style="border-left:none;width:123pt">Float（M2）</td>
						<td colspan="3" class="xl90" width="165" style="border-left:none;width:123pt">同左</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td colspan="2" rowspan="2" height="60" class="xl70" width="153"
							style="height:45.8pt;width:115pt">堆积密度(g/cm³)</td>
						<td colspan="2" class="xl70" width="114" style="border-left:none;width:85pt">单值</td>
						<td colspan="3" class="xl70" width="165" style="border-left:none;width:123pt">P=(M2-M0)/V的平均值
						</td>
						<td colspan="3" class="xl90" width="165" style="border-left:none;width:123pt">同左</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td colspan="2" height="30" class="xl70" width="114"
							style="height:22.9pt;border-left:none;width:85pt">平均值</td>
						<td colspan="6" class="xl90" width="330" style="border-left:none;width:246pt">P的平均值</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td colspan="4" height="30" class="xl70" width="267"
							style="height:22.9pt;border-left:none;width:200pt">堆积空隙率(%)</td>
						<td colspan="6" class="xl90" width="330" style="border-left:none;width:246pt">
							K=(1-P的平均值/ρ_砂)*100</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td rowspan="4" height="120" class="xl87" width="56"
							style="height:91.6pt;border-top:none;width:42pt">紧装密度及空隙率</td>
						<td colspan="4" class="xl70" width="267" style="border-left:none;width:200pt">容量筒和紧装砂的总质量(g)
						</td>
						<td colspan="3" class="xl70" width="165" style="border-left:none;width:123pt">Float（M4）</td>
						<td colspan="3" class="xl90" width="165" style="border-left:none;width:123pt">同左</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td colspan="2" rowspan="2" height="60" class="xl70" width="153"
							style="height:45.8pt;width:115pt">紧装密度(g/cm³)</td>
						<td colspan="2" class="xl70" width="114" style="border-left:none;width:85pt">单值</td>
						<td colspan="3" class="xl70" width="165" style="border-left:none;width:123pt">Y=(M4-M0)/V的平均值
						</td>
						<td colspan="3" class="xl90" width="165" style="border-left:none;width:123pt">同左</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td colspan="2" height="30" class="xl70" width="114"
							style="height:22.9pt;border-left:none;width:85pt">平均值</td>
						<td colspan="6" class="xl90" width="330" style="border-left:none;width:246pt">Y的平均值</td>
					</tr>
					<tr height="30" style="mso-height-source:userset;height:22.9pt">
						<td colspan="4" height="30" class="xl70" width="267"
							style="height:22.9pt;border-left:none;width:200pt">紧装空隙率(%)</td>
						<td colspan="6" class="xl90" width="330" style="border-left:none;width:246pt">
							T=(1-Y的平均值/ρ_砂)*100</td>
					</tr>
					<tr height="60" style="mso-height-source:userset;height:45.0pt">
						<td colspan="11" height="60" class="xl121" width="653"
							style="height:45.0pt;width:488pt;text-align: left; padding-left: 0;">
							附加声明：<span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp;&nbsp; </span>string</td>
					</tr>
					<tr height="35" style="mso-height-source:userset;height:26.25pt">
						<td height="35" class="xl118" style="height:26.25pt">检测:</td>
						<td colspan="2" class="xl77"></td>
						<td class="xl119">记录:</td>
						<td class="xl119"></td>
						<td class="xl68">复核:</td>
						<td colspan="2" class="xl119"></td>
						<td class="xl77">日期:</td>
						<td colspan="2" class="xl120"></td>
					</tr>
					<![if supportMisalignedColumns]>
					<tr height="0" style="display:none">
						<td width="56" style="width:42pt"></td>
						<td width="56" style="width:42pt"></td>
						<td width="97" style="width:73pt"></td>
						<td width="67" style="width:50pt"></td>
						<td width="47" style="width:35pt"></td>
						<td width="55" style="width:41pt"></td>
						<td width="55" style="width:41pt"></td>
						<td width="55" style="width:41pt"></td>
						<td width="55" style="width:41pt"></td>
						<td width="55" style="width:41pt"></td>
						<td width="55" style="width:41pt"></td>
					</tr>
					<![endif]>
				</table>
			</el-form>
			<template #footer>
				<div class="dialog-footer" style="text-align: center;">
					<el-button type="primary" icon="Edit" @click="handleUpdate()">修改</el-button>
					<el-button type="primary" @click="genExcel">导出表格</el-button>
					<el-button @click="cancel">取 消</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="cx02">
	import {
		h
	} from 'vue';

	import {
		ref,
		watch,
		computed
	} from 'vue';

	import {
		listcx02,
		updateCX02,
		deleteCX02
	} from '../../../api/business/christine/cx02';
	import $ from 'jquery';

	import {
		getTestReportCX02
	} from '../../../api/business/christine/cx02';

	const cx02List = ref([]);
	const {
		proxy
	} = getCurrentInstance();
	const showSearch = ref(true);
	const loading = ref(false);
	const refreshTable = ref(true);
	const total = ref(0);
	const title = ref("");
	const open = ref(false);

	const data = reactive({
		form: {
			id: undefined, // 主键编号
			time: undefined, // 创建时间
			position: undefined, // 位置经纬度
			userid: undefined, // 创建者ID
			jcdwmc: undefined, // 检测单位名称
			jlbh: undefined, // 记录编号
			gcmc: undefined, // 工程名称
			htd: undefined, // 合同段
			sgdw: undefined, // 施工单位
			jldw: undefined, // 监理单位

			gcbw: undefined, // 工程部位/用途
			ypxx: undefined, // 样品信息
			syjcrq: undefined, // 试验检测日期
			sytj: undefined, // 试验条件
			jcyj: undefined, // 检测依据
			pdyj: undefined, // 判定依据
			zyyqsbmcjbh: undefined, // 主要仪器设备名称及编号
			qydd: undefined, // 取样地点
			qyrq: undefined, // 取样日期
			dbsl: undefined, // 代表数量(m^3)
			jlcd: undefined, // 集料产地
			pzgg: undefined, // 品种规格
		},
		queryParams: {
			jcdwmc: undefined,
			gcmc: undefined,
			jldw: undefined,
			htd: undefined,
			jlbh: undefined,
			sgdw: undefined,
			gcbw_yt: undefined,
			ypxx: undefined,
			sytj: undefined,
			jcyj: undefined,
			pdyj: undefined,
			zyyqsbmcjbh: undefined,
			qydd: undefined,
			jlcd: undefined,
			pzgg: undefined,

			pageNum: 1,
			pageSize: 10,
		},
		rules: {
			// 基本信息校验
			jcdwmc: {
				rules: [{
						required: true,
						message: '检测单位名称不能为空！'
					},
					{
						max: 64,
						message: '长度不能超过64个字符！'
					}
				]
			},
			htd: {
				rules: [{
						required: true,
						message: '合同段不能为空！'
					},
					{
						max: 64,
						message: '长度不能超过64个字符！'
					}
				]
			},
			sgdw: {
				rules: [{
						required: true,
						message: '施工单位不能为空！'
					},
					{
						max: 64,
						message: '长度不能超过64个字符！'
					}
				]
			},
			jldw: {
				rules: [{
						required: true,
						message: '监理单位不能为空！'
					},
					{
						max: 64,
						message: '长度不能超过64个字符！'
					}
				]
			},

			// 表单详情校验
			jlbh: {
				rules: [{
						required: true,
						message: '记录编号不能为空！'
					},
					{
						max: 64,
						message: '长度不能超过64个字符！'
					}
				]
			},
			gcmc: {
				rules: [{
						required: true,
						message: '工程名称不能为空！'
					},
					{
						max: 64,
						message: '长度不能超过64个字符！'
					}
				]
			},
			gcbw: {
				rules: [{
						required: true,
						message: '工程部位/用途不能为空！'
					},
					{
						max: 64,
						message: '长度不能超过64个字符！'
					}
				]
			},
			ypxx: {
				rules: [{
						required: true,
						message: '样品信息不能为空！'
					},
					{
						max: 64,
						message: '长度不能超过64个字符！'
					}
				]
			},
			syjcrq: {
				rules: [{
						required: true,
						message: '试验检测日期不能为空！'
					},
					{
						max: 64,
						message: '长度不能超过64个字符！'
					}
				]
			},
			sytj: {
				rules: [{
						required: true,
						message: '试验条件不能为空！'
					},
					{
						max: 64,
						message: '长度不能超过64个字符！'
					}
				]
			},
			jcyj: {
				rules: [{
						required: true,
						message: '检测依据不能为空！'
					},
					{
						max: 64,
						message: '长度不能超过64个字符！'
					}
				]
			},
			pdyj: {
				rules: [{
						required: true,
						message: '判定依据不能为空！'
					},
					{
						max: 64,
						message: '长度不能超过64个字符！'
					}
				]
			},
			zyyqsbmcjbh: {
				rules: [{
						required: true,
						message: '主要仪器设备名称及编号不能为空！'
					},
					{
						max: 64,
						message: '长度不能超过64个字符！'
					}
				]
			},
			qydd: {
				rules: [{
						required: true,
						message: '取样地点不能为空！'
					},
					{
						max: 64,
						message: '长度不能超过64个字符！'
					}
				]
			},
			qyrq: {
				rules: [{
						required: true,
						message: '取样日期不能为空！'
					},
					{
						max: 64,
						message: '长度不能超过64个字符！'
					}
				]
			},

			jlcd: {
				rules: [{
						required: true,
						message: '集料产地不能为空！'
					},
					{
						max: 64,
						message: '长度不能超过64个字符！'
					}
				]
			},


		}, //endrules

		errorsMsg: {
			jcdwmc: {
				hasError: false,
				errMsg: ""
			},
			htd: {
				hasError: false,
				errMsg: ""
			},
			sgdw: {
				hasError: false,
				errMsg: ""
			},
			jldw: {
				hasError: false,
				errMsg: ""
			},
			// 表单详情错误信息
			jlbh: {
				hasError: false,
				errMsg: ""
			},
			gcmc: {
				hasError: false,
				errMsg: ""
			},
			gcbw: {
				hasError: false,
				errMsg: ""
			},
			ypxx: {
				hasError: false,
				errMsg: ""
			},
			syjcrq: {
				hasError: false,
				errMsg: ""
			},
			sytj: {
				hasError: false,
				errMsg: ""
			},
			jcyj: {
				hasError: false,
				errMsg: ""
			},
			pdyj: {
				hasError: false,
				errMsg: ""
			},
			zyyqsbmcjbh: {
				hasError: false,
				errMsg: ""
			},
			qydd: {
				hasError: false,
				errMsg: ""
			},
			qyrq: {
				hasError: false,
				errMsg: ""
			},
			dbsl: {
				hasError: false,
				errMsg: ""
			},
			jlcd: {
				hasError: false,
				errMsg: ""
			},
			pzgg: {
				hasError: false,
				errMsg: ""
			},
		},
	});

	const {
		queryParams,
		form,
		rules,
		errorsMsg
	} = toRefs(data);

	/** 查询列表 */
	function getList() {
		loading.value = true;
		listcx02(queryParams.value).then(response => {
			cx02List.value = response.rows;
			loading.value = false;
			total.value = response.total;
		});
	}

	/** 搜索按钮操作 */
	function handleQuery() {
		getList();
	}
	/**查看按钮操作*/
	function seeRecord(row) {
		form.value = row
		console.log(form.value.jcdwmc)
		title.value = "查看详情"
		open.value = true
	}
	//导出表格
	function genExcel() {
		$('#cx02Table').table2excel({
			name: 'CX02',
			filename: 'CX02',
			sheetName: 'sheet1',
			exclude_img: true,
			exclude_links: true,
			exclude_inputs: true
		});
	}
	/** 修改按钮操作 */
	function handleUpdate() {
		console.log(form.value)
		proxy.$refs["cx02Ref"].validate(valid => { //获取前端校验效果
			console.log(valid)
			// debugger
			if (valid) {
				updateCC02(form.value).then(res => { //获取后端校验信息
					console.log(res)
					alert("更新成功！")
				}).catch(err => {
					cleanWarning();
					if (err.code == 600) {
						for (let key in err.data) {
							errorsMsg.value[key].hasError = true
							errorsMsg.value[key].errMsg = err.data[key]
						}
					}
					console.log(err)
				})
			} else {
				for (let index in proxy.$refs["cx02Ref"].fields) { // 获取前端校验信息
					if (proxy.$refs["cx02Ref"].fields[index].validateState == 'error') {
						errorsMsg.value[proxy.$refs["cx02Ref"].fields[index].prop].hasError = true
					}
				}
				alert("表单校验不通过！")
			}
		})
	}
	//删除错误信息
	function cleanWarning() {
		for (let key in errorsMsg.value) {
			errorsMsg.value[key] = {
				hasError: false,
				errMsg: ""
			}
		}
	}

	/** 删除按钮操作 */
	function handleDelete(row) {
		const id = row.id;
		// const h= this.$createElement
		proxy.$modal.confirmHtml('是否确认删除ID为<span style="font-size:42px;color:red;">' + id + '</span>的数据项？').then(
			function() {
				return deleteCX02(id);
			}).then(() => {
			getList();
			proxy.$modal.msgSuccess("删除成功");
		}).catch(() => {});
	};

	/** 取消按钮 */
	function cancel() {
		open.value = false;
		reset();
	}

	/** 重置按钮操作 */
	function resetQuery() {
		proxy.resetForm("queryRef");
		handleQuery();
	}

	/** 重置操作表单 */
	function reset() {
		form.value = {
			jcdwmc: undefined,
			jlbh: undefined,
			gcmc: undefined,
			htd: undefined,
			sgdw: undefined,
			jldw: undefined,
			gcbw_yt: undefined,
			ypxx: undefined,
			sytj: undefined,
			jcyj: undefined,
			pdyj: undefined,
			zyyqsbmcjbh: undefined,
			qydd: undefined,
			jlcd: undefined,
			pzgg: undefined,
		};
		proxy.resetForm("cx02");
	};

	// 监听器计算实时计算字段值
	watch(() => [form.value.m3_rltblbhszzl, form.value.m1_rlthblbzzl, form.value.ρT], ([m3, m1, ρT]) => {
		if (ρT)
			form.value.v1_rltrjdz = (m3 - m1) / ρT;
		else
			form.value.v1_rltrjdz = ''
	});
	watch(() => [form.value.m3_2_rltblbhszzl, form.value.m1_2_rlthblbzzl, form.value.ρT], ([m3, m1, ρT]) => {
		if (ρT)
			form.value.v1_2_rltrjdz = (m3 - m1) / ρT;
		else
			form.value.v1_2_rltrjdz = ''
	});
</script>

<style scoped>
	@import "cx02.css";

	.hidden-span {
		display: none;
	}
</style>