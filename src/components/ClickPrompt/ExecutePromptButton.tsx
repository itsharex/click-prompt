"use client";

import React, { MouseEventHandler, useState } from "react";
import { Text, useDisclosure } from "@chakra-ui/react";
import * as UserAPI from "@/api/user";
import { ResponseCreateConversation } from "@/pages/api/chatgpt/conversation";
import { createConversation } from "@/api/conversation";
import { sendMessage } from "@/api/chat";
import { ResponseSend } from "@/pages/api/chatgpt/chat";
import { Button } from "@/components/ChakraUI";
import { BeatLoader } from "react-spinners";
import { ClickPromptBird } from "@/components/ClickPrompt/ClickPromptButton";
import { ButtonSize, StyledPromptButton } from "./Button.shared";
import { LoggingDrawer } from "@/components/ClickPrompt/LoggingDrawer";

export type ExecButtonProps = {
  loading?: boolean;
  onClick?: MouseEventHandler;
  name: string;
  text: string;
  size?: ButtonSize;
  children?: React.ReactNode;
  handleResponse?: any;
  conversationId?: number;
  updateConversationId?: (conversationId: number) => void;
};

export function ExecutePromptButton(props: ExecButtonProps) {
  const [isLoading, setIsLoading] = useState(props.loading);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasLogin, setHasLogin] = useState(false);
  const [localId, setLocalId] = useState(props.conversationId);

  const handleClick = async () => {
    try {
      await UserAPI.isLoggedIn();
    } catch (e) {
      onOpen();
      setHasLogin(false);
    }

    if (!localId) {
      setIsLoading(true);
      let conversation: ResponseCreateConversation = await createConversation();
      if (!conversation) {
        return;
      }

      let conversationId = conversation.id || 0;
      setLocalId(conversationId);
      props.updateConversationId ? props.updateConversationId(conversationId) : null;
    }

    let response: any = await sendMessage(localId!!, props.text);
    console.log(response);
    if (!response) {
      props.handleResponse ? props.handleResponse(response as ResponseSend) : null;
    }

    onClose();
    setIsLoading(false);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <StyledPromptButton>
        <Button colorScheme='twitter' className='bg-blue' onClick={handleClick} {...props}>
          {props.children}
          {!isLoading && <Text>Prompt</Text>}
          {isLoading && <BeatLoader size={8} color='black' />}
        </Button>
        <ClickPromptBird />
      </StyledPromptButton>
      {!hasLogin && LoggingDrawer(isOpen, handleClose, hasLogin, props)}
    </>
  );
}