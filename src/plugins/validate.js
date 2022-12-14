// 表单验证插件  @2版本使用简单
//表单验证插件的配置文件
import Vue from 'vue'
import VeeValidate from 'vee-validate'

//提示文本本地化中文还有更改某些=验证规则的提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN' // 引入中文message

Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`  // 修改内置规则的message
  },
  attributes: { // 给校验的field属性名映射中文名称
    phone: '手机号',
    code: '验证码',
    password:'密码',
    password2:'确认密码',
    isCheck:'阅读协议'
  }
})

// 自定义事件 判断打勾
VeeValidate.Validator.extend('agree', {
  validate: value => {
    return value
  },
  getMessage: field => field + '必须同意'
})


//对所有的表单项统一验证    写在点击注册按钮的回调函数里面
// const success = await this.$validator.validateAll();
// if (success) {
//     // 发请求
// }