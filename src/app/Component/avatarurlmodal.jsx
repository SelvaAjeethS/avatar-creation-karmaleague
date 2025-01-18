"use client";

import { FaCopy } from "react-icons/fa";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import PreviewModal from "./PreviewModal";

// import { redirect, useRouter } from "next/navigation";

export default function AvatarUrlModal({ avatarUrl, avatarPng }) {
  // const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [buttonText, setButtonText] = useState("Copy URL");

  // const copyToClipboard = () => {
  //   if (avatarUrl) {
  //     navigator.clipboard.writeText(avatarUrl);
  //     // alert("URL copied to clipboard!");
  //   } else {
  //     alert("No URL to copy!");
  //   }
  // };

  const copyToClipboard = () => {
    if (avatarUrl) {
      navigator.clipboard.writeText(avatarUrl);
      setButtonText("Copied!");
    }
    // else {
    //   setButtonText("No URL to Copy");
    // }
  };

  const handlePreview = () => {
    if (avatarPng) {
      // window.location.href = `https://models.readyplayer.me/${avatarPng}.png`;
      window.open(`https://models.readyplayer.me/${avatarPng}.png`, "_blank");
    } else {
      alert("No URL available for preview!");
    }
  };

  const handleDownload = async () => {
    if (avatarPng) {
      const imageUrl = `https://models.readyplayer.me/${avatarPng}.png`;

      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const downloadUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `${avatarPng}.png`;

        document.body.appendChild(link);
        link.click();

        URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading the image:", error);
        alert("Failed to download image!");
      }
    } else {
      alert("No image URL available for download!");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          onPress={onOpen}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#029ef2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            // alignItems: "center",
            // marginTop: '10px',
            // marginLeft: "40%",
          }}
        >
          Click To Generate Avatar
        </Button>
        <PreviewModal avatarPng={avatarPng} />
        {/* <Button
          onPress={handlePreview}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#029ef2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            // alignItems: "center",
            // marginTop: '10px',
            marginLeft: "10px",
          }}
        >
          Preview
        </Button> */}
        {/* <Button
          onPress={handleDownload}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#029ef2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Download
        </Button> */}
      </div>
      <Modal
        isDismissable={true}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        style={{
          padding: "10px",
          borderRadius: "20px",
          backgroundColor: "#151517",
          border: "1px solid #444",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 style={{ textAlign: "center", color: "#c8c7cc" }}>
                  Generated Avatar URL
                </h1>
                <hr
                  style={{
                    border: "none",
                    height: "1px",
                    backgroundColor: "#444",
                    margin: "8px auto",
                    width: "100%",
                  }}
                />
              </ModalHeader>
              <ModalBody>
                <p style={{ wordWrap: "break-word", color: "#727177" }}>
                  <b>URL: </b>
                  {avatarUrl || "No URL available yet."}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                    fontSize: "14px",
                    backgroundColor: "#2c2c2e",
                    color: "#99989d",
                    border: "1px solid #444",
                    margin: "0 5px",
                    borderRadius: "10px",
                    width: "100%",
                    gap: "8px",
                  }}
                  onPress={() => {
                    copyToClipboard();
                    // onClose();
                  }}
                >
                  <FaCopy style={{ fontSize: "16px", color: "#99989d" }} />
                  {buttonText}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
