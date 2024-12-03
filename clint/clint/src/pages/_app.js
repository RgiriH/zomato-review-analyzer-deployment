import "@/styles/globals.css";
import Store from "@/Store";

export default function App({ Component, pageProps }) {
  return (
      <Store>
       <Component {...pageProps} />
      </Store>
  );
  
  
}
