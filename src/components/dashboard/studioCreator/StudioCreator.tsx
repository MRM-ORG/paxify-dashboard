import React, { useEffect, useState } from "react";
import { createStore } from "polotno/model/store";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { SidePanel } from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";
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
import { v4 as uuidv4 } from "uuid";

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
  const [audioFile, setAudioFile] = useState(null);

  const onTimeChange = (time: Dayjs, timeString: string) => {
    setTime(timeString);
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result.split(",")[1]); // Extracting base64 data from the result
        } else {
          reject(new Error("Failed to read file as base64."));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleAudioChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0] || null;
    const updatedPlayers = [...players];

    if (file) {
      const fileString = await readFileAsBase64(file);
      updatedPlayers[index].enhancements.audio.src = fileString;
      // updatedPlayers[index].enhancements.audio.source = file;
    }

    setPlayers(updatedPlayers);
  };
  store.setSize(1080, 1920, true);
  store.setScale(0.4);
  // console.log("store width", store.width);
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
          src: "",
          // src: "https://cdn.shopify.com/s/files/1/0762/0499/8931/files/mixkit-game-show-suspense-waiting-667.wav?v=1689275490",
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
            src: "",
            // src: "https://cdn.shopify.com/s/files/1/0762/0499/8931/files/mixkit-game-show-suspense-waiting-667.wav?v=1689275490",
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
      if (player.enhancements.audio.src) {
        const audioFile = player.enhancements.audio.src;
        const storage = getStorage(firebase);
        const audioStorageRef = ref(
          storage,
          `audio/${Date.now()}_${index}.mp3`
        );

        try {
          await uploadString(audioStorageRef, audioFile, "base64", {
            contentType: "audio/mp3",
          });

          const downloadURL = await getDownloadURL(audioStorageRef);
          player.enhancements.audio.src = downloadURL;
        } catch (error) {
          console.error("Error uploading audio:", error);
        }
      }
    });

    try {
      await Promise.all(uploadPromises);
      const story = {
        story: {
          id: uuidv4(),
          status: false,
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
    <div style={{ height: "auto" }}>
      <div
        className="w-screen bp4-dark "
        style={{ width: "100%", height: "auto", position: "relative" }}>
        <PolotnoContainer
          style={{
            width: "100%",
            height: "100vh",
          }}>
          <SidePanelWrap
            style={{
              width: "auto",
            }}>
            <SidePanel store={store} />
          </SidePanelWrap>
          <WorkspaceWrap style={{ borderBottom: "1px solid grey" }}>
            <Toolbar store={store} downloadButtonEnabled />
            <Workspace
              bleedColor="white"
              backgroundColor="#F5F5F5"
              store={store}
            />
            <ZoomButtons store={store} />
          </WorkspaceWrap>
        </PolotnoContainer>
      </div>
      <button className="saveButton" onClick={saveImage}>
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
          <div>
            <Button key="add-more" onClick={showAddMoreModal}>
              Add More
            </Button>
            <Button key="submit" type="primary" onClick={handleOk}>
              {!confirmLoading ? "Submit" : "Please Wait.."}
            </Button>
          </div>
        }>
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
            <h3>
              <b>Audio</b>
            </h3>
            <Input
              type="file"
              accept="audio/*"
              onChange={(newValue) => handleAudioChange(newValue, index)}
              style={{ width: "100%", marginBottom: "16px" }}
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
