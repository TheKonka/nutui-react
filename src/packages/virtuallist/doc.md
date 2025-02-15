# VirtualList 虚拟列表

## 介绍

在正常的列表展示以及上拉加载中，我们通常使用 NutUI-React 提供的 滚动加载 组件，那如果我们加载的数据量非常大时，则可能会产生严重的性能问题，导致视图无法响应操作一段时间，这时候我们就用到了虚拟列表组件 VirtualList，它可以保证只渲染当前可视区域，其他部分在用户滚动到可视区域内之后再渲染。保证了页面流程度，提升性能。

## 安装

```tsx
import { VirtualList } from '@nutui/nutui-react';
```

## 代码演示

### 基础用法-垂直等高

:::demo

```tsx
import React, {  FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { VirtualList } from '@nutui/nutui-react';

const App =() => {
  const [list, setsourceData] = useState([])

  const getData = useCallback(() => {
    const datas = []
    const pageSize = 90
    for (let i = 10; i < pageSize; i++) {
      datas.push(`${i} Item`)
    }
    setsourceData((list) => {
      return [...list, ...datas]
    })
  }, [])
  useEffect(() => {
    getData()
  }, [getData])
  const ItemRender = ({ data,index }) => {
    return <p>自定义-{data}-{index}</p>
  }
  const ItemRenderMemo = React.memo(ItemRender)
  return (
    <div className='nut-virtualList-demo-box  hideScrollbar heigh1'>
      <VirtualList
        itemHeight={66}
        list={list}
        ItemRender={ItemRenderMemo}
      />
    </div>
  )
}
export default App;
```

:::

### 垂直不等高&无限下滑

:::demo

```tsx
import React, {  FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { VirtualList } from '@nutui/nutui-react';

const App =() => {
  const [list, setsourceData] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const getData = useCallback(() => {
    const datas = []
    const pageSize = 90
    for (let i = 10; i < pageSize; i++) {
      datas.push(`${i} Item`)
    }
    setsourceData((list) => {
      return [...list, ...datas]
    })
  }, [])
  const onScroll = () => {
    if (pageNo > 100) return
    setPageNo(pageNo + 1)
  }
  useEffect(() => {
    getData()
  }, [getData])
  const ItemVariable = ({ data, index }) => {
    return (
      <p className={index % 2 === 0 ? '' : 'nut-virtualList-demo-item'}>可变大小隔行展示-{data}</p>
    )
  }
  /** itemSize为首屏最大元素大小 */
  const ItemVariableDemo = React.memo(ItemVariable)
  return (
    <div className='nut-virtualList-demo-box  hideScrollbar heigh1'>
      <VirtualList
        list={list}
        ItemRender={ItemVariableDemo}
        itemHeight={128}
        itemEqual={false}
        onScroll={onScroll}
      />
    </div>
  )
}
export default App;
```

:::

### 水平等宽

:::demo

```tsx
import React, {  FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { VirtualList } from '@nutui/nutui-react';

const App =() => {
  const [list, setsourceData] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const getData = useCallback(() => {
    const datas = []
    const pageSize = 90
    for (let i = 10; i < pageSize; i++) {
      datas.push(`${i} Item`)
    }
    setsourceData((list) => {
      return [...list, ...datas]
    })
  }, [])
  useEffect(() => {
    getData()
  }, [getData])
  const ItemRender = ({ data,index }) => {
    return <p>自定义-{data}-{index}</p>
  }
  const ItemRenderMemo = React.memo(ItemRender)
  return (
    <div className='nut-virtualList-demo-box  hideScrollbar'>
      <VirtualList
        list={list}
        ItemRender={ItemRenderMemo}
        itemHeight={124}
        direction="horizontal"
      />
    </div>
  )
}
export default App;
```

:::

### 水平不等宽&无限滑动

:::demo

```tsx
import React, {  FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { VirtualList } from '@nutui/nutui-react';

const App =() => {
  const [list, setsourceData] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const getData = useCallback(() => {
    const datas = []
    const pageSize = 90
    for (let i = 10; i < pageSize; i++) {
      datas.push(`${i} Item`)
    }
    setsourceData((list) => {
      return [...list, ...datas]
    })
  }, [])
  const onScroll = () => {
    if (pageNo > 100) return
    setPageNo(pageNo + 1)
  }
  useEffect(() => {
    getData()
  }, [getData])
  const ItemVariable = ({ data, index }) => {
    return (
      <p className={index % 2 === 0 ? '' : 'nut-virtualList-demo-item'}>可变大小隔行展示-{data}</p>
    )
  }
  /** itemSize为首屏最大元素大小 */
  const ItemVariableDemo = React.memo(ItemVariable)
  return (
    <div className='nut-virtualList-demo-box  hideScrollbar'>
      <VirtualList
        list={list}
        itemHeight={300}
        ItemRender={ItemVariableDemo}
        direction="horizontal"
        itemEqual={false}
        onScroll={onScroll}
      />
    </div>
  )
}
export default App;
```

:::

## VirtualList

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| list | 获取数据 | `Array` | `-` |
| containerHeight | 容器高度 | `number` | `获取元素的 offsetWidth 或 offsetHeight，需要 css 给出` |
| ItemRender | virtual 列表父节点渲染的函数 | `React.FC` | `-` |
| itemHeight | item 高度，如果不定高，则为首屏单个最大 height | `number` | `66` |
| itemEqual | item 高度是否一致 | `boolean` | `true` |
| overscan | 除了视窗里面默认的元素, 还需要额外渲染的 item 个数 | `number` | `2` |
| key | 用于指定 list 数据每一项的唯一 key 的字段名，默认取下标 | `string` | `-` |
| direction | `vertical`、`horizontal` | `string` | `vertical` |
| onScroll | 滑动到底(右)的事件，可以实现无限滚动 | `() => void` | `-` |