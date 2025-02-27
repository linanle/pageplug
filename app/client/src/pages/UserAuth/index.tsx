import React from "react";
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import Login from "pages/UserAuth/Login";
import SignUp from "pages/UserAuth/SignUp";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import PageNotFound from "pages/common/ErrorPages/PageNotFound";
import * as Sentry from "@sentry/react";
import { requiresUnauth } from "./requiresAuthHOC";
import { useSelector } from "react-redux";
import { getThemeDetails, ThemeMode } from "selectors/themeSelectors";
import type { AppState } from "@appsmith/reducers";
import { ThemeProvider } from "styled-components";
import VerificationPending from "./VerificationPending";
import VerifyUser from "./VerifyUser";
import VerificationError from "./VerificationError";

const SentryRoute = Sentry.withSentryRouting(Route);

export function UserAuth() {
  const { path } = useRouteMatch();
  const location = useLocation();
  const lightTheme = useSelector((state: AppState) =>
    getThemeDetails(state, ThemeMode.LIGHT),
  );

  return (
    <ThemeProvider theme={lightTheme}>
      {/* TODO: (Albin) - chnages this to ads-v2 variable once  branding is sorted out. */}
      <div className="absolute inset-0 flex flex-col overflow-y-auto auth-container bg-[color:var(--ads-color-background-secondary)] p-4 t--auth-container login-page-bg">
        <Switch location={location}>
          <SentryRoute component={Login} exact path={`${path}/login`} />
          <SentryRoute component={SignUp} exact path={`${path}/signup`} />
          <SentryRoute
            component={ResetPassword}
            exact
            path={`${path}/resetPassword`}
          />
          <SentryRoute
            component={ForgotPassword}
            exact
            path={`${path}/forgotPassword`}
          />
          <SentryRoute
            component={VerificationPending}
            exact
            path={`${path}/verificationPending`}
          />
          <SentryRoute component={VerifyUser} exact path={`${path}/verify`} />
          <SentryRoute
            component={VerificationError}
            exact
            path={`${path}/verify-error`}
          />
          <SentryRoute component={PageNotFound} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default requiresUnauth(UserAuth);
