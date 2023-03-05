import React from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardFooter, CardHeader } from "@chakra-ui/card";
import { Button, CardBody, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

import samples from "@/assets/chatgpt/samples/index.json";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function ChatGptSamples() {
  const chatgptLink = "https://github.com/prompt-engineering/prompt-generator/tree/master/src/assets/chatgpt";

  return (
    <>
      <Text>
        分享我的 ChatGPT 心得：
        <Link href={chatgptLink}>
          Pull Request <ExternalLinkIcon />
        </Link>
      </Text>
      {samples.length > 0 && (
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
          {samples.map((sample, index) => (
            <Card key={`sample-${index}`}>
              <CardHeader>
                <Heading size='md'>
                  {sample.name} - {sample.author}
                </Heading>
              </CardHeader>
              <CardBody>
                <Stack>
                  <ReactMarkdown>
                    {sample?.preview ? sample.preview.replaceAll("\n", "\n\n") : "no preview"}
                  </ReactMarkdown>
                </Stack>
              </CardBody>

              <CardFooter>
                <Link href={"/ChatGptSamples/" + sample.path.split(".")[0]}>
                  <Button>View here</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </>
  );
}

export default ChatGptSamples;
