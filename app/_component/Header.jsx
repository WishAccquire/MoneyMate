"use client";
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import {useUser, UserButton } from '@clerk/nextjs';
function header() {
    const {user,isSignedIn}=useUser();
  return (
    <div>
    <div className='p-4 flex justify-between items-center border shadow-sm'>
        <Image src={'/logo.jpeg'}
        alt='logo'
        width={50}
        height={40}
        className="object-contain"/>
    <h1 className="text-3xl font-medium text-gray-900 text-center">Know Where Your Money Goes</h1>
    {isSignedIn?
    <UserButton/>:
    <Link href={'/sign-in'}>
    <Button>Get Started</Button>
    </Link>
}
    </div>
    </div>
  )
}

export default header