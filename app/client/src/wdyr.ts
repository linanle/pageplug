/* eslint-disable @typescript-eslint/no-var-requires */
/// <reference types="@welldone-software/why-did-you-render" />
// ^ https://github.com/welldone-software/why-did-you-render/issues/161
import React from "react";

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: false,
    trackExtraHooks: [[require("react-redux/lib"), "useSelector"]],
  });
}
export default "";
