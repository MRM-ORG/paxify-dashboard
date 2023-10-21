
import React, { useEffect, useState } from 'react'
import { createStore } from 'polotno/model/store'
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
// import { ref } from 'firebase/database';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';
import { firebase } from '@/firebase/firebase';
import { Input, Modal, Select } from 'antd';
import axios from 'axios';
import { BACKEND_URL } from '@/constants';
import { fetchUserStores } from '@/apiCalls/auth';

const { Option } = Select;

const StudioCreator = () => {

  const store = createStore();
  store.openSidePanel('resize');
  const page = store.addPage();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [stores, setStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storeId, setStoreId] = useState(null);
  const [user, setUser] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user?.uid);
    fetchUserStores(user.uid)
      .then((stores) => {
        if(Array.isArray(stores)) {
        setStores(stores);
      }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  },[])

  console.log({stores})

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async() => {
    setConfirmLoading(true);
    const base64Data = image?.split(',')[1];

            const storage = getStorage(firebase);
            const storageRef = ref(storage, `images/${Date.now()}.png`);

            // Upload the base64 data to Firebase Storage
            const uploadTask = uploadString(storageRef, base64Data, 'base64', { contentType: 'image/png' });

            // Get the download URL once the upload is complete
            try {
                await uploadTask;
                const downloadURL = await getDownloadURL(storageRef);
                // setImage(downloadURL)
                console.log('Image download URL:', downloadURL);
                const story = {
                    story: {
                    id: "story-1",
                    status: true,
    container: {
      border: {
        color: "#e1306c",
        width: 3,
      },
      background: {
        src: "https://picsum.photos/150/250",
      },
      author: {
        src: "https://picsum.photos/210/210",
      },
      isViewed: false,
    },
    player: [
      {
        id: 1,
        content: {
          width: 1080,
          height: 1920,
          source: downloadURL,
          timeout: 5000,
          type: "image",
        },
        enhancements: {
          audio: {
            src: "https://cdn.shopify.com/s/files/1/0762/0499/8931/files/mixkit-game-show-suspense-waiting-667.wav?v=1689275490",
          },
        },
        layout: {
          design: 1,
          isLiked: true,
          likeButton: true,
          author: "https://picsum.photos/105/105",
          title: title,
          description: "by Huma",
          cta: {
            text: "SHOP NOW",
            link: "https://google.com",
            backgroundColor: "#2ecc71",
          },
        },
      },
    ]
},
user: { uid: user, storeId: storeId}
    }
                axios.post(`${BACKEND_URL}/firebase/story`, story)
                .then(() => {
                    setConfirmLoading(false);
                    setTitle('');
                    setOpen(false);
                })
                // showModal();
            // Now you have the download URL, and you can use it as needed.
            } catch (error) {
                setConfirmLoading(false);
                setTitle('');
                console.error('Error:', error);
            }
    // setTimeout(() => {
    // setOpen(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
    
    // oF6JKF61Mn0YheV7WpZM

    const saveImage = (e: any) => {
        e.preventDefault();
        const img = store.toDataURL({ ignoreBackground: true})
        .then(async(res) => {
            setImage(res);
            showModal();
        })
        console.log({img})
        console.log(' src ',store.toJSON())
        // store.saveAsImage({ fileName: 'polotno.png' });
      }

    return (
        <>
        <div className='w-screen h-screen bp4-dark ' style={{width: '80%'}}>
            <PolotnoContainer style={{ width: '85vw', height: '100vh' }}>
                <SidePanelWrap>
                    <SidePanel store={store} />
                </SidePanelWrap>
                <WorkspaceWrap>
                    <Toolbar store={store} downloadButtonEnabled />
                    <Workspace bleedColor='red' backgroundColor='#040408' store={store} />
                    <ZoomButtons store={store} />
                </WorkspaceWrap>
            </PolotnoContainer>
        </div>
        <button style={{width: '100px', height: '30px', borderRadius: '5px', marginTop: '10px', background: '#4F46E4', color: 'white'}} onClick={saveImage}>Save</button>
        <Modal
            title="Your Story"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            {/* <input placeholder='Write something' style={{border: 'none'}} value={title} onChange={(e) => setTitle(e.target.value)}/> */}
            <Select
        style={{ width: '100%', marginBottom: '16px' }}
        placeholder="Select Store"
        value={storeId}
        onChange={(value) => setStoreId(value)}
      >
        {stores?.map((option) => (
          <Option key={option?.id} value={option?.id}>
            {option?.name}
          </Option>
        ))}
      </Select>
      <Input.TextArea
        placeholder="Write something"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
        </Modal>
        </>
    )
}

export default StudioCreator