
import React from 'react'

const StoryCards = () => {
    return (
        <>
            {
                Array.from({ length: 20 }).map((_, index) => (
                    <div style={{ flex: '0 0 auto' }} key={index} className='py-[19px]  mt-5 mx-5 px-[1px] w-[200px] rounded-lg shadow-lg border'>
                        <div className="flex flex-col mt-3 items-center space-y-2 cursor-pointer ease-in transition">
                            <div className="relative rounded-full overflow-hidden w-14 h-14">
                                <div className="absolute inset-0 border-2 border-[#bdbdca] rounded-full"></div>
                                <div className="absolute inset-1 rounded-full bg-white">
                                    <img
                                        style={{ borderRadius: "50%" }}
                                        src={"https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"}
                                        alt={"img"}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <p className="text-sm w-[130px] text-center font-medium whitespace-normal">Beef Empandas with chimkhum sauce</p>
                        </div>
                        <div className='flex mt-3 justify-around items-center'>
                            <h1 className='font-medium'>Impression</h1>
                            <p className='font-bold'>18</p>
                        </div>

                    </div>
                ))
            }
        </>
    )
}

export default StoryCards