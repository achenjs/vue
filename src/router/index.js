import Vue from 'vue'
import Router from 'vue-router'
import signin from '@/components/signin/signin.vue'
import Home from '@/components/home.vue'
import admin_list from '@/pages/admin_list.vue'
import admin_new from '@/pages/admin_new.vue'
import project_list from '@/pages/project_list.vue'
import project_details from '@/pages/project_details.vue'
import stage_manage from '@/pages/stage_manage.vue'
import attachments from '@/pages/attachments.vue'
// import comment_list from '@/pages/comment_list.vue'
import service_category from '@/pages/service_category.vue'
import service_item from '@/pages/service_item.vue'
import service_custom from '@/pages/service_custom.vue'
import deliverable_list from '@/pages/deliverable_list.vue'
import nextAtta from '@/pages/nextAtta.vue'
import attaDetails from '@/pages/attaDetails.vue'
import indent_list from '@/pages/indent_list.vue'
import indentDetails from '@/pages/indentDetails.vue'
import managers from '@/pages/managers.vue'
import department from '@/pages/department.vue'
import role from '@/pages/role.vue'
import permissions from '@/pages/permissions.vue'
import bill_list from '@/pages/bill_list.vue'
import settings from '@/pages/settings.vue'
import bp_list from '@/pages/bp_list.vue'
import bp_manage from '@/pages/bp_manage.vue'
import bp_details from '@/pages/bp_details.vue'
import NotFound from '@/pages/notFound.vue'

Vue.use(Router)
var role_name = localStorage.getItem('role_name')
var route = {
  mode: 'history',
  base: '/admin/',
  routes: [{
    path: '',
    name: '',
    redirect: '/signin',
    hidden: true
  },
  {
    path: '/admin',
    name: '',
    redirect: '/signin',
    hidden: true
  },
  {
    path: '/signin',
    name: '',
    component: signin,
    hidden: true
  },
  {
    path: '/admin_list',
    name: '用户管理',
    iconCls: 'icon-user',
    component: Home,
    children: [
      {path: '/admin_list', component: admin_list, iconCls: 'icon-page1', name: '会员列表'},
      {path: '/admin_new', component: admin_new, iconCls: 'icon-page2', name: '开通新账户'},
    ]
  },
  {
    path: '/404',
    name: '未找到该页面',
    component: NotFound,
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }]
}

if (role_name === '运营总监') {
  route = {
    mode: 'history',
    base: '/admin/',
    routes: [
      {
        path: '',
        name: '',
        redirect: '/signin',
        hidden: true
      },
      {
        path: '/admin',
        name: '',
        redirect: '/signin',
        hidden: true
      },
      {
        path: '/signin',
        name: '',
        component: signin,
        hidden: true
      },
      {
        path: '/404',
        name: '未找到该页面',
        component: NotFound,
        hidden: true
      },
      {
        path: '/admin_list',
        name: '用户管理',
        iconCls: 'icon-user',
        component: Home,
        children: [
          {path: '/admin_list', component: admin_list, iconCls: 'icon-page1', name: '会员列表'},
          {path: '/admin_new', component: admin_new, iconCls: 'icon-page2', name: '开通新账户'},
        ]
      },
      {
        path: '/bp_list',
        name: 'BP管理',
        iconCls: 'icon-BP',
        component: Home,
        children: [
          {path: '/bp_list', component: bp_list, iconCls: 'icon-page14', name: 'BP列表'},
        ]
      },
      {
        path: '/project_list',
        name: '项目管理',
        iconCls: 'icon-project',
        component: Home,
        children: [
          {path: '/project_list', component: project_list, iconCls: 'icon-page4', name: '项目列表'},
        ]
      },
      {
        path: '/bill_list',
        name: '交易管理',
        iconCls: 'icon-serverList',
        component: Home,
        children: [
          {path: '/bill_list', component: bill_list, iconCls: 'icon-page11', name: '消费记录'}
        ]
      },
      {
        path: '/managers',
        name: '系统管理',
        iconCls: 'icon-system',
        component: Home,
        children: [
          {path: '/settings', component: settings, iconCls: 'icon-page8', name: '修改密码'}
        ]
      },
      {
        path: '*',
        redirect: '/404',
        hidden: true
      },
    ]
  }
}

