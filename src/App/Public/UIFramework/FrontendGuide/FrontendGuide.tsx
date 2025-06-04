import type {Theme} from '@src/config'
import {Button, Icon} from '@ui'
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

const containerStyle: CSSProperties = {maxWidth: '48em'}

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

/**
 * Removes "Next" navigation links from markdown content
 * We do this because the links in markdown only works if viewed on Github
 * so we replace them with our own next links in this component.
 * Looks for patterns like `[Next: "..."](...md)` at the end of the content
 */
function removeNextLinks(content: string): string {
  return content
    .replace(/\n---\n\[Next:.*$/s, '') // Remove if after horizontal rule
    .replace(/\n\[Next:.*$/s, '') // Remove if at the end directly
}

/**
 * Returns the components for the markdown renderer,
 * especially adapting the theme for the code blocks.
 */
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
  const components = useMemo(() => getComponents(theme), [theme])

  const currentIndex = sections.findIndex((section) => section.id === contentId)

  if (currentIndex === -1) {
    return (
      <div className="panel--simple pad-default" style={containerStyle}>
        Content not found
      </div>
    )
  }

  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null

  return (
    <div className="panel--simple pad-default" style={containerStyle}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {sections[currentIndex]
          ? removeNextLinks(sections[currentIndex].content)
          : `Content not found for index ${currentIndex}`}
      </ReactMarkdown>

      {nextSection && (
        <Button variant="link" onClickValue={vm.goToSection} value={nextSection.id}>
          <div className="flex-row-center gap-1">
            <span>Next: "{nextSection.title}"</span> <Icon name="caret-right" size={12} />
          </div>
        </Button>
      )}
    </div>
  )
})
