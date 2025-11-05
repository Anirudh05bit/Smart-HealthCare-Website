import React from "react";

function Layout({ children }) {
  return (
    <div className="layout">
      <main className="content">{children}</main>
    </div>
  );
}

export default Layout;
