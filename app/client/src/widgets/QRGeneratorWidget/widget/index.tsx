import type { ReactNode } from "react";
import React from "react";

import type { TextSize } from "constants/WidgetConstants";
import { countOccurrences } from "workers/Evaluation/helpers";

import { ValidationTypes } from "constants/WidgetValidation";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";

import WidgetStyleContainer from "components/designSystems/appsmith/WidgetStyleContainer";
import type { Color } from "constants/Colors";
import { pick } from "lodash";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import type { ContainerStyle } from "widgets/ContainerWidget/component";
import type { TextAlign } from "../component";
import TextComponent from "../component";
import { OverflowTypes } from "../constants";

const MAX_HTML_PARSING_LENGTH = 1000;
class TextWidget extends BaseWidget<TextWidgetProps, WidgetState> {
  static getPropertyPaneConfig() {
    return [
      {
        sectionName: "属性",
        children: [
          {
            propertyName: "text",
            helpText: "Sets the text of the widget",
            label: "文本",
            controlType: "INPUT_TEXT",
            placeholderText: "Name:",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: { limitLineBreaks: true },
            },
          },
          {
            propertyName: "overflow",
            label: "Overflow",
            helpText: "Controls the text behavior when length of text exceeds",
            controlType: "DROP_DOWN",
            options: [
              {
                label: "Scroll contents",
                value: OverflowTypes.SCROLL,
              },
              {
                label: "Truncate text",
                value: OverflowTypes.TRUNCATE,
              },
              {
                label: "No overflow",
                value: OverflowTypes.NONE,
              },
            ],
            defaultValue: OverflowTypes.NONE,
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "isVisible",
            helpText: "控制组件的显示/隐藏",
            label: "是否显示",
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: "加载时显示动画",
            controlType: "SWITCH",
            helpText: "组件依赖的数据加载时显示加载动画",
            defaultValue: false,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "disableLink",
            helpText: "Controls parsing text as Link",
            label: "Disable link",
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: "Styles",
        children: [
          {
            propertyName: "backgroundColor",
            label: "Cell background color",
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                regex: /^((?![<|{{]).+){0,1}/,
                expected: {
                  type: "string (HTML color name or HEX value)",
                  example: `red | #9C0D38`,
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
          },
          {
            propertyName: "textColor",
            label: "文本颜色",
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                regex: /^(?![<|{{]).+/,
              },
            },
          },
          {
            propertyName: "truncateButtonColor",
            label: "Truncate button color",
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                regex: /^(?![<|{{]).+/,
              },
            },
            dependencies: ["overflow"],
            hidden: (props: TextWidgetProps) => {
              return props.overflow !== OverflowTypes.TRUNCATE;
            },
          },
          {
            helpText: "使用 html 颜色名, HEX, RGB 或者 RGBA 颜色格式",
            placeholderText: "#FFFFFF / Gray / rgb(255, 99, 71)",
            propertyName: "borderColor",
            label: "边框颜色",
            controlType: "COLOR_PICKER",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText:
              "Enter value for border width which can also use as margin",
            propertyName: "borderWidth",
            label: "边框宽度",
            placeholderText: "单位是 px",
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.NUMBER },
          },
          {
            propertyName: "fontSize",
            label: "Text size",
            controlType: "DROP_DOWN",
            defaultValue: "1rem",
            options: [
              {
                label: "S",
                value: "0.875rem",
                subText: "0.875rem",
              },
              {
                label: "M",
                value: "1rem",
                subText: "1rem",
              },
              {
                label: "L",
                value: "1.25rem",
                subText: "1.25rem",
              },
              {
                label: "XL",
                value: "1.875rem",
                subText: "1.875rem",
              },
              {
                label: "XXL",
                value: "3rem",
                subText: "3rem",
              },
              {
                label: "3XL",
                value: "3.75rem",
                subText: "3.75rem",
              },
            ],
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
            },
          },
          {
            propertyName: "fontFamily",
            label: "Font family",
            controlType: "DROP_DOWN",
            options: [
              {
                label: "System Default",
                value: "System Default",
              },
              {
                label: "Nunito Sans",
                value: "Nunito Sans",
              },
              {
                label: "Poppins",
                value: "Poppins",
              },
              {
                label: "Inter",
                value: "Inter",
              },
              {
                label: "Montserrat",
                value: "Montserrat",
              },
              {
                label: "Noto Sans",
                value: "Noto Sans",
              },
              {
                label: "Open Sans",
                value: "Open Sans",
              },
              {
                label: "Roboto",
                value: "Roboto",
              },
              {
                label: "Rubik",
                value: "Rubik",
              },
              {
                label: "Ubuntu",
                value: "Ubuntu",
              },
            ],
            defaultValue: "System Default",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
            },
          },
          {
            propertyName: "fontStyle",
            label: "Font Style",
            controlType: "BUTTON_GROUP",
            options: [
              {
                startIcon: "text-bold",
                value: "BOLD",
              },
              {
                startIcon: "text-italic",
                value: "ITALIC",
              },
            ],
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "textAlign",
            label: "Text align",
            controlType: "ICON_TABS",
            options: [
              {
                startIcon: "align-left",
                value: "LEFT",
              },
              {
                startIcon: "align-center",
                value: "CENTER",
              },
              {
                startIcon: "align-right",
                value: "RIGHT",
              },
            ],
            defaultValue: "LEFT",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
    ];
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: "属性",
        children: [
          {
            propertyName: "text",
            helpText: "Sets the text of the widget",
            label: "文本",
            controlType: "INPUT_TEXT",
            placeholderText: "Name:",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: { limitLineBreaks: true },
            },
          },
          {
            propertyName: "overflow",
            label: "Overflow Text",
            helpText: "Controls the text behavior when length of text exceeds",
            controlType: "DROP_DOWN",
            options: [
              {
                label: "Scroll contents",
                value: OverflowTypes.SCROLL,
              },
              {
                label: "Truncate text",
                value: OverflowTypes.TRUNCATE,
              },
              {
                label: "No overflow",
                value: OverflowTypes.NONE,
              },
            ],
            defaultValue: OverflowTypes.NONE,
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "isVisible",
            helpText: "控制组件的显示/隐藏",
            label: "是否显示",
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: "加载时显示动画",
            controlType: "SWITCH",
            helpText: "组件依赖的数据加载时显示加载动画",
            defaultValue: false,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "disableLink",
            helpText: "Controls parsing text as Link",
            label: "Disable link",
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
    ];
  }

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: "属性",
        children: [
          {
            propertyName: "fontFamily",
            label: "Font family",
            controlType: "DROP_DOWN",
            options: [
              {
                label: "System Default",
                value: "System Default",
              },
              {
                label: "Nunito Sans",
                value: "Nunito Sans",
              },
              {
                label: "Poppins",
                value: "Poppins",
              },
              {
                label: "Inter",
                value: "Inter",
              },
              {
                label: "Montserrat",
                value: "Montserrat",
              },
              {
                label: "Noto Sans",
                value: "Noto Sans",
              },
              {
                label: "Open Sans",
                value: "Open Sans",
              },
              {
                label: "Roboto",
                value: "Roboto",
              },
              {
                label: "Rubik",
                value: "Rubik",
              },
              {
                label: "Ubuntu",
                value: "Ubuntu",
              },
            ],
            defaultValue: "System Default",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
            },
          },
          {
            propertyName: "fontSize",
            label: "字体大小",
            controlType: "DROP_DOWN",
            defaultValue: "1rem",
            options: [
              {
                label: "S",
                value: "0.875rem",
                subText: "0.875rem",
              },
              {
                label: "M",
                value: "1rem",
                subText: "1rem",
              },
              {
                label: "L",
                value: "1.25rem",
                subText: "1.25rem",
              },
              {
                label: "XL",
                value: "1.875rem",
                subText: "1.875rem",
              },
              {
                label: "XXL",
                value: "3rem",
                subText: "3rem",
              },
              {
                label: "3XL",
                value: "3.75rem",
                subText: "3.75rem",
              },
            ],
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
            },
          },
        ],
      },
      {
        sectionName: "颜色",
        children: [
          {
            propertyName: "textColor",
            label: "文本颜色",
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                regex: /^(?![<|{{]).+/,
              },
            },
          },
          {
            propertyName: "backgroundColor",
            label: "背景颜色",
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                regex: /^((?![<|{{]).+){0,1}/,
                expected: {
                  type: "string (HTML color name or HEX value)",
                  example: `red | #9C0D38`,
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
          },
          {
            helpText: "使用 html 颜色名, HEX, RGB 或者 RGBA 颜色格式",
            placeholderText: "#FFFFFF / Gray / rgb(255, 99, 71)",
            propertyName: "borderColor",
            label: "边框颜色",
            controlType: "COLOR_PICKER",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "truncateButtonColor",
            label: "Truncate button color",
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                regex: /^(?![<|{{]).+/,
              },
            },
            dependencies: ["overflow"],
            hidden: (props: TextWidgetProps) => {
              return props.overflow !== OverflowTypes.TRUNCATE;
            },
          },
        ],
      },
      {
        sectionName: "文本样式",
        children: [
          {
            propertyName: "textAlign",
            label: "对齐",
            controlType: "ICON_TABS",
            options: [
              {
                startIcon: "align-left",
                value: "LEFT",
              },
              {
                startIcon: "align-center",
                value: "CENTER",
              },
              {
                startIcon: "align-right",
                value: "RIGHT",
              },
            ],
            defaultValue: "LEFT",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "fontStyle",
            label: "强调",
            controlType: "BUTTON_GROUP",
            options: [
              {
                icon: "text-bold",
                value: "BOLD",
              },
              {
                icon: "text-italic",
                value: "ITALIC",
              },
            ],
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: "边框/阴影",
        children: [
          {
            helpText:
              "Enter value for border width which can also use as margin",
            propertyName: "borderWidth",
            label: "边框宽度",
            placeholderText: "单位是 px",
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.NUMBER },
          },
        ],
      },
    ];
  }

  /**
   * Disable html parsing for long continuous texts
   * @returns boolean
   */
  shouldDisableLink = (): boolean => {
    const text = this.props.text || "";
    const count: number = countOccurrences(text, "\n", false, 0);
    return (
      (count === 0 && text.length > MAX_HTML_PARSING_LENGTH) ||
      text.length > 50000
    );
  };

  getWidgetView() {
    const disableLink: boolean = this.props.disableLink
      ? true
      : this.shouldDisableLink();
    return (
      <WidgetStyleContainer
        className="t--text-widget-container"
        {...pick(this.props, [
          "widgetId",
          "containerStyle",
          "borderColor",
          "borderWidth",
        ])}
      >
        <TextComponent
          backgroundColor={this.props.backgroundColor}
          disableLink={disableLink}
          fontFamily={this.props.fontFamily}
          fontSize={this.props.fontSize}
          fontStyle={this.props.fontStyle}
          isLoading={this.props.isLoading}
          key={this.props.widgetId}
          overflow={this.props.overflow}
          text={this.props.text}
          textAlign={this.props.textAlign ? this.props.textAlign : "LEFT"}
          textColor={this.props.textColor}
          truncateButtonColor={this.props.truncateButtonColor}
          widgetId={this.props.widgetId}
        />
      </WidgetStyleContainer>
    );
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {
      value: `{{ this.text }}`,
    };
  }

  static getWidgetType() {
    return "QRGENERATOR_WIDGET";
  }
}

export interface TextStyles {
  backgroundColor?: string;
  textColor?: string;
  fontStyle?: string;
  fontSize?: TextSize;
  textAlign?: TextAlign;
  truncateButtonColor?: string;
  fontFamily: string;
}

export interface TextWidgetProps extends WidgetProps, TextStyles {
  text?: string;
  isLoading: boolean;
  disableLink: boolean;
  widgetId: string;
  containerStyle?: ContainerStyle;
  children?: ReactNode;
  borderColor?: Color;
  borderWidth?: number;
  overflow: OverflowTypes;
}

export default TextWidget;
