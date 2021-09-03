// 雖然沒 import, 但需要安裝 npm @eva/renderer-adapter

import { resource, RESOURCE_TYPE, Game, GameObject } from '@eva/eva.js'
import { RendererSystem } from '@eva/plugin-renderer'
import { ImgSystem, Img } from '@eva/plugin-renderer-img'
import { EventSystem, Event } from '@eva/plugin-renderer-event'
import { TransitionSystem, Transition } from '@eva/plugin-transition'

console.log('npm + webpack running')

// 加入 Resource
resource.addResource([
  {
    name: 'heartImg',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url: 'https://gw.alicdn.com/bao/uploaded/TB1lVHuaET1gK0jSZFhXXaAtVXa-200-200.png',
      },
    },
    preload: true,
  },
])

// 創建渲染系統
const rendererSystem = new RendererSystem({
  canvas: document.querySelector('#canvas'),
  width: 750,
  height: 1000,
})

// 建立 game instance
const game = new Game({
  frameRate: 60,
  autoStart: true,
  systems: [
    rendererSystem, //
    new ImgSystem(),
    new EventSystem(),
    new TransitionSystem(),
  ]
})

// 建立 game object
const heart = new GameObject('heart', {
  size: { width: 200, height: 200 },
  position: { x: 0, y: 0 },
  origin: { x: 0, y: 0 },
  anchor: { x: 0, y: 0 },
})

heart.addComponent(new Img({ resource: 'heartImg' }))

// 添加 tap 事件
heart.addComponent(new Event()).on('tap', () => { alert(1) })

// 添加位移動畫
const transition = heart.addComponent(new Transition())
transition.group = {
  idle: [
    {
      name: 'position.x',
      component: heart.transform,
      values: [
        { time: 0, value: 0, tween: 'ease-out' },
        { time: 1000, value: 400, tween: 'ease-in' },
        { time: 2000, value: 0 },
      ],
    },
  ],
}
transition.play('idle', Infinity)

game.scene.addChild(heart)