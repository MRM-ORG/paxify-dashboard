import dynamic from 'next/dynamic';
import DashboardLayout from '@/components/dashboard/Layout'

const StudioCreator = dynamic(() => import('@/components/dashboard/studio/StudioCreator'), {
  ssr: false,
});
import React, { ReactElement } from 'react'

const studio_creator = () => {
  return (
    <StudioCreator />
  )
}

studio_creator.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default studio_creator