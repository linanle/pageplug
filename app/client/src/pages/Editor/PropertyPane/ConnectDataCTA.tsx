import React, { useCallback } from "react";
import { Button, Text } from "design-system";
import type { AppState } from "@appsmith/reducers";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { INTEGRATION_EDITOR_MODES, INTEGRATION_TABS } from "constants/routes";
import history from "utils/history";
import {
  setGlobalSearchQuery,
  toggleShowGlobalSearchModal,
} from "actions/globalSearchActions";
import AnalyticsUtil from "utils/AnalyticsUtil";
import type { WidgetType } from "constants/WidgetConstants";
import { integrationEditorURL } from "@appsmith/RouteBuilder";
import { getCurrentPageId } from "selectors/editorSelectors";
import { DocsLink, openDoc } from "../../../constants/DocumentationLinks";
import { DatasourceCreateEntryPoints } from "constants/Datasource";

const Container = styled.div`
  height: 75px;
  padding: var(--ads-v2-spaces-3) var(--ads-v2-spaces-3);
  margin: var(--ads-v2-spaces-2) var(--ads-v2-spaces-4);
  display: flex;
  flex-direction: column;
  gap: var(--ads-v2-spaces-3);
  background-color: var(--ads-v2-color-bg-subtle);
  border-radius: var(--ads-v2-border-radius);
`;

export const actionsExist = (state: AppState): boolean =>
  !!state.entities.actions.length;

interface ConnectDataCTAProps {
  widgetTitle: string;
  widgetId?: string;
  widgetType?: WidgetType;
}

function ConnectDataCTA(props: ConnectDataCTAProps) {
  const dispatch = useDispatch();
  const pageId: string = useSelector(getCurrentPageId);
  const openHelpModal = useCallback(() => {
    dispatch(setGlobalSearchQuery("Connecting to Data Sources"));
    dispatch(toggleShowGlobalSearchModal());
    AnalyticsUtil.logEvent("OPEN_OMNIBAR", {
      source: "PROPERTY_PANE_CONNECT_DATA",
    });
  }, []);

  const onClick = () => {
    const { widgetId, widgetTitle, widgetType } = props;
    history.push(
      integrationEditorURL({
        pageId,
        selectedTab: INTEGRATION_TABS.NEW,
        params: { mode: INTEGRATION_EDITOR_MODES.AUTO },
      }),
    );
    AnalyticsUtil.logEvent("CONNECT_DATA_CLICK", {
      widgetTitle,
      widgetId,
      widgetType,
    });

    // Event for datasource creation click
    const entryPoint = DatasourceCreateEntryPoints.PROPERTY_PANE_CONNECT_DATA;
    AnalyticsUtil.logEvent("NAVIGATE_TO_CREATE_NEW_DATASOURCE_PAGE", {
      entryPoint,
    });
  };

  return (
    <Container className="flex flex-col t--propertypane-connect-cta">
      <Text kind="heading-xs">数据缺失</Text>
      <div className="flex gap-3">
        <Button onClick={onClick} tabIndex={0}>
          绑定数据
        </Button>
        <Button
          kind="secondary"
          onClick={() => openDoc(DocsLink.CONNECT_DATA)}
          tabIndex={0}
        >
          了解更多
        </Button>
      </div>
    </Container>
  );
}

export default React.memo(ConnectDataCTA);
