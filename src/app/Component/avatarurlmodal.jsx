'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function AvatarUrlModal({ avatarUrl }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const copyToClipboard = () => {
    if (avatarUrl) {
      navigator.clipboard.writeText(avatarUrl);
      alert("URL copied to clipboard!");
    } else {
      alert("No URL to copy!");
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#029ef2',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          alignSelf: 'center',
          // marginTop: '10px',
          marginLeft: '40%',
        }}
      >
        Click To Generate Avatar
      </Button>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Generated Avatar URL</ModalHeader>
              <ModalBody>
                <h3 style={{ wordWrap: "break-word" }}>
                  <b>URL: </b>{avatarUrl || "No URL available yet."}
                </h3>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    copyToClipboard();
                    onClose();
                  }}
                >
                  Copy URL
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
