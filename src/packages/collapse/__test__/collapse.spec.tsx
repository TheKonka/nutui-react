import * as React from 'react'
// import * as renderer from 'react-test-renderer'

import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DownArrow, ArrowRight2 } from '@nutui/icons-react'
import { Collapse } from '../collapse'
import { CollapseItem } from '../../collapseitem/collapseitem'

test('should match snapshot', () => {
  const { asFragment } = render(
    <>
      <Collapse activeName={['1', '2']} expandIcon={<DownArrow />}>
        <CollapseItem title="标题1" name="1">
          京东“厂直优品计划”首推“政府优品馆” 3年覆盖80%镇级政府
        </CollapseItem>
        <CollapseItem title="标题2" name="2">
          京东“厂直优品计划”首推“政府优品馆” 3年覆盖80%镇级政府
        </CollapseItem>
        <CollapseItem title="标题3" name="3" disabled>
          京东“厂直优品计划”首推“政府优品馆”
        </CollapseItem>
      </Collapse>
    </>
  )
  expect(asFragment()).toMatchSnapshot()
})

test('prop icon iconSize iconColor', () => {
  const { getByTestId, container } = render(
    <>
      <Collapse activeName={['1', '2']} expandIcon={<DownArrow />}>
        <CollapseItem title="标题1" name="1">
          京东“厂直优品计划”首推“政府优品馆” 3年覆盖80%镇级政府
        </CollapseItem>
        <CollapseItem title="标题2" name="2">
          京东“厂直优品计划”首推“政府优品馆” 3年覆盖80%镇级政府
        </CollapseItem>
        <CollapseItem title="标题3" name="3" disabled>
          京东“厂直优品计划”首推“政府优品馆”
        </CollapseItem>
      </Collapse>
    </>
  )
  expect(
    container.querySelector('.nut-collapse-item__icon .nut-icon')
  ).toHaveClass('nut-icon-DownArrow')
})

test('prop activeName', () => {
  const { container } = render(
    <>
      <Collapse activeName={['1', '2']} expandIcon={<DownArrow />}>
        <CollapseItem title="标题1" name="1">
          京东“厂直优品计划”首推“政府优品馆” 3年覆盖80%镇级政府
        </CollapseItem>
        <CollapseItem title="标题2" name="2">
          京东“厂直优品计划”首推“政府优品馆” 3年覆盖80%镇级政府
        </CollapseItem>
        <CollapseItem title="标题3" name="3" disabled>
          京东“厂直优品计划”首推“政府优品馆”
        </CollapseItem>
      </Collapse>
    </>
  )

  setTimeout(() => {
    expect(container.querySelector('.nut-collapse-item__content')).toHaveStyle(
      'height: 66px'
    )
  }, 100)
})

test('prop accordion', () => {
  const { getByTestId, container } = render(
    <>
      <Collapse activeName={['1']} accordion expandIcon={<DownArrow />}>
        <CollapseItem
          title="标题1"
          name="1"
          extra="文本内容"
          data-testid="collapse-one"
        >
          第一个内容
        </CollapseItem>
        <CollapseItem title="标题2" name="2" data-testid="collapse-item">
          第二个内容
        </CollapseItem>
        <CollapseItem title="标题3" name="3">
          第三个内容
        </CollapseItem>
      </Collapse>
    </>
  )
  fireEvent.click(getByTestId('collapse-item'))
  setTimeout(() => {
    expect(
      getByTestId('collapse-one').querySelector('.nut-collapse-item__content')
    ).toHaveStyle('height: 0px')
    expect(
      getByTestId('collapse-item').querySelector('.nut-collapse-item__content')
    ).toHaveStyle('height: 45px')
  }, 100)
})

test('prop rotate', () => {
  const { getByTestId, container } = render(
    <>
      <Collapse
        activeName={['1']}
        accordion
        expandIcon={<ArrowRight2 />}
        rotate={180}
      >
        <CollapseItem
          title="标题1"
          name="1"
          expandIcon={<DownArrow />}
          data-testid="collapse-one"
        >
          京东“厂直优品计划”首推“政府优品馆” 3年覆盖80%镇级政府
        </CollapseItem>
        <CollapseItem title="标题2" name="2" expandIcon={<DownArrow />}>
          京东“厂直优品计划”首推“政府优品馆” 3年覆盖80%镇级政府
        </CollapseItem>
        <CollapseItem title="标题3" name="3" expandIcon={<DownArrow />}>
          京东“厂直优品计划”首推“政府优品馆”
        </CollapseItem>
      </Collapse>
    </>
  )
  fireEvent.click(getByTestId('collapse-one'))
  setTimeout(() => {
    expect(
      getByTestId('collapse-one').querySelector('.nut-collapse-item__icon')
    ).toHaveStyle('transform: translateY(-50%) rotate(180deg);')
  }, 100)
})

test('prop title extra titleIconColor titleIconSize titleIconPosition', () => {
  const { getByTestId, container } = render(
    <>
      <Collapse activeName={['1']} accordion expandIcon={<ArrowRight2 />}>
        <CollapseItem
          title="标题1"
          extra="副标题"
          name="1"
          data-testid="collapse-one"
        >
          京东“厂直优品计划”首推“政府优品馆” 3年覆盖80%镇级政府
        </CollapseItem>
        <CollapseItem title="标题2" name="2" expandIcon={<DownArrow />}>
          京东“厂直优品计划”首推“政府优品馆” 3年覆盖80%镇级政府
        </CollapseItem>
        <CollapseItem title="标题3" name="3" expandIcon={<DownArrow />}>
          京东“厂直优品计划”首推“政府优品馆”
        </CollapseItem>
      </Collapse>
    </>
  )
  expect(
    getByTestId('collapse-one').querySelector('.nut-collapse-item__title')
  ).toHaveTextContent('标题1')
  expect(
    getByTestId('collapse-one').querySelector('.nut-collapse-item__extra')
  ).toHaveTextContent('副标题')
  expect(getByTestId('collapse-one').querySelector('.nut-icon')).toHaveClass(
    'nut-icon-ArrowRight2'
  )
})
