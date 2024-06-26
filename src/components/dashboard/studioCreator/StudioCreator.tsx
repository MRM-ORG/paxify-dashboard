import {
  fetchUserStores,
  getUserSubscriptionStatus,
  uploadStoryContent,
} from "@/apiCalls/auth";
import { BACKEND_URL } from "@/constants";
import { firebase } from "@/firebase/firebase";
import { Button, Input, Modal, Select, Tooltip } from "antd";
import { ChevronLeft, ChevronRight } from "tabler-icons-react";
import axios from "axios";
import { Dayjs } from "dayjs";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { useRouter } from "next/router";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Workspace } from "polotno/canvas/workspace";
import { createStore } from "polotno/model/store";
import { SidePanel } from "polotno/side-panel";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { FaInfoCircle } from "react-icons/fa";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const { Option } = Select;

const Row = styled.div<{ gap?: string }>`
  gap: ${(props) => props.gap || "10px"};
  display: flex;
`;

const ColorPicker = styled(SketchPicker)<{ top?: string; left?: string }>`
  top: 10%;
  left: 20%;
  z-index: 2000;
  position: absolute;
`;

const ColorPickerContainer = styled.h3`
  gap: 5px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  position: relative;
`;

const Circle = styled.div<{ background: string }>`
  position: relative;
  background: ${(props) => props.background};
  border: ${(props) => (props.background ? "none" : "1px solid")};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-bottom: 16px;
`;

const OverlayPreview = styled.div`
  font-size: 14px;
  gap: 12px;
  height: 100px;
  width: 100%;
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  }
`;

const AuthorPreview = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const CTAContainer = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
`;

const CallToAction = styled.a<{ color: string }>`
  border: none;
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  color: white;
  background: ${(props) => props.color};
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const SubstoryContainer = styled.div`
  padding: 20px;
  margin: 10px 0;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.05);
`;

