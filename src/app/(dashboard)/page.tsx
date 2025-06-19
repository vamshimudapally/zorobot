import React from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { HomeView } from '@/modules/home/ui/views/home-view'

const session = await auth.api.getSession({
    headers: await headers(),
});

const Page = async () => {

    if(!session){
        redirect("/sign-in");
    }
  return <HomeView/>
  
};

export default Page
