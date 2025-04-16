import biomeLogo from '@src/assets/images/biome-logo.svg'
import lessLogo from '@src/assets/images/lessjs-logo.svg'
import mobxLogo from '@src/assets/images/mobx-logo.svg'
import reactLogo from '@src/assets/images/react-logo.svg'
import rsbuildLogo from '@src/assets/images/rsbuild-logo.svg'
import typescriptLogo from '@src/assets/images/typescript-logo.svg'
import {Link} from 'bard-router'
import {memo} from 'react'

const techStack: {
  name: string
  logo: string
}[] = [
  {name: 'React', logo: reactLogo},
  {name: 'MobX', logo: mobxLogo},
  {name: 'Less', logo: lessLogo},
  {name: 'Typescript', logo: typescriptLogo},
  {name: 'RS-Build', logo: rsbuildLogo},
  {name: 'Biome', logo: biomeLogo},
]

export const Home = memo(() => {
  return (
    <div className="center-optimal">
      <div className="panel--simple pad-default">
        <div className="grid-3-col gap-2">
          {techStack.map((tech) => (
            <div className="txt-center" key={tech.name}>
              <img src={tech.logo} height={80} width={80} alt={tech.name} />
              <div>{tech.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pad-default flex-center justify-between margin-top-2">
        <Link className="link--discreet" to="/public/ui-framework">
          UI Framework
        </Link>
        <Link className="link--discreet" to="/public/sign-in">
          Sign In (demo)
        </Link>
      </div>
    </div>
  )
})
