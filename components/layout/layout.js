import Header from "./header";
function Layout(props) {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
}
export default Layout;
