export interface initialStateProps<T> {
  [key: string]: T;
}
const initialState: initialStateProps<number> = {
  number: 1
};
const reducer = (state = initialState, action: any) => {
  // 根据action类型处理状态
  switch (action.type) {
    case 'INCREMENT_NUM':
      return { ...state, number: state.number + action.payload };
    default:
      return state;
  }
};

export default reducer;
