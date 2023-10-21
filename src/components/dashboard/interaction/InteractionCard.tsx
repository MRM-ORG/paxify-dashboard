import React from 'react'

const InteractionCard = () => {
    return (
        <div className='flex relative justify-center sm:justify-between items-center flex-wrap mt-20'>

           {
            Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className='w-[296px] flex flex-col mt-20 justify-between items-center h-[526px] relative' style={{ background: "url(https://s3-alpha-sig.figma.com/img/f4a4/afb0/2f21db6a7211ded80e5820be2b825032?Expires=1694995200&Signature=asjCg1VxbTBja7gF6GJwc1EdF06Qm4sHqaj537Gx47aaE~z6vP0ZJyWdPstAdr16eO37LWLf2zUYi7IKFWkhG8lDLi3sgenXJH8UOzzjdwbImnhAKWA5sN3SbCBimtWvje6SA~fYX5d1P7txacQnjGl4AefaHMRc63NaqSWMKCtCc9B6ZWyBxwnywpyBBA4AmeLmvMjGSSf48GmIKCs2Mj8hVpQbI5wIdYo1faSpHvEGbBu8JWDgdGiGe1KUELHlD5NaypwnhGx7S9tq11--LC6Ly5QOTGLeted7Hfjuu88uliALE9oZcDr3Uvk1-TJ9hGmCySsNIGZ8wMpHEZntLg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4), lightgray 0px 0px / 100% 100% no-repeat", backgroundSize: "cover" }}>


                <div className="flex mt-1 self-start ml-2 w-[40px] rounded-[8px] bg-[#fff] border border-[#e9e9ed] p-[8px] justify-center items-center">
                    <div className='w-[16px] h-[16px] rounded-[11px] bg-[#01ea85]'></div>
                </div>

                {/* Card Body */}

                <div className='w-[278px]   p-4 mb-2 h-[360px] rounded-[15px] bg-[#fff]' style={{ boxShadow: "4px 4px 20px 0px rgba(36, 36, 80, 0.10)" }}>

                    <div className='flex justify-between items-center'>
                        <h1 className='font-bold'>Poll</h1>
                        <div className='space-x-4 flex items-centers'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M0.666656 8.49999C0.666656 8.49999 3.33332 3.16666 7.99999 3.16666C12.6667 3.16666 15.3333 8.49999 15.3333 8.49999C15.3333 8.49999 12.6667 13.8333 7.99999 13.8333C3.33332 13.8333 0.666656 8.49999 0.666656 8.49999Z" stroke="#666685" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8 10.5C9.10457 10.5 10 9.60457 10 8.5C10 7.39543 9.10457 6.5 8 6.5C6.89543 6.5 6 7.39543 6 8.5C6 9.60457 6.89543 10.5 8 10.5Z" stroke="#666685" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#666685" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M4.66666 6.66666L7.99999 9.99999L11.3333 6.66666" stroke="#666685" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8 10V2" stroke="#666685" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            </svg></div>
                    </div>

                    <div className='flex mt-3 items-center space-x-3'>
                    <div style={{ background: "url(https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg), lightgray 0px 0px / 100% 100% no-repeat", backgroundSize:"cover" }} className='h-[30px] w-[40px]  border border-red-300  rounded-full'></div>
                    <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className='font-medium'>Sweet Chili-Peanut Sauce Chicken Thighs </p>
                    </div>
                    <div className='border-b mt-4'></div>
                    <h1 className='text-center mt-3 text-xs font-medium'>Would you try this?</h1>
                    <div className='flex justify-center space-x-2 mt-2'>
                       <div className='flex flex-col items-center space-y-2'>
                           <p>1</p>
                            <div style={{height:"90px",width:"32px",borderRadius:"8px 8px 0px 0px",background:"#7a4bff"}}>

                            </div>
                           <p>👍</p>
                       </div>
                       <div className='flex flex-col items-center justify-end space-y-2'>
                           <p>0</p>
                            <div style={{height:"0px",width:"0px",borderRadius:"8px 8px 0px 0px",background:"#7a4bff"}}>

                            </div>
                           <p>👎</p>
                       </div>
                    </div>
                    <div className='flex justify-between mt-4'>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className='font-extrabold'>1</h1>
                            <p className='font-medium'>Impression</p>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className='font-extrabold'>1</h1>
                            <p className='font-medium'>responses</p>
                        </div>
                        <div style={{padding:"6px 12px 6px 12px"}} className='flex flex-col bg-[#e6fcfd] rounded-[12px] justify-center items-center'>
                            <h1 className='font-extrabold'>100%</h1>
                            <p className='font-medium'>response</p>
                        </div>
                    </div>
                </div>

            
            </div>
            ))
           }


        </div>
    )
}

export default InteractionCard