import React, { useRef } from 'react'
import { Select } from "antd";
import StoryCards from './StoryCards';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const StoryGroup = () => {

    const scrollContainerRef = useRef<any>(null);
    const scrollToLeft = () => {
        if (scrollContainerRef.current) {
          const scrollAmount = 100;
          const currentScroll = scrollContainerRef.current.scrollLeft;
          scrollContainerRef.current.scrollTo({
            left: currentScroll - scrollAmount,
            behavior: 'smooth',
          });
        }
      };

      const scrollToRight = () => {
        if (scrollContainerRef.current) {
          const scrollAmount = 100;
          const currentScroll = scrollContainerRef.current.scrollLeft;
          scrollContainerRef.current.scrollTo({
            left: currentScroll + scrollAmount,
            behavior: 'smooth',
          });
        }
      };

    return (
        <div>
            <div className='mt-10 relative bg-white rounded-lg py-4 md:px-5'>
                <div className='flex md:flex-row flex-col justify-center md:justify-between items-center flex-wrap'>
                    <h1 className='font-bold text-lg'>Story Groups</h1>
                    <div className='space-x-2'>
                        <Select className='md:w-auto w-[140px]' defaultValue={"Your stories"} />
                        <Select className='md:w-auto w-[140px]' defaultValue={"Impressioin"} />
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className='overflow-hidden  flex flex-nowrap items-center transition-all'
                    style={{ marginLeft: '0', marginRight: '0' }}
                >
                    <StoryCards />
                </div>
                    <div className='bg-white left-4  md:left-5 absolute bottom-20 transform -translate-y-1/2 rounded-full text-black border py-2 px-3 cursor-pointer'>
                        <LeftOutlined onClick={scrollToLeft} className='text-xl' />
                    </div>
                    <div className='bg-white right-4  md:right-5 absolute bottom-20 transform -translate-y-1/2 rounded-full text-black border py-2 px-3 cursor-pointer'>
                        <RightOutlined onClick={scrollToRight} className='text-xl' />
                    </div>
            </div>
        </div>
    )
}

export default StoryGroup