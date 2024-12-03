import { createSlice } from '@reduxjs/toolkit';
//定义了 数据和初始值 以及修改的方法
const countSlice = createSlice({
  name: 'count',
  initialState: {
    count: 0
  },
  reducers: {
    update: (state, { payload }) => {
      console.log(payload, 'payload');
      state.count = payload;
      return state;
    },
    increment: (state, action) => {
      console.log(action, 888);
    },
    decrement: (state, action) => {
      console.log(action, 888);
    }
  }
});
export default countSlice.reducer;
export const { update, increment, decrement } = countSlice.actions;
