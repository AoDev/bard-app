import type {Theme} from '@src/config'
import {observer} from 'mobx-react'
import {type CSSProperties, useMemo} from 'react'
import ReactMarkdown from 'react-markdown'
import type {Components} from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneDark, oneLight} from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import type {UIFrameworkVM} from '../UIFrameworkVM'
import sections from './sections.json'

const containerStyle: CSSProperties = {maxWidth: '800px'}

const reactMarkdownComponents: Components = {
  h1: ({children}) => <h1 className="h1">{children}</h1>,
  h2: ({children}) => <h2 className="h2">{children}</h2>,
  h3: ({children}) => <h3 className="h3">{children}</h3>,
  h4: ({children}) => <h4 className="h4">{children}</h4>,
  ul: ({children}) => <ul className="list">{children}</ul>,
  img: ({src, alt = 'Image'}) => <img src={src} alt={alt} className="width-100p" />,
  hr: () => <hr className="margin-v-2" />,
  blockquote: ({children}) => <blockquote className="blockquote">{children}</blockquote>,
  table: ({children}) => <table className="table">{children}</table>,
  a: ({href, children}) => (
    <a href={href} className="link--discreet">
      {children}
    </a>
  ),
}

const highlighterThemes: Record<Theme, Record<string, CSSProperties>> = {
  dark: oneDark,
  light: oneLight,
}

function getComponents(theme: Theme): Components {
  return {
    ...reactMarkdownComponents,
    code({className, children}) {
      const match = /language-(\w+)/.exec(className || '')
      const isInline = !className?.includes('language-')

      return !isInline && match ? (
        <SyntaxHighlighter style={highlighterThemes[theme]} language={match[1]} PreTag="div">
          {String(children)}
        </SyntaxHighlighter>
      ) : (
        <code className={className}>{children}</code>
      )
    },
  }
}

export const FrontendGuide = observer(({vm}: {vm: UIFrameworkVM}) => {
  const {contentId} = vm.contentSelected
  const {theme} = vm.rootStore.settings
  const currentSection = sections.find((section) => section.id === contentId) || sections[0]
  const components = useMemo(() => getComponents(theme), [theme])
  return (
    <div className="panel--simple pad-default" style={containerStyle}>
      <div className="markdown-bdy">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components}
        >
          {currentSection.content}
        </ReactMarkdown>
      </div>
    </div>
  )
})
