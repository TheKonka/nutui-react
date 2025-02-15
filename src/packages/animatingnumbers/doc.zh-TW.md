# AnimatingNumbers 數字動畫

## 介紹

數字動畫集合

## 安裝

```tsx
import { AnimatingNumbers } from '@nutui/nutui-react'
```

## 代碼演示

### AnimatingNumbers.CountUp-基礎用法

:::demo

```tsx
import React from 'react'
import { AnimatingNumbers } from '@nutui/nutui-react'

const App = () => {
  return <AnimatingNumbers.CountUp value="678.94" />
}
export default App
```

:::

### AnimatingNumbers.CountUp-自定義樣式，動態修改數據（需要指定最大位數）

:::demo

```tsx
import React, { useEffect, useState } from 'react'
import { AnimatingNumbers } from '@nutui/nutui-react'

const App = () => {
  const [value, setEndNumer] = useState('1570.99')
  useEffect(() => {
    setInterval(() => {
      setEndNumer(
        `${Math.floor(Math.random() * 999999)}.${Math.floor(
          Math.random() * 89 + 10
        )}`
      )
    }, 30000)
  }, [])
  return (
    <AnimatingNumbers.CountUp
      value={value}
      duration={1.2}
      length={6}
      className="custom-coutup"
    />
  )
}
export default App
```

:::

## AnimatingNumbers

### AnimatingNumbers.CountUp Props

| 屬性 | 說明 | 類型 | 默認值 |
| --- | --- | --- | --- |
| length | 設置最大展示長度，數值位數不夠，數值前面按位補 0 | `number` | `0` |
| value | 結束值,必填項 | `string` | `number` |
| delay | 等待動畫執行時間，單位 ms | `number` | `300` |
| duration | 動畫執行時間，單位 s | `number` | `1` |
| thousands | 是否有千位分隔符 | `boolean` | `false` |