"use client";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@nextui-org/react";
  import Image from "next/image";
//   import PropTypes from "prop-types";
  
  export default function PreviewModal({avatarPng}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
            marginLeft: "10px",
          }}
        >
            Preview
            </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {() => (
              <>
                <ModalHeader 
                className="flex flex-col gap-1" 
                style={{ textAlign: "center", color: "#c8c7cc" }}
                >
                    <h1>
                    Preview Image
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
                {avatarPng ? (
                  <Image
                    src={`https://models.readyplayer.me/${avatarPng}.png`}
                    alt="Avatar Preview"
                    width={400}
                    height={400}
                  />
                ) : (
                  <p style={{ textAlign: "center", color: "#f00" }}>
                    No image available
                  </p>
                )}
                </ModalBody>
                <ModalFooter>
                  <Button 
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
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  