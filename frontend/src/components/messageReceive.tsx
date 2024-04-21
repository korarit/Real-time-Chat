
import UserIcon from "../assets/img/user.svg";

interface MessageSendProps {
  username: string;
  message: string;
}

function MessageReceiveCompunent(props: MessageSendProps) {
  return (
    <div className="flex w-full">
      <img alt="" className="h-12 w-12 sm:h-14 sm:w-14 min-[840px]:h-[76px] min-[840px]:w-[76px] xl:w-[64px] xl:h-[64px]" src={UserIcon} />
      <div className=" ml-2 flex flex-col w-[68%]">
        <p className="text-[20px] sm:text-[24px] min-[840px]:text-[28px] xl:text-[24px] font-mitr font-semibold mb-1">{props.username}</p>
        <div className="rounded-b-lg rounded-lb-lg min-[840px]:rounded-b-xl min-[840px]:rounded-r-xl  w-full p-2 min-h-[44px] sm:min-h-[56px] min-[840px]:min-h-[64px] bg-[#FCFCFC] border border-black drop-shadow-md shadow-black/50">
          <p className="text-black text-left break-words h-auto w-full font-mitr font-normal text-[20px]">{props.message}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageReceiveCompunent;