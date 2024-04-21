import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import * as openpgp from 'openpgp';

//import component
import MessageReceiveCompunent from '../components/messageReceive';
import MessageSendCompunent from '../components/messageSend';

//import icon
import ExitIcon from '../assets/img/exit-icon.svg';
//import StickerIcon from '../assets/img/sticker-icon.svg';
import SendIcon from '../assets/img/send-icon.svg';

interface Message {
    username: string;
    message: string;
}


// สร้าง socket สำหรับเชื่อมต่อกับ server
const socket = io('http://localhost:3000');

function ChatPage(props: {setLogout: () => void}){

    const [messages, setMessages] = useState<Message[]>([]); // สร้าง state สำหรับเก็บข้อความที่ได้รับ
    const [messageText, setMessageText] = useState<string>(''); // สร้าง state สำหรับเก็บข้อความที่พิมพ์ 

    // ส่วนสำหรับส่งข้อความ
    const sendMessage = async () => {

        // ถ้าไม่มีข้อความ ให้ return ออกไป
        if (messageText.trim() === '') return;

        const getUsername: string | null = localStorage.getItem('username');

        // encrypt message
        const object = JSON.stringify({ username: getUsername, message: messageText });
        const message = await openpgp.createMessage({ text: object });
        const encryptMessage = await openpgp.encrypt({
            message,
            passwords: ['fJ/hTAM79].iQ<`dFTrvDF#kNT`#,^9il{k3W70@qIZj=_tf~'],
            format: 'armored' // ข้อความที่ถูก encrypt จะถูกเก็บในรูปแบบข้อความที่มี header และ footer
        });

        // ส่งข้อความไปที่ server
        socket.emit('sendMessage', encryptMessage);
        setMessageText('');
    }

    useEffect(() => {
        // ส่วนสำหรับรับข้อความ ที่ส่งมาจาก server
        socket.on('message', async (message: Message) => {

            // decrypt message
            const decryptMessage = async () => {
                const object = await openpgp.readMessage({ armoredMessage: message });
                const decrypt = await openpgp.decrypt({
                    message: object,
                    passwords: ['fJ/hTAM79].iQ<`dFTrvDF#kNT`#,^9il{k3W70@qIZj=_tf~'],
                    format: 'utf8'
                });

                return JSON.parse(decrypt.data.toString());
            }

            // แยกข้อความ และ username แล้วเก็บไว้ใน state
            const getMSG = await decryptMessage();
            setMessages([...messages, getMSG]);
        });
    }, [messages]);

    return (
        <div className="w-full h-full">

            {/* ส่วน navbar สำหรับ  chat room*/}
            <div className="w-full h-[7%] bg-[#FCFCFC] shadow-md shadow-black/30">
                <div className="w-[90%] h-full mx-auto flex justify-between items-center">
                    <p className="text-[24px] sm:text-[28px] min-[840px]:text-[36px] lg:text-[32px] 2xl:text-[28px] text-[#252527] font-mitr font-medium">
                        name of room
                    </p>

                    <button onClick={props.setLogout} title='exit' type="button" className='w-fit h-fit'>
                        <img alt="" className="sm:h-10 sm:w-10 lg:h-12 lg:w-12 xl:h-7 xl:w-7 2xl:h-8 2xl:w-8 "  src={ExitIcon} />
                    </button>
                    
                </div>
            </div>

            {/* ส่วนแสดงข้อความ การพูดคุย */}
            <div className='h-[84%] overflow-y-auto w-full pt-6 pb-2'>

                <div className='w-[90%] h-auto mx-auto flex flex-col space-y-6'>
                    {
                        messages.map((message, index) => {
                            if (message.username === localStorage.getItem('username')) {
                                return <MessageSendCompunent key={index} username={message.username} message={message.message} />
                            } else {
                                return <MessageReceiveCompunent key={index} username={message.username} message={message.message} />
                            }
                        })
                    }
                </div>

            </div>

            {/* ส่วนสำหรับพิมพ์ข้อความ และส่งข้อความ */}
            <div className='w-full h-[9%] bg-[#FCFCFC] shadow-[0px_-3px_4px_0px_#0000003b] shadow-black/30'>

                <div className='w-[90%] h-full mx-auto flex items-center justify-around'>

                    {/*
                    <button title='sticker' className='h-fit w-fit flex items-center justify-center'>
                        <img alt="" className="h-9 w-9 sm:h-14 sm:w-14 min-[840px]:w-16 min-[840px]:h-16  2xl:h-11 2xl:w-11"  src={StickerIcon} />
                    </button>
                    */}

                    <input 
                        type="text" 
                        className="w-[70%] sm:w-[76%] h-[44px] sm:h-[64px] min-[840px]:h-[76px] xl:h-[52px] border-2 border-[#252527] bg-[#F6F6F6] shadow-inner shadow-black/20 rounded-[16px] text-[20px] p-3 font-mitr  placeholder:text-[20px] placeholder:font-mitr placeholder:font-medium placeholder:text-[#969696]" 
                        placeholder="ข้อความ"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                    />

                    <button title='send' onClick={sendMessage} className='h-fit w-fit flex items-center justify-center'>
                        <img alt="" className="h-9 w-9 sm:h-14 sm:w-14 min-[840px]:h-16 min-[840px]:w-16 2xl:h-11 2xl:w-11"  src={SendIcon} />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ChatPage;