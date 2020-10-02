import axios from 'axios'


axios.defaults.headers.common['Authorization'] = JSON.parse(window.localStorage.getItem('Authorization'))
axios.interceptors.request.use(
	config => {
		if (localStorage.getItem("Authorization") != null) {
			config.headers["Authorization"] = localStorage.getItem("Authorization");
		}
		return config;
	},
	err => Promise.reject(err)
);
let headAPI = 'http://120.24.4.16:30013'
// let headAPI = 'http://192.168.0.162:30013'



//登录
export const Login = params => {
	return axios.post(`${headAPI}/code/login`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//获取验证码
export const GetCode = params => {
	return axios.get(`${headAPI}/code/createCode`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//创建管理员
export const addCreateUser = params => {
	return axios.post(`${headAPI}/equipment/pe-user/addCreateUser`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//开启权限
export const addJurisdiction = params => {
	return axios.post(`${headAPI}/equipment/pe-user/addJurisdiction`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//查询账号列表
export const selectUserList = params => {
	return axios.get(`${headAPI}/equipment/pe-user/selectUserList`, {params})
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//删除账号
export const RemoveUser = params => {
	return axios.post(`${headAPI}/equipment/pe-user/remove`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//获取用户信息
export const getUserInfo = params => {
	return axios.get(`${headAPI}/equipment/pe-user/getUserInfo`, {params})
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//修改密码
export const ChangePassword = params => {
	return axios.post(`${headAPI}/equipment/pe-user/updateUserPassword`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//本地监控设备列表
export const getEquipmentList = params => {
	return axios.get(`${headAPI}/equipment/pe-equipment/getEquipmentList`, {params})
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//获取设备详情
export const getEquipmentInfo = params => {
	return axios.get(`${headAPI}/equipment/pe-equipment/getEquipmentInfo`, {params})
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//平台监控设备列表
export const getISCEquipmentList = params => {
	return axios.get(`${headAPI}/equipment/pe-equipment/getISCEquipmentList`, {params})
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//添加监控设备
export const addEquipment = params => {
	return axios.post(`${headAPI}/equipment/pe-equipment/addEquipment`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//编辑设备
export const updateEquipment = params => {
	return axios.post(`${headAPI}/equipment/pe-equipment/updateEquipment`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//删除设备
export const removeEquipment = params => {
	return axios.post(`${headAPI}/equipment/pe-equipment/removeEquipment`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//查询平台预置点
export const presetsSearches = params => {
	return axios.get(`${headAPI}/equipment/pe-equipment/presetsSearches`, {params})
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//删除预置点
export const presetsDelete = params => {
	return axios.post(`${headAPI}/equipment/pe-equipment/presetsDelete`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}

//物联网设备列表
export const selectPressureList = params => {
	return axios.get(`${headAPI}/equipment/pe-pressure/selectPressureList`, {params})
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//物联网详情设置
export const perfectPressure = params => {
	return axios.post(`${headAPI}/equipment/pe-pressure/perfectPressure`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//本地查询预置点
export const presetsLocalSearches = params => {
	return axios.get(`${headAPI}/equipment/pe-equipment/presetsLocalSearches`, {params})
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//点位列表
export const selectPointList = params => {
	return axios.get(`${headAPI}/equipment/pe-route-info/selectPointList`, {params})
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//添加/编辑点位
export const insertPoint = params => {
	return axios.post(`${headAPI}/equipment/pe-route-info/insertPoint`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//删除点位
export const removePoint = params => {
	return axios.post(`${headAPI}/equipment/pe-route-info/removePoint`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//巡检路线列表
export const selectInspection = params => {
	return axios.get(`${headAPI}/equipment/pe-route/selectInspection`, {params})
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//添加巡检路线
export const insertInspection = params => {
	return axios.post(`${headAPI}/equipment/pe-route/insertInspection`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//巡检路线详情
export const selectInspectionInfo = params => {
	return axios.get(`${headAPI}/equipment/pe-route/selectInspectionInfo`, {params})
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//编辑巡检路线
export const updateInspection = params => {
	return axios.post(`${headAPI}/equipment/pe-route/updateInspection`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//删除路线
export const removeInspection = params => {
	return axios.post(`${headAPI}/equipment/pe-route/removeInspection`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//获取部门列表
export const getOrgList = params => {
	return axios.get(`${headAPI}/equipment/pe-staff/getOrgList`, {params})
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//创建部门
export const createOrg = params => {
	return axios.post(`${headAPI}/equipment/pe-staff/createOrg`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//删除部门
export const removeOrg = params => {
	return axios.post(`${headAPI}/equipment/pe-staff/removeOrg`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//编辑部门
export const updateOrg = params => {
	return axios.post(`${headAPI}/equipment/pe-staff/updateOrg`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//员工列表
export const selectStaffList = params => {
	return axios.post(`${headAPI}/equipment/pe-staff/selectStaffList`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//添加员工信息
export const addStaff = params => {
	return axios.post(`${headAPI}/equipment/pe-staff/addStaff`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
//上传图片
export const uploadImg = params => {
	return axios.post(`${headAPI}/equipment/field/uploadImg`, params)
		.then(res => res.data)
		.catch((res) => {
			this.$message.error("出错啦！");
		});
}