if (role_name === '运营专员') {
  route = {
    mode: 'history',
    base: '/admin/',
    routes: [
      {
        path: '',
        name: '',
        redirect: '/signin',
        hidden: true
      },
      {
        path: '',
        name: '',
        redirect: '/signin',
        hidden: true
      },
      {
        path: '/signin',
        name: '',
        component: signin,
        hidden: true
      },
      {
        path: '/404',
        name: '未找到该页面',
        component: NotFound,
        hidden: true
      },
      {
        path: '/admin_list',
        name: '用户管理',
        iconCls: 'icon-user',
        component: Home,
        children: [
          {path: '/admin_list', component: admin_list, iconCls: 'icon-page1', name: '会员列表'},
        ]
      },
      {
        path: '/project_list',
        name: '项目管理',
        iconCls: 'icon-project',
        component: Home,
        children: [
          {path: '/project_list', component: project_list, iconCls: 'icon-page4', name: '项目列表'},
        ]
      },
      {
        path: '/bill_list',
        name: '交易管理',
        iconCls: 'icon-serverList',
        component: Home,
        children: [
          {path: '/bill_list', component: bill_list, iconCls: 'icon-page11', name: '消费记录'}
        ]
      },
      {
        path: '/managers',
        name: '系统管理',
        iconCls: 'icon-system',
        component: Home,
        children: [
          {path: '/settings', component: settings, iconCls: 'icon-page8', name: '修改密码'}
        ]
      },
      {
        path: '*',
        redirect: '/404',
        hidden: true
      },
    ]
  }
}

if (role_name === '硬件总监') {
  route = {
    mode: 'history',
    base: '/admin/',
    routes: [
      {
        path: '',
        name: '',
        redirect: '/signin',
        hidden: true
      },
      {
        path: '/admin',
        name: '',
        redirect: '/signin',
        hidden: true
      },
      {
        path: '/signin',
        name: '',
        component: signin,
        hidden: true
      },
      {
        path: '/404',
        name: '未找到该页面',
        component: NotFound,
        hidden: true
      },
      {
        path: '/indent_list',
        name: '订单管理',
        iconCls: 'icon-serverList',
        component: Home,
        children: [
          {
            path: '/indent_list', component: indent_list, iconCls: 'icon-page11', name: '订单列表',
          },
        ]
      },
      {
        path: '/deliverable_list',
        name: '交付物审核管理',
        iconCls: 'icon-examine',
        component: Home,
        children: [
          {path: '/deliverable_list', component: deliverable_list, iconCls: 'icon-page10', name: '交付物列表'},
        ]
      },
      {
        path: '/service_custom',
        name: '定制化需求管理',
        iconCls: 'icon-custom',
        component: Home,
        children: [
          {path: '/service_custom', component: service_custom, iconCls: 'icon-page9', name: '定制化需求管理列表'}
        ]
      },
      {
        path: '/project_list',
        name: '项目管理',
        iconCls: 'icon-project',
        component: Home,
        children: [
          {path: '/stage_manage', component: stage_manage, iconCls: 'icon-page5', name: '阶段管理'},
          {path: '/attachments', component: attachments, iconCls: 'icon-page6', name: '交付物管理'},
        ]
      },
      {
        path: '/service_category',
        name: '服务项管理',
        iconCls: 'icon-server',
        component: Home,
        children: [
          {path: '/service_category', component: service_category, iconCls: 'icon-page7', name: '服务项类别管理'},
          {path: '/service_item', component: service_item, iconCls: 'icon-page8', name: '服务项管理'},
        ]
      },
      {
        path: '/bill_list',
        name: '交易管理',
        iconCls: 'icon-serverList',
        component: Home,
        children: [
          {path: '/bill_list', component: bill_list, iconCls: 'icon-page11', name: '消费记录'}
        ]
      },
      {
        path: '/managers',
        name: '系统管理',
        iconCls: 'icon-system',
        component: Home,
        children: [
          {path: '/settings', component: settings, iconCls: 'icon-page8', name: '修改密码'}
        ]
      },
      {
        path: '*',
        redirect: '/404',
        hidden: true
      },
    ]
  }
}

if (role_name === '硬件专员') {
  route = {
    mode: 'history',
    base: '/admin/',
    routes: [
      {
        path: '',
        name: '',
        redirect: '/signin',
        hidden: true
      },
      {
        path: '',
        name: '',
        redirect: '/signin',
        hidden: true
      },
      {
        path: '/signin',
        name: '',
        component: signin,
        hidden: true
      },
      {
        path: '/404',
        name: '未找到该页面',
        component: NotFound,
        hidden: true
      },
      {
        path: '/indent_list',
        name: '订单管理',
        iconCls: 'icon-serverList',
        component: Home,
        children: [
          {path: '/indent_list', component: indent_list, iconCls: 'icon-page11', name: '订单列表'},
        ]
      },
      {
        path: '/deliverable_list',
        name: '交付物审核管理',
        iconCls: 'icon-examine',
        component: Home,
        children: [
          {path: '/deliverable_list', component: deliverable_list, iconCls: 'icon-page10', name: '交付物列表'},
        ]
      },
      {
        path: '/service_custom',
        name: '定制化需求管理',
        iconCls: 'icon-custom',
        component: Home,
        children: [
          {path: '/service_custom', component: service_custom, iconCls: 'icon-page9', name: '定制化需求管理列表'}
        ]
      },
      {
        path: '/bill_list',
        name: '交易管理',
        iconCls: 'icon-serverList',
        component: Home,
        children: [
          {path: '/bill_list', component: bill_list, iconCls: 'icon-page11', name: '消费记录'}
        ]
      },
      {
        path: '/managers',
        name: '系统管理',
        iconCls: 'icon-system',
        component: Home,
        children: [
          {path: '/settings', component: settings, iconCls: 'icon-page8', name: '修改密码'}
        ]
      },
      {
        path: '*',
        redirect: '/404',
        hidden: true
      },
    ]
  }
}

