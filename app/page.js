import Form from "@/components/Form";
import Head from "next/head";
import Image from "next/image";
import logo from "../public/logo.png";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Sigma Phi Delta Chapter Attendance</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Image src={logo} alt="sig phi logo" width={250} />
      <Form />
    </div>
  );
}
