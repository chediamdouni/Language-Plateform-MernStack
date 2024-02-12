import * as React from "react";
import FooterWithLogo from "../components/footer";
import Header from "../components/header";
interface Props {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Header />
      <div className="d-flex" id="wrapper">
        <div id="page-content-wrapper">{props.children}</div>
      </div>
      <FooterWithLogo />
    </>
  );
};
export default DashboardLayout;
