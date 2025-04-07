import {Icon, InputX} from '@ui'
import {observer} from 'mobx-react'
import type {CSSProperties} from 'react'
import type {UIFrameworkVM} from './UIFrameworkVM'
import {spriteIconList} from './spriteIconList'

const iconGrid: CSSProperties = {
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(0, 130px)',
}

const propGrid: CSSProperties = {
  display: 'grid',
  gap: '32px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr)',
}

export const DemoIcons = observer(({vm}: {vm: UIFrameworkVM}) => {
  const icons =
    vm.iIconSearch.length < 2
      ? spriteIconList
      : spriteIconList.filter((icon) => icon.includes(vm.iIconSearch))

  const codeName = vm.iIconName ? `name="${vm.iIconName}"` : ''
  const codeBgPadding = vm.iIconBgPadding ? `bgPadding={${vm.iIconBgPadding}}` : ''
  const codeColor = vm.iIconColor ? `color="${vm.iIconColor}"` : ''
  const codeSize = vm.iIconSize ? `size={${vm.iIconSize}}` : ''
  const codeBgColor = vm.iIconBgColor ? `bgColor={${vm.iIconBgColor}}` : ''

  return (
    <>
      <section className="panel--simple" id="section-icons">
        <div className="pad-default">
          <h3 className="h3">Icons</h3>
          <div className="prop-grid" style={propGrid}>
            <div className="flex-row-center">
              <Icon
                name={vm.iIconName}
                color={vm.iIconColor}
                size={vm.iIconSize}
                bgPadding={vm.iIconBgPadding}
                bgColor={vm.iIconBgColor}
                className="no-shrink"
              />
              <pre className="margin-left-2">
                {`
<Icon
  ${codeName}
  ${codeColor}
  ${codeSize}
  ${codeBgPadding}
  ${codeBgColor}
/>
`}
              </pre>
            </div>
            <div className="grid-inputs">
              <label className="label" htmlFor="iIconName">
                name
              </label>
              <InputX vm={vm} name="iIconName" />

              <label className="label" htmlFor="iIconColor">
                color
              </label>
              <InputX vm={vm} name="iIconColor" />

              <label className="label" htmlFor="iIconSize">
                size
              </label>
              <InputX vm={vm} name="iIconSize" type="number" min="0" />

              <label className="label" htmlFor="iIconBgColor">
                bgColor
              </label>
              <InputX vm={vm} name="iIconBgColor" />

              <label className="label" htmlFor="iIconBgPadding">
                bgPadding
              </label>
              <InputX vm={vm} name="iIconBgPadding" type="number" min="0" />
            </div>
          </div>
        </div>

        <div className="pad-default">
          <div className="txt-right">
            <InputX vm={vm} name="iIconSearch" placeholder="Search Icon" />
          </div>

          <div style={iconGrid} className="margin-top-2">
            {icons.map((icon) => {
              return (
                <div className="flex-col pad-1 flex-col-center" key={icon}>
                  <Icon name={icon} size={24} />
                  <div>{icon}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
})
