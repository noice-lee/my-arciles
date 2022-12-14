# 解决uni-datetime-picker选择时间长度

## 背景

`uni-datetime-picker`支持限制选择时间开始和结束，但不支持限制选择时间范围长度，比如最多可选择一个月，碰到一个需求需要默认可以任意选择，在选择一个日期后最多选择一个月内的日期，因项目是本人自己独立完成，看了看`uni-datetime-picker组件`源码的逻辑比较清晰、易修改，所以选择直接改源码，并在项目内记录了修改原因和方式

## 代码分析

`uni-datetime-picker组件`依赖的`calendar组件`里面有一个插入模式`insert`，`uni-datetime-picker组件`里通过判断`isPhone`时会给`insert`赋值为`false`，而在`calendar组件`里日期变化会触发的`change`方法中会判断如果不是插入模式就不会派发事件，而在`uni-datetime-picker组件`里手机端也没有监听`change事件`

> 一句话概括就是：只选择一个日期后没有触发回调，来控制修改开始/结束时间

## 解决步骤

### 1. `calendar组件`里面的`choiceDate`日期改变事件中触发的`change事件`，让此事件派发事件

``` js
choiceDate(weeks) {
    // ……
    this.tempRange.before = this.cale.multipleStatus.before
    this.tempRange.after = this.cale.multipleStatus.after
    // this.change()
    // 改为
    this.change(1)
}

change(e) {
    // if (!this.insert) return 
    // 改为
    if (!this.insert && e !== 1) return
    this.setEmit('change')
}
```
### 2. `uni-datetime-picker组件`监听对应子组件事件，继续向上派发事件

``` html
// 第一步 监听子组件事件
<calendar 
  v-show="isPhone" 
  ref="mobile" 
  :clearDate="false" 
  :date="defSingleDate" 
  :defTime="reactMobDefTime"
  :start-date="caleRange.startDate"
  :end-date="caleRange.endDate"
  :selectableTimes="mobSelectableTime"
  :pleStatus="endMultipleStatus"
  :showMonth="false"
  :range="isRange"
  :typeHasTime="hasTime"
  :insert="false"
  :hideSecond="hideSecond" 
  @confirm="mobileChange"
/>
// 改为（只添加监听change事件）
<calendar
  v-show="isPhone"
  ref="mobile" 
  :clearDate="false" 
  :date="defSingleDate" 
  :defTime="reactMobDefTime"
  :start-date="caleRange.startDate" 
  :end-date="caleRange.endDate" 
  :selectableTimes="mobSelectableTime"
  :pleStatus="endMultipleStatus" 
  :showMonth="false" 
  :range="isRange" 
  :typeHasTime="hasTime" 
  :insert="false"
  :hideSecond="hideSecond" 
  @confirm="mobileChange"
  @change="myChange" 
/>
// 第二步 将接受到的数据直接向上派发事件
myChange (e) {
    // console.log(e, 'e')
    this.$emit('myChange', e)
}
```

### 3. 在自己的组件中监听`myChange事件`，控制`uni-datetime-picker组件`的`start`和`end`

``` js
<uni-datetime-picker v-model="dateRange" type="daterange" @change="dateRangeChange" @myChange="myChange" :start="dateStart" :end="dateEnd">
​
myChange (e) {
    // 判断如果是只选择了一个日期
    if (e.range.before && !e.range.after) {
        // 当前选择的日期
        // 此处使用dayjs进行操作，也可直接将 e.range.before 转换为时间戳，然后再计算对应的毫秒数进行复制，uni-datetime-picker组件 直接接收时间戳
        const chooseDate = dayjs(e.range.before)
        this.dateStart = chooseDate.add(1, 'month').format('YYYY-MM-DD')
        this.dateEnd = chooseDate.subtract(1, 'month').format('YYYY-MM-DD')
    }
}
```
