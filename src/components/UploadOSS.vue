<!-- 视频、图片直传OSS -->
<template>
	<div class="upload-wrapper">
        <div 
        	class="upload-box" 
        	id="selectFileBtn" 
        	ref="chooseFileRef"
        >
        	<i class="el-icon-plus"></i>
        </div>
        <div class="upload-preview" v-show="showPreview">
        	<div class="preview__name">{{previewFile}}</div>
        	<el-progress :percentage="progBarNum" class="upload-progress"></el-progress>
        </div>
        <div class="upload-file" v-show="uploadFilesName">
			<div class="upload-video" v-if="isVideo(uploadFilesName)">
		    	<vue-video :videoSource="uploadFilesName"></vue-video>
		    </div>
			<el-image
		        style="width: 148px; height: 148px"
		        :src="uploadFilesName"
		        v-else>
		    </el-image>
		</div>
        <div class="upload-btn" ref="uploadOSSRef">确认上传</div>
	</div>
</template>

<script>
	import plupload from "plupload";
	import vueVideo from './VueVideo'
	export default {
	    name: 'UploadOSSImage',
	    components: {
	    	vueVideo
	    },
	    props: {
	    	defaultImg:String,
	    	clearVideoSrc:Boolean
	    },
	    data() {
		  	return {
		  		uploadFilesName: this.defaultImg || '',
		  		uploadFilesSource:{},
		  		uploadFilesList:[],
		  		progBarNum:0,
		  		showPreview:false, //预览
		  		previewFile:'',
		  	}
		},
		methods: {
			//初始化上传插件
			initPluploader() {
				let _this = this;
				var browseBtn = _this.$refs.chooseFileRef;
				var uploader = new plupload.Uploader({
					browse_button: browseBtn,/*触发文件选择对话框的DOM元素*/
					url: "http://oss.aliyuncs.com",/*服务器端接收和处理上传文件的脚本地址*/
					filter: {
						//允许上传的文件类型
						mime_types: [ 
							{ title:'Video files', extensions:'MP4'}, //允许上传MP4格式的视频文件
							{ title:'Images files', extensions:'jpg,jpeg,gif,png,bmp'} //允许上传图片类型
						],
						prevent_duplicates : true //不允许重复上传
					},
					//当Plupload初始化完成后触发init
					init: {
						//当Init事件发生后触发PostInit
						PostInit() {
							var uploadBtn = _this.$refs.uploadOSSRef;
							addHandler(uploadBtn,'click',function(){
								setUploadParam(uploader, "", false);
				                return false;
							})
						},
						//当文件添加到上传队列后触发监听函数
						FilesAdded(up,files) {
							// 预览
							_this.showPreview = true;
							_this.previewFile = files[0].name;
							_this.uploadFilesName = '';
		    				_this.uploadFilesSource = {};
		    				files.forEach(file => {
		    					let param = {
		    						id:file.id,
		    						name:file.name,
		    						size:plupload.formatSize(file.size)
		    					}
		    					if(_this.uploadFilesList.indexOf(param) < 0) {
		    						_this.uploadFilesList.push(param)
		    					}
		    				})
		    				
						},
						//上传开始之前
						BeforeUpload(up,file) {
							checkObjectRadio();
		    				setUploadParam(up, file.name, true);
						},
						//上传进度
						UploadProgress(up, file) {
		    				_this.uploadFilesList.forEach( item => {
		    					if(item.id === file.id) {
		    						_this.progBarNum = file.percent;
		    					}
		    				})
		    			},
		    			//上传完成
		    			FileUploaded(up, file, info) {
		    				if(info.status == 200) {
		    					//取消预览
								_this.showPreview = false;
								//进度条清零
								_this.progBarNum = 0;
								//返回的文件名
		    					let uploadFileName = `https://longyao-file.oss-cn-shenzhen.aliyuncs.com/${objectName}`;
		    					_this.uploadFilesName = uploadFileName;
		    					//传值给父组件
		    					let suffix = getSuffix(uploadFileName);
		    					let toParentParam = {
		    						fileName:uploadFileName,
		    						fileType:suffix
		    					}
		    					_this.$emit('getFileName',toParentParam);
		    				}
		    			},
		    			// 上传错误
		    			Error(up, err) {
		    				if(err.code == -600) {
		    					_this.$message({
						          message: '选择的文件太大了',
						          type: 'warning'
						        });
		    				}else if(err.code == -601) {
		    					_this.$message({
						          message: '请上传正确的格式',
						          type: 'warning'
						        });
		    				}else if(err.code == -602) {
		    					_this.$message({
						          message: '您已经上传过该文件了！',
						          type: 'warning'
						        });
		    				}else {

		    				}
		    			}
					}
				})
				//初始化事件
				uploader.init();
			},
			//是否是视频文件
			isVideo(file) {
				let suffix = getSuffix(file);
				if(suffix == '.mp4') {
					return true;
				}
			}
		},
		mounted() {
			this.initPluploader();
		},
		watch: {
			defaultImg() {
				this.uploadFilesName = this.defaultImg;
			},
			clearVideoSrc() {
				this.uploadFilesName = "";
				//取消预览
				this.showPreview = false;
				//进度条清零
				this.progBarNum = 0;
				this.$emit("changeSrc",false);
			}
		}
	};


//相关函数
var accessId = '', //用户请求的accessid
accessKey = '',
host = '', //用户要往哪个域名发送上传请求
policyBase64 = '', //用户表单上传的策略（Policy）
signature = '', //对变量policy签名后的字符串
callBackBody = '',
fileName = '',
key = '',
expire = 0, //上传策略Policy失效时间
objectName = '',
objectNameType = '',
nowTime = Date.parse(new Date()) / 1000,
timestamp = Date.parse(new Date()) / 1000;


