
import { CaretUpOutlined } from '@ant-design/icons'
import React from 'react'

const StoryCards = () => {
    return (
        <>
            {
                Array.from({ length: 20 }).map((_, index) => (
                    <div style={{ flex: '0 0 auto', borderRadius: '16px 16px 0 0' }} key={index} className='pb-[19px] mt-5 mx-5 px-[1px] w-[200px] border'>
                        <div className="flex flex-col items-center space-y-2 cursor-pointer ease-in transition">
                            <img
                              style={{ borderRadius: "16px 16px 0 0" }}
                              src={"https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"}
                              alt={"img"}
                              className="w-full h-[166px] object-cover"
                            />
                            <p className="text-sm w-[170px] text-start font-bold whitespace-normal">Beef Empandas with chimkhum sauce</p>
                        </div>
                        <div className='flex mt-3 justify-between items-center ml-3 mr-3'>
                            <h1 className='font-medium'>Impression</h1>
                            {/* <p className='font-bold'>18</p> */}
                            <div style={{backgroundColor: 'rgba(1, 234, 133, 0.10)',padding: '5px 8px 4.5px 8px', borderRadius: '100px'}}>
                              <CaretUpOutlined size={2} style={{ color: "#01EA85" }} /> 18%
                            </div>
                        </div>

                    </div>
                ))
            }
        </>
    )
}

export default StoryCards