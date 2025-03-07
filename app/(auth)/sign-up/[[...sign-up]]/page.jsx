import { SignUp } from '@clerk/nextjs'
import Image from 'next/image';
export default function Page() {
  return (
     <div className=" mx-auto flex flex-row h-screen w-[1000px]  justify-center items-center gap-9">
            <div className="w-[40%] h-full flex flex-col justify-center items-center">
            <h1 className="text-4xl text-gray-900 font-medium mb-6">
              Welcome to MoneyMate
            </h1>
            <SignUp />   
          </div>
          <div className="w-[60%] p-6 border-2 relative h-full mt-4 ">
            <Image
              src={'/sign_pic.png'}
              alt="dashboard"
              width={1000}
              height={800}
              className=" h-[100%] w-auto  object-cover "
            />
          </div>
          </div>
   );
}