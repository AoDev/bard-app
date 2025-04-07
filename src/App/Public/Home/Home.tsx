import {memo} from 'react'

export const Home = memo(() => {
  return (
    <div className="panel--simple pad-default">
      <ul>
        <li>RS-Build</li>
        <li>React</li>
        <li>Typescript</li>
        <li>MobX</li>
        <li>Biome</li>
        <li>Less</li>
      </ul>
    </div>
  )
})
