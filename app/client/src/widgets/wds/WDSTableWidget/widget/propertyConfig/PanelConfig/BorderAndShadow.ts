import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "widgets/TableWidgetV2/constants";
import {
  hideByColumnType,
  removeBoxShadowColorProp,
} from "../../propertyUtils";
import { ColumnTypes } from "widgets/wds/WDSTableWidget/constants";

export default {
  sectionName: "Border and shadow",
  children: [
    {
      propertyName: "borderRadius",
      label: "Border radius",
      customJSControl: "TABLE_COMPUTE_VALUE",
      isJSConvertible: true,
      helpText: "Rounds the corners of the icon button's outer border edge",
      controlType: "BORDER_RADIUS_OPTIONS",
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [
          ColumnTypes.ICON_BUTTON,
          ColumnTypes.MENU_BUTTON,
          ColumnTypes.BUTTON,
        ]);
      },
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
        },
      },
    },
    {
      propertyName: "boxShadow",
      label: "Box shadow",
      helpText:
        "Enables you to cast a drop shadow from the frame of the widget",
      controlType: "BOX_SHADOW_OPTIONS",
      customJSControl: "TABLE_COMPUTE_VALUE",
      isJSConvertible: true,
      updateHook: removeBoxShadowColorProp,
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [
          ColumnTypes.ICON_BUTTON,
          ColumnTypes.MENU_BUTTON,
          ColumnTypes.BUTTON,
        ]);
      },
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
        },
      },
    },
  ],
};
