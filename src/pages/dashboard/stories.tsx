import { useState, type ReactElement, useEffect } from 'react'

import type { NextPageWithLayout } from '../_app'
import DashboardLayout from '@/components/dashboard/Layout'
import StoryPage from '@/components/dashboard/stories/StoryPage'
import { fetchUserStores } from '@/apiCalls/auth'
import { BACKEND_URL } from '@/constants'
import axios from 'axios'
 
const Page: NextPageWithLayout = () => {
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetchUserStores(user?.uid)
      .then((stores) => {
        if(Array.isArray(stores)) {
        console.log({stores})
        Promise.all(stores?.map((store) => {
          const apiUrl = `${BACKEND_URL}/firebase/analytics/${user?.uid}/${store?.id}`;
          return axios.get(apiUrl);
        }))
        .then((response) => {
            const newStories = response?.map((res) => res?.data?.data?.stories).flat();
            const filteredStories = newStories.filter((story) => story);
            setStories(filteredStories);
        })
      }
      })
      .catch((err) => {
        console.error(err);
      });
  },[])
  return (
    <div className='md:py-4 md:px-10'>
      <StoryPage stories={stories}/>
    </div>
  )
}
 
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}
 
export default Page