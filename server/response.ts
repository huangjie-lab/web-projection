const homeResponse = {
  data: [
    {
      id: 1,
      msg: 'Hello, home page1'
    },
    {
      id: 2,
      msg: 'Hello, home page2'
    }
  ],
  stateCode: {
    code: 200,
    desc: '成功'
  },
  success: true,
  statusText: '成功'
};

const menusResponse = {
  menu_list: [
    {
      menu_code: 'skWorkbar',
      menu_id: 2097,
      menu_name: '工作台',
      order_number: 0,
      parent_id: 0
    },
    {
      menu_code: 'handoverManage',
      menu_id: 2101,
      menu_name: '交接管理',
      order_number: 0,
      parent_id: 0
    },
    {
      menu_code: 'handover-manage/sclass-handover-pool',
      menu_id: 2102,
      menu_name: '小班交接池',
      order_number: 0,
      parent_id: 2101
    }
  ]
};
const allResponse = {
  resources: [
    {
      description: '',
      resourceId: 4257,
      resource_code: 'fISclassHandoverPoolExport',
      resource_name: '小班交接池导出',
      resource_url: '/fISclassHandoverPoolExport',
      status: 'YES'
    },
    {
      description: '',
      resourceId: 4258,
      resource_code: 'fISclassHandoverPoolDataImport',
      resource_name: '直播课班级数据处理导入',
      resource_url: '/fISclassHandoverPoolDataImport',
      status: 'YES'
    },
    {
      description: '',
      resourceId: 4259,
      resource_code: 'fISclassHandoverPoolRecordList',
      resource_name: '查看操作记录',
      resource_url: '/fISclassHandoverPoolRecordList',
      status: 'YES'
    }
  ]
};
const infoResponse = {
  id: 10872,
  email: 'huang****@codemao.cn',
  phone_number: '177****6332',
  fullname: 'huangjie'
};
const logoutResponse = {
  data: true
};
module.exports = {
  homeResponse,
  menusResponse,
  allResponse,
  infoResponse,
  logoutResponse
};