const StudioCreator = () => {
  const router = useRouter();
  const store = createStore();
  store.openSidePanel("resize");
  const page = store.addPage();
  const [swiperKey, setSwiperKey] = useState(0);
  const [subscription, setSubscription] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const ctaColorPickerRef = useRef(null);
  const storyRingColorPickerRef = useRef(null);
  const [swiperReference, setSwiperReference] = useState({});
  const [showCTAColorPicker, setShowCTAColorPicker] = useState(false);
  const [showStoryRingColorPicker, setShowStoryRingColorPicker] =
    useState(false);
  const [storyRingColor, setStoryRingColor] = useState("#e1306c");
  const [image, setImage] = useState("");
  const [stores, setStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storeId, setStoreId] = useState(null);
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [audioFile, setAudioFile] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => {
      if (
        ctaColorPickerRef.current &&
        // @ts-ignore
        !ctaColorPickerRef.current.contains(event.target)
      ) {
        setShowCTAColorPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ctaColorPickerRef]);

  useEffect(() => {
    const handleClickOutside = () => {
      if (
        storyRingColorPickerRef.current &&
        // @ts-ignore
        !storyRingColorPickerRef.current.contains(event.target)
      ) {
        setShowStoryRingColorPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [storyRingColorPickerRef]);

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

  const uploadAuthorImageToFirebase = async (event: any, index: number) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setIsLoading(true);
    const request = await uploadStoryContent(file);
    const url = request.url;

    const updatedPlayers = [...players];
    updatedPlayers[index].layout.author = url;

    setPlayers(updatedPlayers);
    setIsLoading(false);
  };

  store.setSize(1080, 1920, true);
  store.setScale(0.4);
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
    if (subscription === "Basic") {
      return;
    }

    addPlayer();
    setImage("");
    setOpen(false);
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    setUser(user?.uid);
    setName(user?.email.split("@")[0]);

    getUserSubscriptionStatus(user?.uid).then((res) =>
      setSubscription(res?.plan?.plan)
    );

    fetchUserStores(user.uid)
      .then((stores) => {
        if (Array.isArray(stores)) {
          setStores(stores);
          setStoreId(stores[0].id);
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

    const hasEmptyLabel = players.some((player) => !player.layout.title.trim());

    if (hasEmptyLabel) {
      setConfirmLoading(false);
      return alert("Please enter Story Label for all the sub-stories");
    }

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

        console.log("Storage Ref:", storageRef, base64Data);

        // Upload the base64 data to Firebase Storage
        const uploadTask = uploadString(storageRef, base64Data, "base64", {
          contentType: "image/png",
        });

        // Get the download URL once the upload is complete
        try {
          await uploadTask;
          const downloadURL = await getDownloadURL(storageRef);
          console.log("Download URL:", downloadURL);
          player.content.source = downloadURL; // Update content.source with the download URL
          player.layout.timer = time;
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
      if (subscription !== "Basic" && player.enhancements.audio.src) {
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
              color: storyRingColor,
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

      axios.post(`${BACKEND_URL}/firebase/story`, story).then(() => {
        setConfirmLoading(false);
        router.push("/dashboard/stories");
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

  useEffect(() => {
    setSwiperKey((prevKey) => prevKey + 1); // Increment key to force rerender fo swiper
  }, [showCTAColorPicker]);

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

      <div className="hidePromotion" />

      <Modal
        title="Save Story"
        style={{
          marginBottom: "20px",
        }}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading || isLoading}
        onCancel={handleCancel}
        footer={
          <div>
            <Button
              disabled={subscription === "Basic"}
              key="add-more"
              onClick={showAddMoreModal}>
              Add a Sub-Story
            </Button>

            <Button key="submit" type="default" onClick={handleOk}>
              {!confirmLoading ? "Save" : "Please Wait.."}
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

        <div>
          <ColorPickerContainer>
            <b>Story Ring Color</b>

            {subscription === "Basic" && (
              <Tooltip title="Please upgrade your plan to change this setting">
                <FaInfoCircle
                  size={15}
                  className="text-[#4079ED] text-[10px] font-[600]"
                />
              </Tooltip>
            )}
          </ColorPickerContainer>
          <Circle
            style={{
              cursor: subscription === "Basic" ? "not-allowed" : "pointer",
            }}
            background={storyRingColor}
            onClick={() =>
              setShowStoryRingColorPicker(!showStoryRingColorPicker)
            }></Circle>

          {subscription !== "Basic" && showStoryRingColorPicker && (
            <div ref={storyRingColorPickerRef}>
              <ColorPicker
                color={storyRingColor}
                onChangeComplete={(color) => setStoryRingColor(color.hex)}
              />
            </div>
          )}
        </div>

        <Swiper
          onInit={(ev) => setSwiperReference(ev)}
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          allowTouchMove={false}
          navigation={{
            nextEl: "#swiper-button-next",
            prevEl: "#swiper-button-prev",
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}>
          {players?.map((player: any, index: number) => (
            <SwiperSlide key={index}>
              <Row gap="0">
                {players.length > 1 && (
                  <button
                    // @ts-ignore
                    onClick={() => swiperReference.slidePrev()}
                    id="swiper-button-prev">
                    <ChevronLeft size={24} strokeWidth={2} color={"black"} />
                  </button>
                )}
                <div>
                  <h3>
                    <b>Sub-Story {index + 1}</b>
                  </h3>
                  <SubstoryContainer>
                    <Input
                      placeholder="Story Label"
                      style={{ marginBottom: "16px" }}
                      value={player?.layout?.title}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                    />
                    <h3>
                      <b>Call To Action</b> (Leave blank to remove the bottom
                      overlay)
                    </h3>
                    <div className="flex gap-3">
                      <Input
                        placeholder="CTA Text"
                        style={{ width: "100%", marginBottom: "16px" }}
                        value={player?.layout?.cta?.text}
                        onChange={(e) =>
                          handleCtaTitleChange(index, e.target.value)
                        }
                      />
                      <Input
                        placeholder="CTA Link"
                        style={{ width: "100%", marginBottom: "16px" }}
                        value={player?.layout?.cta?.link}
                        onChange={(e) =>
                          handleCtaLinkChange(index, e.target.value)
                        }
                      />
                    </div>
                    <Row>
                      <div>
                        <h3>
                          <b>Author Image</b>
                        </h3>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(event) =>
                            uploadAuthorImageToFirebase(event, index)
                          }
                          style={{ width: "100%", marginBottom: "16px" }}
                        />
                      </div>
                      <div>
                        <h3
                          style={{
                            gap: "5px",
                            display: "flex",
                            alignItems: "center",
                          }}>
                          <b>Audio</b>
                          {subscription === "Basic" && (
                            <Tooltip title="Please upgrade your plan to change this setting">
                              <FaInfoCircle
                                size={15}
                                className="text-[#4079ED] text-[10px] font-[600]"
                              />
                            </Tooltip>
                          )}
                        </h3>
                        <Input
                          disabled={subscription === "Basic"}
                          type="file"
                          accept="audio/*"
                          onChange={(newValue) =>
                            handleAudioChange(newValue, index)
                          }
                          style={{ width: "100%", marginBottom: "16px" }}
                        />
                      </div>
                    </Row>

                    <Row>
                      <div>
                        <ColorPickerContainer>
                          <b>CTA Background Color</b>
                        </ColorPickerContainer>
                        <Circle
                          style={{
                            cursor:
                              subscription === "Basic"
                                ? "not-allowed"
                                : "pointer",
                          }}
                          background={player?.layout?.cta?.backgroundColor}
                          onClick={() =>
                            setShowCTAColorPicker(!showCTAColorPicker)
                          }></Circle>
                      </div>
                    </Row>

                    {showCTAColorPicker && (
                      <div ref={ctaColorPickerRef}>
                        <ColorPicker
                          color={player?.layout?.cta?.backgroundColor}
                          onChangeComplete={(color) =>
                            handleCtaColorChange(color, index)
                          }
                        />
                      </div>
                    )}

                    <OverlayPreview>
                      <AuthorPreview src={player?.layout?.author} />
                      <CTAContainer>
                        <div style={{ color: "white" }}>
                          {player.layout.title || "Story Label"}
                        </div>
                        <CallToAction
                          target="_blank"
                          color={player?.layout?.cta?.backgroundColor}
                          href={player?.layout?.cta?.link}>
                          {player?.layout?.cta?.text || "Call To Action"}
                        </CallToAction>
                      </CTAContainer>
                    </OverlayPreview>
                  </SubstoryContainer>
                </div>
                {players.length > 1 && (
                  <button // @ts-ignore
                    onClick={() => swiperReference.slideNext()}
                    id="swiper-button-next">
                    <ChevronRight size={24} strokeWidth={2} color={"black"} />
                  </button>
                )}
              </Row>
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal>
    </div>
  );
};

export default StudioCreator;