if (role_name === '产品' || role_name === '超级管理员') {
  route = {
    mode: 'history',
    base: '/admin/',
    routes: [
      {
        path: '',
        name: '',
        redirect: '/signin',
        hidden: true
      },
      {
        path: '/',
        name: '',
        redirect: '/signin',
        hidden: true
      },
      {
        path: '/signin',
        name: '',
        component: signin,
        hidden: true
      },
      {
        path: '/404',
        name: '未找到该页面',
        component: NotFound,
        hidden: true
      },
      {
        path: '/admin_list',
        name: '用户管理',
        iconCls: 'icon-user',
        component: Home,
        children: [
          {path: '/admin_list', component: admin_list, iconCls: 'icon-page1', name: '会员列表'},
          {path: '/admin_new', component: admin_new, iconCls: 'icon-page2', name: '开通新账户'},
          // {path: '/page3', component: Page3, iconCls: 'icon-page3', name: '身份及权限管理'}
        ]
      },
      {
        path: '/project_list',
        name: '项目管理',
        iconCls: 'icon-project',
        component: Home,
        children: [
          {path: '/project_list', component: project_list, iconCls: 'icon-page4', name: '项目列表', children: [
            {path: '/project_list/:id', component: project_details, name: '项目详情', hidden: true}
          ]},
          {path: '/stage_manage', component: stage_manage, iconCls: 'icon-page5', name: '阶段管理'},
          {path: '/attachments', component: attachments, iconCls: 'icon-page6', name: '交付物管理'},
          // {path: '/comment_list', component: comment_list, name: '点评记录'}
        ]
      },
      {
        path: '/service_category',
        name: '服务项管理',
        iconCls: 'icon-server',
        component: Home,
        children: [
          {path: '/service_category', component: service_category, iconCls: 'icon-page7', name: '服务项类别管理'},
          {path: '/service_item', component: service_item, iconCls: 'icon-page8', name: '服务项管理'},
        ]
      },
      {
        path: '/service_custom',
        name: '定制化需求管理',
        iconCls: 'icon-custom',
        component: Home,
        children: [
          {path: '/service_custom', component: service_custom, iconCls: 'icon-page9', name: '定制化需求管理列表'}
        ]
      },
      {
        path: '/deliverable_list',
        name: '交付物审核管理',
        // name: '用户需求评审',
        iconCls: 'icon-examine',
        component: Home,
        children: [
          {path: '/deliverable_list', component: deliverable_list, iconCls: 'icon-page10', name: '交付物列表', children: [
            {path: '/deliverable_list/:id', component: nextAtta, name: '交付物评审', hidden: true},
            {path: '/attaDetails/:id', component: attaDetails, name: '交付物详情', hidden: true}
          ]},
        ]
      },
      {
        path: '/indent_list',
        name: '订单管理',
        iconCls: 'icon-serverList',
        component: Home,
        children: [
          {path: '/indent_list', component: indent_list, iconCls: 'icon-page11', name: '订单列表', children: [
            {path: '/indent_list/:id', component: indentDetails, name: '服务项详情', hidden: true}
          ]},
        ]
      },
      {
        path: '/bill_list',
        name: '交易管理',
        iconCls: 'icon-serverList',
        component: Home,
        children: [
          {path: '/bill_list', component: bill_list, iconCls: 'icon-page11', name: '消费记录'}
        ]
      },
      {
        path: '/managers',
        name: '系统管理',
        iconCls: 'icon-system',
        component: Home,
        children: [
          {path: '/managers', component: managers, iconCls: 'icon-page12', name: '操作员管理'},
          {path: '/department', component: department, iconCls: 'icon-page13', name: '部门管理'},
          {path: '/role', component: role, iconCls: 'icon-page11', name: '角色管理'},
          // {path: '/permissions', component: permissions, iconCls: 'icon-page7', name: '权限管理'},
          {path: '/settings', component: settings, iconCls: 'icon-page8', name: '修改密码'}
        ]
      },
       {
        path: '/bp_list',
        name: 'BP管理',
        iconCls: 'icon-BP',
        component: Home,
        children: [
          {path: '/bp_list', component: bp_list, iconCls: 'icon-page14', name: 'BP列表', children: [
            {path: '/bp_list/:id', component: bp_details, name: '修改BP', hidden: true}
          ]},
          {path: '/bp_manage', name: '新建BP', component: bp_manage, hidden: true},
        ]
      },
      {
        path: '*',
        redirect: {path: '/404'},
        hidden: true
      },
    ]
  }
}

export default new Router(route)