//上传签名
function getSignature() {
	//可以判断当前expire是否超过了当前时间， 如果超过了当前时间， 就重新取一下，3s 作为缓冲
	nowTime = timestamp = Date.parse(new Date()) / 1000;
	if(expire<nowTime+3) {
		let body = sendRequest();
		let obj = eval(`(${body})`);
		host = obj['host'];
		policyBase64 = obj['policy'];
		accessId = obj['accessid'];
		signature = obj['signature'];
		expire = parseInt(obj['expire']);
		callBackBody = obj['callback'];
		key = obj['dir'];
		return true;
	}
	return false;
}
// 创建 XMLHttpRequest 对象
function sendRequest() {
	var xmlhttp = null;
	if(window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}else if (window.ActiveXObject) {
	    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (xmlhttp != null) {
	    // serverUrl是 用户获取 '签名和Policy' 等信息的应用服务器的URL，请将下面的IP和Port配置为您自己的真实信息。
	    let serverUrl = "http://120.24.4.16:8760/ossUploadFile";
	    // let serverUrl = "https://head.loongyao.com/ossUploadFile";
	    xmlhttp.open("GET", serverUrl, false);
	    xmlhttp.send(null);
	    return xmlhttp.responseText;
	} else {
		this.$message({
          	message: '您的浏览器不支持XMLHTTP',
          	type: 'warning'
        });
	}
}
//上传的参数
function setUploadParam(up,fileName,ret) {
	if(ret === false) {
		ret = getSignature();
	}
	objectName = key;
	if(fileName != '') {
		let suffix = getSuffix(fileName);
		calculateObjectName(fileName);
	}
	let new_multipart_params = {
		key:objectName,
		policy:policyBase64,
		OSSAccessKeyId:accessId,
		success_action_status: "200", //让服务端返回200,不然，默认会返回204
		callback:callBackBody,
		signature:signature
	}
	up.setOption({
		url:host,
		multipart_params: new_multipart_params
	});
	up.start();
}
//获取后缀名
function getSuffix(fileName) {
    var pos = fileName.lastIndexOf('.');
    var suffix = '';
    if(pos != -1) {
        suffix = fileName.substring(pos);
    }
    return suffix;
}
//生成文件名字
function calculateObjectName(fileName) {
	//后缀名
	let suffix = getSuffix(fileName);
	const date = dateFormat(new Date(),'yyyy-MM-dd');
	const dateTime = dateFormat(new Date,'yyyy-MM-dd-hh:mm:ss');
	const randomStr = randomString(10);
	objectName = `video/${dateTime}/${randomStr}/${suffix}`;
}
//随机数
function randomString(len) {
	len = len || 32;
  	var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  	var maxPos = chars.length;
  	var pwd = "";
  	for (var i = 0; i < len; i++) {
    	pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  	}
  	return pwd;
}
//格式化时间
function dateFormat(dateObj, format) {
	const date = {
	    'M+': dateObj.getMonth() + 1,
	    'd+': dateObj.getDate(),
	    'h+': dateObj.getHours(),
	    'm+': dateObj.getMinutes(),
	    's+': dateObj.getSeconds(),
	    'q+': Math.floor((dateObj.getMonth() + 3) / 3),
	    'S+': dateObj.getMilliseconds()
	}
	if (/(y+)/i.test(format)) {
	    format = format.replace(RegExp.$1, (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	for (const k in date) {
	    if (new RegExp('(' + k + ')').test(format)) {
	      format = format.replace(RegExp.$1, RegExp.$1.length === 1
	        ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
	    }
	}
	return format
}
//上传的文件名
function getUploadObjectName(filename) {
	return objectName;
}
function checkObjectRadio() {
    objectNameType = 'random_name';
    return false;
}

/**
 * 封装通用事件方法（兼容IE）
 * 绑定事件的DOM元素：element
 * 事件名：type
 * 事件处理程序：handler
 */
function addHandler(element,type,handler) {
	/**
	 * 支持addEventListener
	 * 非IE浏览器
	 */
	if(element.addEventListener) {
		element.addEventListener(type,handler,true);
	}else if(element.attachEvent) {
		// 支持DOM2级的IE浏览器
		element.attachEvent("on"+type,handler);
	}else {
		// 不支持DOM2级的IE浏览器
		element["on"+type] = handler;
	}
}
</script>

<style lang="scss" scoped>
	@import '../assets/styles/varible';
	.upload-preview /deep/ .el-progress-bar__inner{
		background-color: $themeColor;
	}
	.upload-box {
		display: inline-block;
	    text-align: center;
	    cursor: pointer;
	    outline: 0;
	    background-color: #fbfdff;
	    border: 1px dashed #c0ccda;
	    border-radius: 6px;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    width: 148px;
	    height: 148px;
	    line-height: 146px;
	    vertical-align: top;
	    &>i {
	    	font-size: 28px;
    		color: #8c939d;
	    }
	}
	//上传成功的内容
	.upload-file {
		display: inline-block;
		margin-left: 30px;
		.upload-video {
			width: 190px;
			height: 148px;
		}
	}
	.upload-btn {
		width: 144px;
		height: 32px;
		line-height: 32px;
		background-color: $orangeColor;
		color:#fff;
		border-radius: 4px;
		margin-top: 16px;
		text-align: center;
		cursor: pointer;
	}
	.upload-preview {
		display: inline-block;
		margin-left: 20px;
		width: 250px;
	}
</style>
