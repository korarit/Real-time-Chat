import { useState } from 'react';

import User_icon from '../assets/img/user.svg';
import Username_input_icon from '../assets/img/input-username.svg';
import AddUser_icon from '../assets/img/add-user-icon.svg';


function RegisterPage (props:{setRegister: (username: string) => void}){

    const [username, setUsername] = useState<string>('');

    return (
        <div className="w-full h-full">
            <div className='h-fit pt-[30%]'>

                <p className="text-center text-[36px] lg:text-[40px] 2xl:text-[48px] font-mitr font-semibold">
                Chat System
                </p>
                <div className='mx-auto w-fit h-fit my-9 rounded-full'>
                    <img alt="" className=""  src={User_icon} />
                </div>


                {/* ส่วนสำหรับกรอกชื่อผู้ใช้งาน */}
                <div className="relative mx-auto w-[90%]"> 
                <input  type="text" 
                        className={`w-full h-[50px] my-4 border-2 border-[#252527] rounded-[8px] ${username.trim() === '' ? '' : ''} text-[24px] text-center font-mitr font-medium placeholder:text-[24px] placeholder:font-mitr placeholder:font-medium placeholder:text-[#969696]`} placeholder="ชื่อผู้ใช้งาน" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                />
                    {username.trim() === '' ? (
                        <div className="absolute inset-y-0 left-0 pl-[26%] lg:pl-[28%] 2xl:pl-[33%] flex items-center pointer-events-none"> 
                        <img alt="" className=""  src={Username_input_icon} />
                    </div> 
                    ) : null
                    }
                </div>

                {/* ส่วนสำหรับสมัครสมาชิก */}
                <button onClick={() => props.setRegister(username)} className='mx-auto w-[90%] border-2 border-[#00761A] h-[50px] rounded-[8px] bg-[#1DCE59] hover:bg-[#49a668] flex items-center justify-center'>
                    <div className='w-fit h-fit flex space-x-2 items-center'>
                        <img alt="" className="h-7 w-7"  src={AddUser_icon} />
                        <p className="text-[24px] text-white font-mitr font-semibold ">
                            สมัคร
                        </p>
                    </div>
                </button> 

            </div>
            
            
        </div>
    )
}

export default RegisterPage;