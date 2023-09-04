import { ThreeDots } from "react-loader-spinner";

function Loading() {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#000000"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
}

export default Loading
