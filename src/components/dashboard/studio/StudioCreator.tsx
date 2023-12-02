import React, { useEffect, useState } from "react";
import { createStore } from "polotno/model/store";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { SidePanel } from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";
// import { ref } from 'firebase/database';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { firebase } from "@/firebase/firebase";
import { Button, Input, Modal, Select, TimePicker } from "antd";
import { CirclePicker } from "react-color";
import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { fetchUserStores } from "@/apiCalls/auth";
import { useRouter } from "next/router";
import dayjs, { Dayjs } from "dayjs";

const { Option } = Select;

const StudioCreator = () => {
  const router = useRouter();
  const store = createStore();
  store.openSidePanel("resize");
  const page = store.addPage();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [image, setImage] = useState("");
  const [stores, setStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storeId, setStoreId] = useState(null);
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const onTimeChange = (time: Dayjs, timeString: string) => {
    setTime(timeString);
  };
  const [players, setPlayers] = useState([
    // Initialize with a single player
    {
      id: 1,
      content: {
        width: 1080,
        height: 1920,
        source: "", // Initialize with an empty source
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
        timer: time,
        title: "",
        description: `by ${name}`,
        cta: {
          text: "",
          link: "",
          backgroundColor: "",
        },
      },
    },
  ]);

  const addPlayer = () => {
    const newPlayerId = players.length + 1;
    setPlayers([
      ...players,
      {
        id: newPlayerId,
        content: {
          width: 1080,
          height: 1920,
          source: "",
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
          timer: time,
          title: "",
          description: `by ${name}`,
          cta: {
            text: "",
            link: "",
            backgroundColor: "",
          },
        },
      },
    ]);
  };

  const showAddMoreModal = () => {
    addPlayer();
    setImage("");
    setOpen(false);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user?.uid);
    setName(user?.email.split("@")[0]);
    fetchUserStores(user.uid)
      .then((stores) => {
        if (Array.isArray(stores)) {
          setStores(stores);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    // Create a promise array to upload all content.sources in parallel
    const uploadPromises = players.map(async (player, index) => {
      if (
        player.content.source &&
        player.content.source.startsWith("data:image")
      ) {
        // Handle only data URLs
        const base64Data = player.content.source.split(",")[1];
        const storage = getStorage(firebase);
        const storageRef = ref(storage, `images/${Date.now()}_${index}.png`);

        // Upload the base64 data to Firebase Storage
        const uploadTask = uploadString(storageRef, base64Data, "base64", {
          contentType: "image/png",
        });

        // Get the download URL once the upload is complete
        try {
          await uploadTask;
          const downloadURL = await getDownloadURL(storageRef);
          player.content.source = downloadURL; // Update content.source with the download URL
          player.layout.timer = time;
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    });

    // Wait for all uploads to complete before proceeding
    try {
      await Promise.all(uploadPromises);

      // Now, you can construct the story object with updated player content.source values
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
          player: players,
        },
        user: { uid: user, storeId: storeId },
      };

      // Make the API call to save the story
      axios.post(`${BACKEND_URL}/firebase/story`, story).then(() => {
        setConfirmLoading(false);
        router.push("/dashboard/");
        setOpen(false);
      });
    } catch (error) {
      setConfirmLoading(false);
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // oF6JKF61Mn0YheV7WpZM

  const saveImage = (e: any) => {
    e.preventDefault();
    const img = store
      .toDataURL({ ignoreBackground: false })
      .then(async (res) => {
        setImage(res);
        showModal();
      });
    // console.log({ img });
    // console.log(" src ", store.toJSON());
    // store.saveAsImage({ fileName: 'polotno.png' });
  };

  const handleTitleChange = (index: number, newValue: any) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].layout.title = newValue;
    updatedPlayers[index].content.source = image;
    setPlayers(updatedPlayers);
  };

  const handleCtaTitleChange = (index: number, newValue: any) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].layout.cta.text = newValue;
    setPlayers(updatedPlayers);
  };

  const handleCtaLinkChange = (index: number, newValue: any) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].layout.cta.link = newValue;
    setPlayers(updatedPlayers);
  };

  const handleCtaColorChange = (color: any, index: any) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].layout.cta.backgroundColor = color.hex;
    setPlayers(updatedPlayers);
  };

  return (
    <div style={{ height: "900px" }}>
      <div
        className="w-screen bp4-dark "
        style={{ width: "80%", height: "800px" }}>
        <PolotnoContainer
          style={{
            width: "85vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}>
          <SidePanelWrap
            style={{
              order: 2,
              height: "16%",
              width: "auto",
              maxHeight: "300vh",
            }}>
            <SidePanel store={store} />
          </SidePanelWrap>
          <WorkspaceWrap className="go3456988929" style={{ order: 1, flex: 1 }}>
            {/* <Toolbar store={store} downloadButtonEnabled /> */}
            <Workspace
              bleedColor="red"
              backgroundColor="#040408"
              store={store}
            />
            <ZoomButtons store={store} />
          </WorkspaceWrap>
        </PolotnoContainer>
      </div>
      <button
        style={{
          width: "100px",
          height: "30px",
          borderRadius: "5px",
          marginTop: "auto",
          background: "#4F46E4",
          color: "white",
        }}
        onClick={saveImage}>
        Save
      </button>
      <Modal
        title="Your Story"
        style={{ marginBottom: "20px" }}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={
          // isAddingMore ? ( // Customize modal footer based on whether "Add More" or "Submit" is clicked
          <div>
            <Button key="add-more" onClick={showAddMoreModal}>
              Add More
            </Button>
            <Button key="submit" type="primary" onClick={handleOk}>
              {!confirmLoading ? "Submit" : "Please Wait.."}
            </Button>
          </div>
          // ) : (
          //   <Button key="ok" type="primary" onClick={handleOk}>
          //     Submit
          //   </Button>
          // )
        }>
        {/* <input placeholder='Write something' style={{border: 'none'}} value={title} onChange={(e) => setTitle(e.target.value)}/> */}
        <Select
          style={{ width: "100%", marginBottom: "16px" }}
          placeholder="Select Store"
          value={storeId}
          onChange={(value) => setStoreId(value)}>
          {stores?.map((option) => (
            <Option key={option?.id} value={option?.id}>
              {option?.name}
            </Option>
          ))}
        </Select>
        <TimePicker
          onChange={onTimeChange as any}
          defaultValue={dayjs("00:00:00", "HH:mm:ss")}
          size="large"
          style={{ marginBottom: "20px" }}
        />
        {players?.map((player: any, index: number) => (
          <div key={index}>
            <Input.TextArea
              placeholder="Write something"
              style={{ marginBottom: "16px" }}
              value={player?.layout?.title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
            />
            <h3>
              <b>CTA</b>
            </h3>
            <Input
              placeholder="CTA Text"
              style={{ width: "100%", marginBottom: "16px" }}
              value={player?.layout?.cta?.text}
              onChange={(e) => handleCtaTitleChange(index, e.target.value)}
            />
            <Input
              placeholder="CTA Link"
              style={{ width: "100%", marginBottom: "16px" }}
              value={player?.layout?.cta?.link}
              onChange={(e) => handleCtaLinkChange(index, e.target.value)}
            />
            <h3 style={{ marginBottom: "16px" }}>
              <b>CTA BackgroundColor</b>
            </h3>
            <CirclePicker
              color={player?.layout?.cta?.backgroundColor}
              onChangeComplete={(color) => handleCtaColorChange(color, index)}
            />
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default StudioCreator;
