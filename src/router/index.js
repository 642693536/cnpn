import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/layout/Home.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path:'/',
    name:'预警管理',
    component: Home,
    imgUrl:require('../assets/images/icon_warning.png'),
    children:[
      {
        path:'/RecordWarning',
        name:"预警处理",
        component: () => import('../views/warning/RecordWarning.vue')
      },
      {
        path:'/DisposeWarning',
        name:"预警记录",
        component: () => import('../views/warning/DisposeWarning.vue')
      },
      {
        path:'/PressureWarning',
        name:"压力预警",
        hidden:true,
        component: () => import('../views/warning/PressureWarning.vue')
      },
      {
        path:'/ProtectionWarning',
        name:"劳保预警",
        hidden:true,
        component: () => import('../views/warning/ProtectionWarning.vue')
      },
      {
        path:'/StrangerWarning',
        name:"陌生人预警",
        hidden:true,
        component: () => import('../views/warning/StrangerWarning.vue')
      },
      {
        path:'/TemperatureWarning',
        name:"温度预警",
        hidden:true,
        component: () => import('../views/warning/TemperatureWarning.vue')
      },
      {
        path:'/TrajectoryWarning',
        name:"轨迹预警",
        hidden:true,
        component: () => import('../views/warning/TrajectoryWarning.vue')
      }
    ]
  },
  {
    path:'/',
    name:'人员管理',
    component: Home,
    imgUrl:require('../assets/images/icon_staff.png'),
    children:[
      {
        path:'/UserManage',
        name:"员工管理",
        component: () => import('../views/person/UserManage.vue')
      },
      {
        path:'/PostManage',
        name:" 部门管理",
        component: () => import('../views/person/PostManage.vue'),
        children:[
          {
            path:'/DeparmentDetail/:id',
            name:"部门详情",
            component: () => import('../views/person/DeparmentDetail.vue')
          }
        ]
      },
      {
        path:'/VisitorManage',
        name:"访客管理",
        component: () => import('../views/person/VisitorManage.vue')
      },
      {
        path:'/StaffDetail',
        name:"员工详情",
        hidden:true,
        component: () => import('../views/person/StaffDetail.vue')
      },
      {
        path:'/CompileStaff',
        name:"编辑员工",
        hidden:true,
        component: () => import('../views/person/CompileStaff.vue')
      },
      {
        path:'/VisitorDetail',
        name:"访客详情",
        hidden:true,
        component: () => import('../views/person/VisitorDetail.vue')
      },
      {
        path:'/CompieVisitor',
        name:"编辑访客",
        hidden:true,
        component: () => import('../views/person/CompieVisitor.vue')
      },
    ]
  },
  {
    path:'/',
    name:'巡检轨迹',
    component: Home,
    imgUrl:require('../assets/images/icon_track.png'),
    children:[
      {
        path:'/TrackManage',
        name:"轨迹管理",
        component: () => import('../views/track/TrackManage.vue')
      },
      {
        path:'/PoitionManage',
        name:"点位管理",
        component: () => import('../views/track/PoitionManage.vue')
      },
      {
        path:'/AddPoition',
        name:"添加点位",
        hidden:true,
        component: () => import('../views/track/AddPoition.vue')
      },
      {
        path:'/CompilePoint/:id',
        name:"修改点位",
        hidden:true,
        component: () => import('../views/track/CompilePoint.vue')
      },
      {
        path:'/AddTrack',
        name:"添加轨迹",
        hidden:true,
        component: () => import('../views/track/AddTrack.vue')
      },
      {
        path:'/CompileTrack/:id',
        name:"修改轨迹",
        hidden:true,
        component: () => import('../views/track/CompileTrack.vue')
      }
    ]
  },
  {
    path:'/',
    name:'设备管理',
    component: Home,
    imgUrl:require('../assets/images/icon_equipment.png'),
    children:[
      {
        path:'/MonitoringAids',
        name:"监控设备",
        component: () => import('../views/device/MonitoringAids.vue')
      },
      {
        path:'/PressureAids',
        name:"物联网设备",
        component: () => import('../views/device/PressureAids.vue')
      },
      {
        path:'/PressureAidsDetail/:id',
        name:"设置物联网设备",
        hidden:true,
        component: () => import('../views/device/PressureAidsDetail.vue')
      },
      {
        path:'/TemperatureAids',
        name:"温度设备",
        hidden:true,
        component: () => import('../views/device/TemperatureAids.vue')
      },
      {
        path:'/TemperatureAidsDetail',
        name:"设置温度设备",
        hidden:true,
        component: () => import('../views/device/TemperatureAidsDetail.vue')
      }
    ]
  },
  {
    path:'/',
    name:'配置管理',
    component: Home,
    imgUrl:require('../assets/images/icon_configuration.png'),
    children:[
      {
        path:'/Administrator',
        name:"管理员账号",
        component: () => import('../views/deploy/Administrator.vue')
      }
    ]
  },
  {
    path:'/',
    name:'设置',
    component: Home,
    hidden:true,
    children:[
      {
        path:'/Account',
        name:"账户设置",
        hidden:true,
        component: () => import('../views/setting/Account.vue')
      },
      {
        path:'/ChangePassWord',
        name:"修改密码",
        hidden:true,
        component: () => import('../views/setting/ChangePassWord.vue')
      },
    ]
  },
     // 登录
     {
      path: '/login',
      name: "登录",
      hidden:true,
      component: () => import('../views/setting/Login.vue')
    },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
