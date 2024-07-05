import Form from "@/components/Form";
import ViewAttendance from "@/components/ViewAttendance";
import Image from "next/image";
import logo from "../public/logo.png";

export default function Home() {
  return (
    <div className="container">
      <Image src={logo} alt="sig phi logo" width={175} />
      <Form />
      <ViewAttendance />
    </div>
  );
}
