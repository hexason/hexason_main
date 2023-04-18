import { SendIcon } from "@/assets/icons";
import { Button, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { useState } from "react";

const ChatComposer = ({ submitted }: any) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    submitted(newMessage);
    setNewMessage("");
  };

  const handleCompose = (event: any) => {
    setNewMessage(event.target.value);
  };

  return (
    <div className="chat-composer">
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            fontSize={"14px"}
            placeholder="Type & hit enter"
            onChange={handleCompose}
            value={newMessage}
          />
          <InputRightAddon bg="#000" as={Button} colorScheme="blackAlpha" type="submit">
            <SendIcon fill="white" height="20px" />
          </InputRightAddon>
        </InputGroup>
      </form>
    </div>
  );
};

export default ChatComposer;
