import React, { useMemo } from "react";
import type { WidgetProps } from "widgets/BaseWidget";
import { FixedLayoutViewerWidgetOnion } from "./FixedLayoutViewerWidgetOnion";
import { FixedLayoutViewerModalOnion } from "./FixedLayoutViewerModalOnion";
import { FixedLayoutViewerTaroOnion } from "./FixedLayoutViewerTaroOnion";

/**
 * FixedLayoutViewerWrapper
 *
 * Component that wraps a BaseWidget implementation of a widget with viewer(Deployed Application Viewer) specific layers of Fixed Layout System.
 * check out FixedLayoutViewerWidgetOnion and FixedLayoutViewerModalOnion to further understand what they implement under the hood.
 *
 * @param props
 * @returns Enhanced BaseWidget with Viewer specific Layers.
 */

export const FixedLayoutViewerWrapper = (props: WidgetProps) => {
  /**
   * @constant WidgetOnion
   *
   * Widget Onion here refers to the Layers surrounding a widget just like layers in an onion.
   */
  const IS_TARO_WIDGET = ["TARO_LOADING_WIDGET", "TARO_BOTTOM_BAR_WIDGET", "TARO_POPUP_WIDGET"].includes(props?.type);
  const WidgetOnion = useMemo(() => {
    return IS_TARO_WIDGET ? FixedLayoutViewerTaroOnion : props.type === "MODAL_WIDGET"
      ? FixedLayoutViewerModalOnion
      : FixedLayoutViewerWidgetOnion;
  }, [props.type]);
  return <WidgetOnion {...props}>{props.children}</WidgetOnion>;
};
