import React, { ReactElement } from "react";
import Link from "next/link";

const PageTitle = ({ title }: any): ReactElement => (
  <h1 className="text-center">
    <Link href="/" prefetch>
      <a className="text-4xl font-medium">{title}</a>
    </Link>
  </h1>
)

export default PageTitle
