<template>
	<el-pagination 
		class="pagination"
		layout="prev,pager,next"
		:page-size="pageSize"
		:total="totalSize"
		:hide-on-single-page="true"
		:current-page.sync="currentPage"
		@current-change="currentChangeHandle"
	></el-pagination>
</template>

<script>
	export default {
	    name: 'pagination',
	    data() {
		  	return {
		  		pageSize:this.pagesize,
		  		totalSize:this.total,
		  		currentPage:this.current
		  	}
		},
		props: {
			//接受父组件传递过来的数据
			total:Number, //总数据
			pagesize:Number, //单页数据
			current:Number, //当前页码
		},
		methods: {
			currentChangeHandle(currentPage){
				this.$emit('currentPageChange',this.currentPage)
			}
		},
		watch: {
			total(data) {
				this.totalSize = data;
			},
			pagesize(data) {
				this.pageSize = data
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../assets/styles/varible';
	.pagination /deep/ .el-pager li {
		border:1px solid $borderColor;
		margin-right: 16px;
		color:#999;
	}
	.pagination /deep/ .el-pager li.active {
		color:$themeColor;
	}
	.pagination {
		text-align:right;
		margin-right: 30px;
		margin-top: 20px;
	}
</style>
