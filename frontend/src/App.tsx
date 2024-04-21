import { useState } from "react"


import RegisterPage from "./pages/register"
import ChatPage from "./pages/chat"

function App() {

  const [registerStatus, setRegisterStatus] = useState<boolean>(false); // สร้าง state สำหรับเก็บข้อความที่ได้รับ

  // ส่วนสำหรับสมัครสมาชิก
  const Register = (username: string) => {
    if (username.trim() === '') return;

    localStorage.setItem('username', username);
    setRegisterStatus(true);
  }

  // ส่วนสำหรับออกจากระบบ
  const Logout = () => {
    localStorage.removeItem('username');
    setRegisterStatus(false);
  }

  return (
    <>
      <div className=" xl:w-[34dvw] 2xl:w-[30dvw] h-dvh mx-auto bg-[#F6F6F6]">
        {registerStatus ? <ChatPage setLogout={Logout} /> : <RegisterPage setRegister={Register} />}
      </div>
    </>
  )
}

export default App
