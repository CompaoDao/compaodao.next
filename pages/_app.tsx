import '../styles/index.scss';
import { AppProps } from "next/app";
import { ToastContainer, toast } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      {/* TODO: Implement toast in this way for API requests */}
      {/* <button onClick={ () => toast.success("Success")}>Success!</button>
      <button onClick={ () => toast.error("Error!")}>Error!</button> */}

      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
