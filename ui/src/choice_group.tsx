// Copyright 2020 H2O.ai, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as Fluent from '@fluentui/react'
import React from 'react'
import { B, bond, S, qd } from './qd'
import { displayMixin } from './theme'

/**
 *  Create a choice for a checklist, choice group or dropdown.
 */
export interface Choice {
  /** An identifying name for this component. */
  name: S
  /** Text to be displayed alongside the component. */
  label?: S
  /** True if the checkbox is disabled. */
  disabled?: B
}

/**
 * Create a choice group.
 * The choice group component, also known as radio buttons, let users select one option from two or more choices.
 * Each option is represented by one choice group button; a user can select only one choice group in a button group.
 *
 * Choice groups emphasize all options equally, and that may draw more attention to the options than necessary.
 * Consider using other components, unless the options deserve extra attention from the user.
 * For example, if the default option is recommended for most users in most situations, use a dropdown instead.
 *
 * If there are only two mutually exclusive options, combine them into a single Checkbox or Toggle switch.
 * For example, use a checkbox for "I agree" instead of choice group buttons for "I agree" and "I don't agree."
*/
export interface ChoiceGroup {
  /** An identifying name for this component. */
  name: S
  /** Text to be displayed alongside the component. */
  label?: S
  /** The name of the selected choice. */
  value?: S
  /** The choices to be presented. */
  choices?: Choice[]
  /** True if this field is required. */
  required?: B
  /** True if the form should be submitted when the selection changes. */
  trigger?: B
  /** True if the component should be visible. Defaults to true. */
  visible?: B
  /** An optional tooltip message displayed when a user clicks the help icon to the right of the component. */
  tooltip?: S
}

export const
  XChoiceGroup = bond(({ model: m }: { model: ChoiceGroup }) => {
    qd.args[m.name] = m.value || null
    const
      options = (m.choices || []).map(({ name, label, disabled }): Fluent.IChoiceGroupOption => ({ key: name, text: label || name, disabled })),
      onChange = (_e?: React.FormEvent<HTMLElement>, option?: Fluent.IChoiceGroupOption) => {
        if (option) qd.args[m.name] = option.key
        if (m.trigger) qd.sync()
      },
      render = () => (
        <Fluent.ChoiceGroup
          data-test={m.name}
          style={displayMixin(m.visible)}
          label={m.label}
          required={m.required}
          defaultSelectedKey={m.value}
          options={options}
          onChange={onChange}
        />
      )

    return { render }
  })