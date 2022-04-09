import "../styles/index.scss";
import { AppProps } from "next/app";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header/Header";
import { AuthContextProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  console.log("test");
  return (
    <AuthContextProvider>
      <ToastContainer />
      {/* TODO: Implement toast in this way for API requests */}
      {/* <button onClick={ () => toast.success("Success")}>Success!</button>
      <button onClick={ () => toast.error("Error!")}>Error!</button> */}
      <Header />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
export default MyApp;
