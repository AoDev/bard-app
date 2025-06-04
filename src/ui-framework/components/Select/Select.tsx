import {type AllHTMLAttributes, type ChangeEvent, useCallback} from 'react'

type SimpleOption = string | number

interface BaseSelectProps extends Omit<AllHTMLAttributes<HTMLSelectElement>, 'value'> {
  /** key/value callback */
  onChangeNameValue?: (name: any, value: any, event?: ChangeEvent<HTMLSelectElement>) => void
  /** value callback */
  onChangeValue?: (value: any, event?: ChangeEvent<HTMLSelectElement>) => void
  /** Allows to have a select that can have no value selected, the label will be displayed and its value is undefined  */
  optionalLabel?: string
  className?: string
  preventDefault?: boolean
  required?: boolean
  /** If options objects are provided, the object will be emitted as value instead of object[valueKey] */
  valueAsObject?: boolean
}

/** Make sure that the object property specified as label is a number or a string. */
type ValidLabelKey<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never
}[keyof T]

interface ObjectBasedSelectProps<T extends object> extends BaseSelectProps {
  options: T[]
  value?: T | string | number
  valueKey: keyof T
  labelKey: ValidLabelKey<T>
}

interface ValueBasedSelectProps extends BaseSelectProps {
  options: SimpleOption[] | readonly SimpleOption[]
  value?: SimpleOption
}

type SelectProps<T extends object> = ObjectBasedSelectProps<T> | ValueBasedSelectProps

function isObjectBasedProps<T extends object>(
  props: SelectProps<T>
): props is ObjectBasedSelectProps<T> {
  return 'valueKey' in props
}

function getOptionSelectedValue<T extends object>(
  props: SelectProps<T>
): string | number | undefined {
  if (isObjectBasedProps(props)) {
    const {valueKey, value, options} = props
    if (typeof value === 'undefined' && options.length > 0 && !props.optionalLabel) {
      // @ts-expect-error Dont know how to solve the type issue yet
      return options[0][valueKey]
    }
    // @ts-expect-error Dont know how to solve the type issue yet
    return typeof value === 'object' ? value[valueKey] : value
  }
  return props.value
}

/**
 * Select component that extends the standard select element with additional features.
 *
 * Options and value can be provided in two ways:
 * * `Object-based` options (when valueKey and labelKey are specified): Each option in the array is an object, and you can define `valueKey` and `labelKey` to extract the value and label from each object.
 * * `primitive-based` options (when valueKey and labelKey are not specified): Each option in the array is a simple string or number that serves as both the value and label for the option.
 *
 * ```
 * // primitive-based
 * <Select options={[1, 2, 3]} value={1} />
 *
 * // object-based
 * const objectOptions = [{id: '1', name: 'one'}, {id: '2', name: 'two'}]
 * <Select options={objectOptions} valueKey="id" labelKey="name" value={'1'} />
 * <Select options={objectOptions} valueKey="id" labelKey="name" value={{id: '1', name: 'one'}} />
 * ```
 *
 * The value can be emitted in 3 ways:
 * * `onChange(event)`: normal, select change event
 * * `onChangeValue(value, event)`: if your callback only needs the value
 * * `onChangeNameValue(name, value, event)`: if your callback needs a key/value pair
 *
 * ```
 * <Select onChangeNameValue={(name, value) => ...} name="number" value="one" />
 * ```
 * Additionally, in case of objects options, the value emitted can be either the object itself or `object[valueKey]`.
 * By default, object[valueKey] is emitted, use `valueAsObject` if you want the object.
 * ```
 * <Select onChangeValue={(value) => ...} options={objectOptions} />
 * // called: onChangeValue('1')
 * <Select onChangeValue={(value) => ...} options={objectOptions} valueAsObject />
 * // called: onChangeValue({id: '1', name: 'one'})
 * ```
 */
export function Select<T extends object>(props: SelectProps<T>) {
  const {
    options = [],
    value,
    // @ts-expect-error TS won't allow destructuring a key that might be undefined
    valueKey,
    // @ts-expect-error TS won't allow destructuring a key that might be undefined
    labelKey,
    onChange,
    onChangeNameValue,
    onChangeValue,
    optionalLabel,
    className = '',
    preventDefault,
    required,
    valueAsObject,
    ...otherProps
  } = props

  // biome-ignore lint/correctness/useExhaustiveDependencies: gambling that anything else than values related props won't change to avoid checking many dependencies
  const onSelect = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      if (preventDefault) {
        event.preventDefault()
      }
      const {name} = event.target
      let value: T | string | number | undefined = event.target.value
      const isOptionalLabel = event.target.selectedOptions[0]?.innerText === optionalLabel

      if (isOptionalLabel) {
        value = undefined
      } else {
        const shouldParse = isObjectBasedProps(props)
          ? typeof props.options[0]?.[props.valueKey] === 'number'
          : typeof props.options[0] === 'number'
        if (shouldParse) {
          const valueAsNumber = Number(value)
          // Sometimes, parsing detection can be a false positive if value types are mixed
          value = isFinite(valueAsNumber) ? valueAsNumber : value
        }
      }

      if (isObjectBasedProps(props) && typeof props.value === 'object' && valueAsObject) {
        value = props.options.find((option) => option[props.valueKey] === value)
      }

      onChange?.(event)
      onChangeValue?.(value, event)
      onChangeNameValue?.(name, value, event)
    },
    [valueKey, labelKey, optionalLabel, options]
  )

  const cssClass =
    className + (!!optionalLabel && typeof value === 'undefined' ? ' txt-placeholder' : '')

  const optionsJsx = isObjectBasedProps(props)
    ? props.options.map((item) => {
        const label = item[props.labelKey] as string
        const id = item[props.valueKey] as string
        // TODO fix the types instead of using as
        return (
          <option key={id} value={id}>
            {label}
          </option>
        )
      })
    : props.options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))

  return (
    <select
      value={getOptionSelectedValue(props)}
      onChange={onSelect}
      required={required}
      className={cssClass}
      {...otherProps}
    >
      {optionalLabel && <option value="">{optionalLabel}</option>}

      {optionsJsx}
    </select>
  )
}
