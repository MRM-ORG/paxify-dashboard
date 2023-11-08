import { InfoOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Button, Card, Switch } from 'antd'
import { NextPage } from 'next'
import React from 'react'
const { Meta } = Card

type Props = {
    stories: any
}
const Story = ({ img, text }: { img: string; text: string }) => {
    return (
        <div className="flex flex-col mt-3 items-center space-y-2 hover:scale-110 cursor-pointer ease-in transition">
            <div className="relative rounded-full overflow-hidden w-16 h-16">
                <div className="absolute inset-0 border-2 border-[#bdbdca] rounded-full"></div>
                <div className="absolute inset-1 rounded-full bg-white">
                    <img
                        style={{borderRadius:"50%"}}
                        src={img}
                        alt={text}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <p className="text-sm text-center font-medium">{text}</p>
        </div>
    );
};

const Stories: NextPage<Props> = ({ stories }) => {
    return (
        <div className='flex relative justify-center sm:justify-between items-center flex-wrap mt-20'>
            {
                Array.from(stories).map((_: any, index) => (
                    <Card
                        key={index}
                        style={{ width: 300, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "20px" }}
                        actions={[<div key={"hi"} className='flex w-[250px] justify-end'><div><InfoCircleOutlined /> </div><p className='ml-2'>Audiences</p></div>]}
                        cover={<Story text={_?.id} img={_.player[0]?.content?.source} />}
                        title=""
                        extra={<div className='flex justify-end w-[250px]'><Button className=" bg-white" size='small' icon={<InfoOutlined />} type='default' /></div>}
                        bordered={false}
                    >
                        <Meta
                            title={<Switch className='' defaultChecked />}
                            description={<div className="h-8 w-4 rounded-sm bg-black mx-auto"></div>}
                        />
                    </Card>
                ))
            }
        </div>
    )
}

export default Stories