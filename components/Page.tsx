import React, { ReactElement } from "react"
import Router from "next/router"
import NProgress from "nprogress";

import PageTitle from "./PageTitle"
import Nav from "./nav"

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Page = ({ children }): ReactElement => (
  <div className="py-4">
    <PageTitle title="resause.space" />
    <div className="container mx-auto px-4 pb-8">
      <Nav />
      { children }
    </div>
  </div>
)

export default Page
