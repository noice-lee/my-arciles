# 尚硅谷React全家桶(天禹老师主讲)
> 视频跟敲代码地址: [码云](https://note.youdao.com/)

## JSX语法规则

1. 定义虚拟DOM时，不可用引号包裹
2. 使用js**表达式**时，使用大括号包裹，如`<span>{ theData }</span>`
3. 样式类名书写时，需使用`className=""`，而不是`class=""`
4. 内联样式书写时，需使用对象形式书写

```js
<span style={{ color: 'red', fontSize: '10px'}}> { theData }</span>
```

4. 标签必须闭合
5. 只有一个根元素
6. 标签首字母
    （1）若小写字母开头，则直接转换为html中同名元素，若html中无对应元素，则报错；
    （2）若大写字母开头，认定为组件

## 箭头函数返回对象简写
```js
const func = () => {
    return {
        a: 1,
    };
};
// 简写为
const fun = () => ({a: 1});
```

## js语句和js表达式区别

- js语句
    逻辑判断、循环等

- js表达式
    可返回一个值

## 类的基本知识(复习)

- 构造器`constructor`中的this指向后续创建的实例
- 创建的一般的方法/变量，直接成为实例的方法/变量
- 使用static等关键字声明的方法/变量，放到实例的原型对象上
  ```js
  class Home {
    // a会放到后续创建的实例上
    a = 1;
    // b会放到类上
    static b = 2;
  }
  ```

## ReactDOM.render()后发生了什么

执行`ReactDOM.render(<MyComponent/>, document.getElementById('app'))`之后发生了什么

1. React解析组件标签，找到`MyComponent`组件
2. 如果发现是使用函数定义的，执行该函数
3. 如果发现是使用类定义的，new出来这个实例，并通过该实例调用原型上的`render`方法
4. 将返回的虚拟DOM转换为真实DOM，渲染到页面上

## render中的this指向

this指向MyComponent组件实例对象

```javascript
class MyComponent extends React.Component {

  render() {
    /**
     * this指向后续new MyComponent()创建出来的对象（这个React会帮执行）
     * ->
     * this指向MyComponent的实例对象
     * ->
     * this指向MyComponent组件实例对象
     */
    console.log(this)   // MyComponent的实例对象
    return (
      <h2>我是类定义的组件</h2>
    )
  }
}

ReactDOM.render(<MyComponent />, document.getElementById('app'));
```

## 组件中的普通函数的this指向

默认情况下，谁调用该函数就指谁。
需注意，直接在给JSX语法中添加`onClick`事件回调时，回调函数执行时的this是指向**undefined**的。
是因为由于该事件回调是直接赋值给`onClick`直接执行的，只有由组件实例调用该函数时才会指向实例本身，而类的写法里面开启了局部严格模式，babel也开启了严格模式(React会经过babel编译)，所以指向undefined。

## js数组reduce方法-统计

接收一个函数，遍历数组，函数的第一个参数为上一个值，函数的第二个参数为当前值，遍历结束后返回最后返回的值
接收第二个参数，统计的初始值

```javascript
// 计算和
const arr = [1, 3, 5, 7];
const sum = arr.reduce((preVal, curVal) => {
    return preVal + curVal;
}, 0);
console.log(sum); // 16
```

## js克隆对象

```js
const obj = {
    a: 1,
    b: 2,
};
const obj2 = { ...obj };
```

在React传递Props时，使用的语法看似是对象解构，其实不是，是React+Babel的语法，才可以这么写

```js
ReactDOM.render(<Person { ...p1 }/>, document.getElementById('app1'))
```

## props类型和默认值

1. 完整写法

```js
import { PropTypes } from 'react';
class Person extends React.Component {
    // ...
}

// 类型
Person.propTypes = {
    name: PropTypes.string.isRequired,
    sex: Proptypes.func,
}

// 默认值
Person.defaultProps = {
    age: '未知'
}
```

1. 简写

```js
class Person extends React.Component {

    static defaultProps = {
        age: '未知'
    }
    static propTypes = {
        name: PropTypes.string.isRequired,
        sex: Proptypes.func,
    }
}
```

---

## 绑定ref

1. 绑定string的ref

```js
class Person extends React.Component {

    show() {
        // 通过this.refs来访问
        console.log(this.refs.r1);
    }
    
    render() {
        return (
            <div ref="r1" onClick={this.show}>refs</div>
        )
    }
}
```

2. 通过回调绑定ref

* 内联回调

```js
class Person extends React.Component {

    show() {
        // 直接通过this访问
        console.log(this.r1);
    }
    
    render() {
        return (
            {/* 这是JSX注释的写法 */}
            {/* 
                这里ref内是个回调，接收一个参数，就是节点本身
                执行时给实例添加一个r1变量，保存节点本身
                首次执行render函数时执行一次
                setState时执行两次，第一次参数是null，第二次参数是节点本身
            */}
            <div ref={c => {this.r1 = c}} onClick={this.show}>refs</div>
        )
    }
}
```

* 类的函数

```js
class Person extends React.Component {

    bindRef(ele) {
        this.r1 = ele
    }
    
    show() {
        // 直接通过this访问
        console.log(this.r1);
    }
    
    render() {
        return (
            <div ref={this.bindRef} onClick={this.show}>refs</div>
        )
    }
}
```

3. 通过`createRef`绑定ref

```js
class Person extends React.Component {
    // 每次执行React.createRef都可绑定一个ref
    bindRef = React.createRef();
    
    // 若创建多个ref，再来一个就行
    bindRef2 = React.createRef();
    
    show() {
        // 直接通过this访问
        console.log(this.r1);
    }
    
    render() {
        return (
            <div ref={this.bindRef} onClick={this.show}>refs</div>
        )
    }
}
```

---

## 事件总结

1.  通过`onXxxx`来绑定事件函数，注意大小写
2.  React使用的不是原生DOM事件，而是经过封装的 ———— 为了更好的兼容性
3.  React使用的是事件委托（委托给组件最外层的元素）———— 为了更好的性能
4.  回调函数中接收一个参数，就是绑定事件的元素，如：

```js
class Person extends React.Component {

    blur = event => {
        // event类似原生的event
        console.log(event);
        // event.target就是元素本身
        console.log(event.target);
        // event.target.value可以获取输入框的值
        console.log(event.target.value);
    }
    
    render() {
        return (
            <input onBlur={this.blur} />
        )
    }
}
```

## 非受控组件

页面上的数据现用现取，提交表单时才去获取输入框的值

```js
class Login extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        // 提交时才去读取输入框的值
        alert(this.uname.value + this.upwd.value);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                用户名：<input ref={c => this.uname = c} type="text" />
                密码：<input ref={c => this.upwd = c} type="text" />
                <button>登录</button>
            </form>
        )
    }
}
```

## 受控组件

页面上的数据存到`state`中，在输入框改变的`onChange`事件中修改`state`的值，用的时候从`state`中取

```js
class Login extends React.Component {

    state = {
        uname: '',
        upwd: '',
    }
    
    unameChange = e => {
        this.setState({
            uname: e.target.value,
        });
    }
    
    upwdChange = e => {
        this.setState({
            upwd: e.target.value,
        });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        alert(`账号:${this.state.uname}，密码:${this.state.upwd}`);
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                用户名：<input onChange={this.unameChange} type="text" />
                密码：<input onChange={this.upwdChange} type="text" />
                <button>登录</button>
            </form>
        )
    }
}

```

## 高阶函数概念

1.  如果一个函数接收参数中包含一个函数，则可以称之为高阶函数
2.  如果一个函数的返回值是一个函数，则可以称之为高阶函数

## dataset实现onChange

```js
class Login extends React.Compontent {
    
    render() {
        rerturn (
            <div>
                <input onChange={this.myChange} data-name="uname" />
                <input onChange={this.myChange} data-name="upwd"/>
            </div>
        )
    }
    
    myChange = (e) => {
        this.setState({
            // 获取元素上绑定的data-name的值
            [e.target.dataset.name]: e.target.value
        })
    }
}
```

## 函数柯里化实现onChange

```js
class Login extends React.Compontent {
    
    change = key {
        return (e) => {
            return myChange(key, e);
        };
    }
    
    myChange = (key, ele) => {
        this.setState({
            [key]: ele.target.value,
        });
    }
    
    render() {
        rerturn (
            <div>
                {/* 两种不同写法 */}
                <input onChange={this.change('uname')} />
                <input onChange={e => this.myChange('upwd', e)} />
            </div>
        )
    }
}
```

## 组件生命周期（旧）

#### 图示
![生命周期-旧](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-ce1af42d-76fa-4a5c-9768-cebbc1aa816f/11e0cdba-2c71-4e82-b131-5ada8271fc46.png)

#### 组件挂载
1. `constructor`
2. `componentWillMount`
3. `render`
4. `componentDidMount` --- 常用

#### 组件更新
1. `shuldComponentUpdate`
2. `componentWillUpdate`
3. `render` --- 常用
4. `componentDidUpdate`

#### 卸载组件
1. `componentWillUnmount` --- 常用

## 组件生命周期（新）

#### 组件挂载
1. `constructor`
2. `getDerivedStateFromProps`
3. `render`
4. `getSnapshotBeforeUpdate`
4. `componentDidMount` --- 常用

#### 组件更新
1. `getDerivedStateFromProps`
2. `shuldComponentUpdate`
3. `render` --- 常用
4. `componentDidUpdate`

#### 卸载组件
1. `componentWillUnmount` --- 常用

![生命周期-新](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-ce1af42d-76fa-4a5c-9768-cebbc1aa816f/30498f20-74bd-4569-9640-1b0bf001e3c5.png)

---

## diff

#### 算法逻辑
```
数据更新时，找同级下有无相同的key
    有相同key则判断对应数据是否相同
        如果相同则复用
        如果不同则直接创建新DOM替换
    没相同key有则直接创建新DOM
```

#### 使用index做key可能有问题
1. 如果对数据的非末尾的位置添加或删除，则会导致无法复用DOM，更新效率变低
2. 如果循环中包含输入类的元素且对数据非末尾位置添加或删除，则会导致输入类的元素的值出现异常

---

## 苹果桌面图标
`<link rel="apple-touch-icon"href="/qz.png"/>`

## ESmodule引入注意
```js
// 引入的Component不是解构赋值，而是在React中使用了两种导出方式
import React, { Component } from 'React';

// 例如
// React中
export Class Component {}

const React = {}
React.Component = Component
export default React;
```

## 配置开发请求代理
#### package.json中配置
1. 添加proxy，proxy后代表的是后端的地址，指后端接口运行在localhost的3000端口下
```json
{
    "proxy": "http://localhost:3000",
}
```
2. 当前端react项目运行在8080端口下时，向前端项目开启的端口发送请求，即会代理到配置的后端接口
```js
axios.get('http://localhost:8080/user')
```
> 发送请求时，先去本地的public目录下寻找，如果public目录下没有，将会转发到proxy配置的地址上

#### 配置文件中配置
在`/src/setupProxy.js`中配置

## 对象连续解构
```js
const a = {
    b: {
        c: 1
    }
}

// 连续解构 + 重命名
// 获取不到 b
const { b: { c:d } } = a
console.log(d) // 1
```

## 路由: react-router-dom

#### 使用要求
- 所有的路由需放到一个路由根标签(`BrowserRouter`或`HashRouter`)下，才可对应渲染
- 哈希路由或者历史路由
- 推荐放到入口文件的app外层

#### 路由组件和普通组件的区别

1. 使用方式不同
- 普通组件直接自己调用
- 路由组交由Route来调用
```js
// 普通组件
<Home />

// 路由组件
<Route path='/home' component={Home} />
```

2. 存放位置不同
- 普通组件放到`/src/components`中
- 路由组件放到`/src/pages`中

3. 接收的props不同
- 普通组件默认没有参数
- 路由组件默认有参数 `history` `route` `match`

#### Link组件
- to属性代表对应的路由
- 编译成a标签

#### NavLink组件
- Link的升级版，实现路由激活项的高亮
- 通过给Link的激活项添加一个`active`类名，类名可自定义
- 通过this.props.children可获取标签体内容（两标签之间的内容）

#### Switch组件
只有使用switch包裹时，当路由匹配到一个组件时才不会接着向下匹配其他router
```js
<Switch>
  <Route path='/home' component={Home} />
  <Route path='/about' component={About} />
  {/* 这样就不会往下查找匹配 */}
  <Route path='/about' component={Axi} />
</Switch>
```

#### 多级路径时css样式丢失

##### 出现原因
是因为如果在index.html中使用相对路径引入样式，并且是多级路径时，浏览器会认定最后一级路径为index.html的相对路径，所以会出现样式路径上多了些前缀

##### 解决方法（三种）
- 使用绝对路径
- 在react脚手架创建的项目可以使用样式文件前加webpack的基础路径变量来控制`%PUBLIC_URL%`
- 使用哈希模式的路由

#### 模糊匹配？精准匹配
- 默认是模糊匹配，需要给Route组件传`exact`来开启精准匹配
- 模糊匹配是Route的路径与Link中的路径的开头匹配就可以
- 开启精准匹配会造成识别不到二级路由
```js
{/* 开启精准匹配 */}
<Route exact path='/home' component={Home}/>
```

#### 重定向
当一个switch中所有的路由都匹配不上时，可添加一个`Redirect`，来指定匹配不到时的路径

```js
<Switch>
  <Route path='/home' component={Home} />
  <Route path='/about' component={About} />
  {/* 默认显示home */}
  <Redirect to='/home' />
</Switch>
```

---

#### 嵌套路由

##### 实现方式
在路由组件中继续定义路由，子路由里面需要写上**父路由的路径作为前缀**，否则会导致匹配不到
```js
{/* home组件中继续定义路由组件 */}
<div>
  <MyNavLink to="/home/news">新闻</MyNavLink>
  <MyNavLink to="/home/message">信息</MyNavLink>
</div>
<Switch>
  <Route path="/home/news" component={News}></Route>
  <Route path="/home/message" component={Message}></Route>
  <Redirect to="/home/news"></Redirect>
</Switch>
```
##### 匹配流程
1. 当跳转到`/home/news`时，先去一级路由匹配，根据模糊匹配匹配到`/home`
2. 然后渲染`Home`组件，然后去二级路由里面进行匹配，再匹配到`/home/news`进行渲染

#### 路由传参

state传参会在历史/哈希模式直接打开地址、哈希模式刷新页面时丢失数据，其他传参都不会丢失数据

##### 传递params
- 编写路由链接时以连续斜杠的方式携带参数
```js
<Link to="/home/message/detail/1">ms1</Link>
```
- 声明路由时定义接受的key
```js
<Route path={`/home/message/detail/:id`} component={Detail} />
```
- 子路由中通过props.match.params接受参数
```js
const { id } = this.props.match.params;
```

##### 传递search
- 编写路由链接时以查询字符串的形式传递参数
```js
<Link to="/home/message/detail?id=3">ms3</Link>
```
- 正常声明路由
```js
<Route path="/home/message/detail" component={Detail} />
```
- 子路由中通过props.location.search接收，接受到是未处理的查询参数，需手动处理，可通过querystring插件的方法来处理
```js
import qs from 'querystring';

const { id } = qs.parse(this.props.location.search.slice(1));
```
##### 传递state
- 编写路由链接时使用对象形式传递
```js
<Link to={{path: '/home/message/detail', state: {id: 5}}}>ms5</Link>
```
- 正常声明路由
- 子路由中通过props.location.state接收参数
```js
const { id } = this.props.location.state || {};
```

---

#### 开启replace模式
开启后跳转时会进行替换，不保留历史记录
```js
<Link replace to="/news" />
```
#### 编程式导航
##### 通过路由的history对象进行跳转
```js
this.props.history.push('/home?id=1', state对象);
this.props.history.replace('/home/1/2', state对象);
this.props.history.go(n);   // 正数前进，负数后退
this.props.history.goBack();
this.props.history.goForward();
```

#### withRouter使用
可解决在一般组件中不可使用路由的方法的问题，只需在定义一般组件时，在导出的组件外层使用`withRouter`函数包裹即可
```js
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
    render() {}
}

export default withRouter(Home)
```

#### BroswerRouter和HashRouter区别

1. 底层原理不同
- 历史模式以浏览器的history API实现
- 哈希模式以地址的哈希值（锚点）实现

2. 表现形式不同
- 历史模式是 localhost:8080/home
- 哈希模式是 localhost:8080/#/home

3. 页面刷新后的路由传参数据丢失不同
- 历史模式刷新后所有传参都不会丢
- 哈希模式刷新后state数据会丢，其他的不会丢

---

## 状态管理Redux

#### 原理图

![redux原理图](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-ce1af42d-76fa-4a5c-9768-cebbc1aa816f/df60cad8-e776-4f18-b5d1-a2fecb2a63f0.png)

#### 基础实现

1. 定义reducer
```js
// /src/store/count_reducer.js
const defaultCount = 0;

export default function countReducer (prevousState = defaultCount, action) {
  const { type, data} = action;
  switch (type) {
    case 'increment':
      return prevousState + data * 1

    case 'decrement':
      return prevousState - data * 1
    
    default:
      return prevousState;
  }
}
```

2. 定义store
```js
// /src/redux/sotre.js
import { createStore, applyMiddleware } from 'redux';
import countReducer from './count_reducer';
import thunk from 'redux-thunk';

// 只支持同步
// export default createStore(countReducer);
// 可支持异步
export default createStore(countReducer, applyMiddleware(thunk));

```

3. 定义action
```js
// /src/store/count_action.js
// 同步是直接返回一个普通对象，交由reducer处理
// 异步是返回一个函数，直接由store处理，在函数中可添加逻辑

// 同步action
export const createIncrementAction = data => ({type: 'increment', data})

// 异步action
export const createIncrementAsyncAction = (time, data) => {
    // 函数第一个参数就是dispatch
    return dispatch => {
        setTimeout(() => {
            dispatch(createIncrementAction(data))
        }, time)
    }
}
```

4. 使用
```js
import store from '../../redux/store'
import { createIncrementAction, createIncrementAsyncAction } from '../../redux/count_action'

// 挂载时监听store数据变化
componentDidMount() {
    store.subscribe(() => {
        // 调用setState可更新数据
        this.setState({});
    });
}

// 分发reducer 触发reducer
store.dispatch(createIncrementAction(1));
```

---

## 状态管理react-redux

#### 原理图
![react-redux原理图](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-ce1af42d-76fa-4a5c-9768-cebbc1aa816f/5673aa66-e61a-40f2-83af-093259d269f3.png)

#### 引入方法

1. 创建容器组件
```js
// 创建/src/container/Count/index.jsx
import CountUI from '../../component/Count';
import { connect } from 'react-redux';
import { 
    createIncrementAction,
    createDecrementAction,
    createIncrementAsyncAction
} from '../../redux/count_action';

// 映射state到props
const mapStateToProps = state => {
  return {
    count: state,
  };
};

// 映射dispatch到props
// 写法一 返回函数
// 这个函数交由store处理，后续执行时，store会将dispatch作为参数传递过来
const mapDispatchToProps = (dispatch) => {
      return {
            increment: data => dispatch(createIncrementAction(data)),
            decrement: data => dispatch(createDecrementAction(data)),
            incrementAsync: data => dispatch(createIncrementAsyncAction(data, 500)),
      };
};
// 写法二 返回对象
// 简写
const mapDispatchToProps = {
    increment: createIncrementAction,
    decrement: createDecrementAction,
    incrementAsync: createIncrementAsyncAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(CountUI);
```

2. 页面使用容器组件 并传入store 
```js
import Count from './container/Count';
import store from './redux/store';

...
render() {
    return (
        <Count store={store} />
    )
}
```

3. UI组件中使用state和改变state
```js

// 调用dispatch改变state
increment = () => {
    this.props.increment(this.refs.se.value);
};

// 使用state
render() {
    <h3>当前求和为: { this.props.count }</h3>    
}
```

#### 优化
1. 使用react-redux后，可不用写监听store数据变化，以下代码可删除
```js
componentDidMount() {
    store.subscribe(() => {
        // 调用setState可更新数据
        this.setState({});
    });
}
```
2. react-redux中，不用每个容器组件都给传store，只需给最外层包裹一层Provider
```js
// 可将这个store去掉
render() {
    return (
        <Count store={store} />
    )
}

// 在App中最外层包裹一个Provider
import { Provider } from 'react-redux';

<Provider store={store}>
    <App />
</Provider>
```

3. 将容器组件与UI组件定义在一个文件中

#### 定义多个redux状态
1. 定义action和reducer
```js
// action
export const createPersonAction = data => ({ type: 'add', data });

// reducer
const initState = [{ name: 1, age: 18 }];

export default function PersonReducer (prev = initState, action) {
    const { type, data } = action;
    if (type === 'add') {
        return [data, ...prev];
    } else {
        return initState;
    }
}
```

2. 合并redux状态
```js
// store中
import { createStore, applyMiddleware, combineReducers } from 'redux';
import countReducer from "./count_reducer";
import personReducer from "./person_reducer";

export default createStore(combineReducers({
  count: countReducer,
  persons: personReducer,
}), applyMiddleware(thunk));
```

3. 在容器组件中使用
```js
class Person extends Component {
    render() {
        return <div>{this.props.persons}</div>
    }
    
}
```

