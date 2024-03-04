import React from "react";
import { ChakraProvider, Box, Flex, Heading, Input, IconButton, VStack, HStack, Avatar, Text, Divider, useToast } from "@chakra-ui/react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

const Index = () => {
  // State for the list of messages
  const [messages, setMessages] = React.useState([]);
  // State for the current message input
  const [currentMessage, setCurrentMessage] = React.useState("");

  const toast = useToast();

  // Function to handle sending a message
  const sendMessage = () => {
    if (currentMessage.trim() === "") {
      toast({
        title: "Message is empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: currentMessage,
        sender: "You",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setCurrentMessage("");
  };

  return (
    <ChakraProvider>
      <Flex height="100vh" alignItems="center" justifyContent="center" p={4}>
        <Box w="full" maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg">
          <Box p={6} bg="blue.500">
            <Heading fontSize="xl" color="white">
              Messenger Clone
            </Heading>
          </Box>
          <VStack p={4} height="2xl" overflowY="scroll" spacing={4} align="stretch">
            {messages.map((message) => (
              <HStack key={message.id} justifyContent={message.sender === "You" ? "flex-end" : "flex-start"}>
                {message.sender !== "You" && <Avatar icon={<FaUserCircle />} />}
                <Flex maxW="80%" direction="column" alignItems={message.sender === "You" ? "flex-end" : "flex-start"}>
                  <Text p={2} bg={message.sender === "You" ? "blue.100" : "gray.100"} borderRadius="lg">
                    {message.text}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {message.time}
                  </Text>
                </Flex>
              </HStack>
            ))}
          </VStack>
          <Divider />
          <HStack p={4}>
            <Input
              placeholder="Type a message..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <IconButton colorScheme="blue" aria-label="Send message" icon={<FaPaperPlane />} onClick={sendMessage} />
          </HStack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default Index;
