import { Input } from "@chakra-ui/react";
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
        <Input
          fontSize={"14px"}
          className="form-control"
          placeholder="Type & hit enter"
          onChange={handleCompose}
          value={newMessage}
        />
      </form>
    </div>
  );
};

export default ChatComposer;
