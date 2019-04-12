## Icon examples

With __default values__ (32x32, black, inline with text bottom)

    <div>
      <Icon name="#alert"/> <span>Some nice text</span>
    </div>

## Changing the icon color

__color__: set any color for the icon

    <Icon name="#alert" color="SteelBlue"/>

__white__: shortcut for a white icon

    <Icon name="#alert" white bgColor="black"/>


## Changing the icon size

__small__: shortcut to have 16x16 icon

    <Icon name="#alert" small/>

__size__: shortcut to set same width and height

    <Icon name="#alert" size={64}/>

__width__ & __height__: same behaviour than setting them on a normal image

    <Icon name="#alert" width={64} height={16}/>


## Changing the icon position

__inline__: the icon is inlined with text by default (css inline-block).
If you need to use it as a block, use display="block"

    <div>
        <div><Icon name="#alert"/> <span>Icon aligned with text</span></div>
        <hr/>
        <div><Icon name="#alert" display="block"/> <span>Icon as block</span></div>
    </div>

__verticalAlign__: change the alignment with the text (any valid CSS vertical align value)

    <div>
        <div><Icon name="#alert" size={64} verticalAlign="top"/> <span>Icon aligned top</span></div>
        <hr/>
        <div><Icon name="#alert" size={64} verticalAlign="middle"/> <span>Icon aligned middle</span></div>
        <hr/>
        <div><Icon name="#alert" size={64} verticalAlign="bottom"/> <span>Icon aligned bottom</span></div>
    </div>

__top__: offsets the icon vertically (note: position: relative is set on the icon.)

    <div>
        <Icon name="#alert" top={8}/> <span>Icon aligned with text using offset</span>
    </div>


## Setting the icon background (optional)

* __bgColor__: the icon gets a background color.
* __bgPadding__: A padding is created between the icon and its wrapper. (Icon size is affected)
* __bgCircle__: The icon background becomes a circle.

    <Icon name="#alert" bgCircle bgColor="lightblue" bgPadding={8}/>
