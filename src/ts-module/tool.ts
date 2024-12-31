/**
 * 泛型工具类型
 */
interface IProps {
  id: string;
  title: string;
  children: number[];
}
type omita = Omit<IProps, 'id' | 'title'>;
const omitaA: omita = {
  children: [1]
};
type picka = Pick<IProps, 'id' | 'title'>;
const pickaA: picka = {
  id: '',
  title: '1'
};
type partiala = Partial<IProps>;
const partialaA: partiala = {
  id: '1'
};
type readonlya = Readonly<IProps>;
const readonlyaA: readonlya = {
  id: '1',
  title: '1',
  children: [1]
};
//Record<keys,Type>构造一个对象类型，属性键为keys,属性类型为Type
type recorda = Record<'a' | 'b' | 'c', string[]>;
const recordaA: recorda = {
  a: ['1'],
  b: ['1'],
  c: ['1']
};

/**
 * 泛型函数 箭头函数和普通函数
 */

// 箭头函数写法
const getValue = <T>(value: T): T => {
  return value;
};
// 声明函数写法
function getValue1<T>(value: T): T {
  return value;
}

getValue<number>(1);
getValue1(false); //类型推断为字面量类型100

// 多个参数
function getArr<K, V>(value1: K, value2: V): [K, V] {
  return [value1, value2];
}

/**
 * 泛型约束
 * 使用extends关键字为泛型添加约束
 * keyof关键字获取对象所有键的集合
 */
interface Ilength {
  length: number;
}
const getLength = <T extends Ilength>(value: T): number => {
  return value.length;
};

const getProp = <T, k extends keyof T>(obj: T, key: k) => {
  return obj[key];
};
getProp({ name: 'name', age: 1 }, 'name');

/**
 * 索引签名类型
 */

interface IAnyObj<T> {
  [key: string]: T;
}

const myObj: IAnyObj<string> = {
  name: 'name'
};

interface IAnyArray<T> {
  [index: number]: T;
}

const myArray: IAnyArray<number> = [1, 2];

/**
 * 映射类型 in (keyof)
 */

type Person = { name: string; age: number };
type PerKeyof = keyof Person; // keyof后接类型 name | age
const per1: PerKeyof = 'age';

const person: Person = { name: 'name', age: 1 };
type PerTypeof = typeof person; // typeof后接具体对象
const per2: PerTypeof = { name: 'name', age: 1 };
// 用法1： 根据联合类型创建新类型
type PropKeys = 'x' | 'y' | 'z'; // const a: PropKeys = 'x';
// 等价于{x:number;y：number;z:number} 三个属性都包含
type types = { [key in PropKeys]: string };
const typesObj: types = {
  x: '1',
  y: '1',
  z: '1'
};
// 用法2： 根据对象类型创建新类型
type PropsObj = { a: number; b: string; c: boolean };
type Type1 = { [key in keyof PropsObj]: PropsObj[key] };
const Type1Obj: Type1 = {
  a: 1,
  b: '1',
  c: true
};

// 泛型工具partial是根据映射类型实现的
type MyPartial<T> = {
  [key in keyof T]?: T[key];
};
type MyPartialA = {
  name: string;
  age: number;
  phone: number;
};
const MyPartialAObj: MyPartial<MyPartialA> = {
  name: '1'
};
// 注意区分和in keyof的区别
// const MyPartialAObj1: { [p in keyof MyPartialA]: MyPartialA[p] } = {
//   name: '1' // 类型“{ name: string; }”缺少类型“{ name: string; age: number; phone:
// };
