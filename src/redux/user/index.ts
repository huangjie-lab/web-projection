import { createSlice } from '@reduxjs/toolkit'

export type IUserStateType = {
  username: string
  age: number
  password: string
}

const defaultState: IUserStateType = {
  username: '张三',
  age: 20,
  password: 'old password'
}
//定义了 数据和初始值 以及修改的方法
const userSlice = createSlice({
  // 模块名
  name: 'user',
  initialState: defaultState,
  // 操作数据方法
  reducers: {
    //获取数据并解构使用 payload
    update: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    setUserInfo: (state, action) => {
      console.log(action, 888)
    },
    setUserPwd: (state, action) => {
      console.log(action, 888)
    }
  }
})
//将装有数据和 修改方法的实力对象（子模块对象）暴露给 自己的主模块进行使用
export default userSlice.reducer
//将方法暴露给页面进行使用
// 暴露操作数据的方法
export const { update, setUserPwd, setUserInfo } = userSlice.actions
