import "../styles/index.scss";
import { AppProps } from "next/app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps }: AppProps) {
  console.log("test");
  return (
    <>
      <ToastContainer />
      {/* TODO: Implement toast in this way for API requests */}

      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
