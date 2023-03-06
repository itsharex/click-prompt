import React from "react";
import { Card, CardFooter, CardHeader } from "@chakra-ui/card";
import {
  Box,
  Button,
  CardBody,
  Heading,
  SimpleGrid,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  ButtonGroup,
} from "@chakra-ui/react";

import Link from "next/link";

import samples from "@/assets/chatgpt/samples/index.json";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import SimpleMarkdown from "@/components/SimpleMarkdown";
import { ClickPromptButton } from "@/components/CustomIcon";

function ChatGptSamples() {
  const chatgptLink = "https://github.com/prompt-engineering/click-prompt/tree/master/src/assets/chatgpt";

  return (
    <>
      <Alert status='info'>
        <AlertIcon />
        <AlertTitle>分享我的 ChatGPT 心得：</AlertTitle>
        <Link href={chatgptLink}>
          Pull Request <ExternalLinkIcon />
        </Link>
      </Alert>
      {samples.length > 0 && (
        <SimpleGrid columns={{ md: 4, base: 1 }} spacing={4}>
          {samples.map((sample, index) => (
            <Card key={`sample-${index}`} mt='2'>
              <CardHeader>
                <Heading size='md'>
                  {sample.name} - {sample.author}
                </Heading>
              </CardHeader>

              <CardBody maxH='320px' overflow='auto'>
                <Stack>
                  <SimpleMarkdown content={sample?.preview ? sample.preview.replaceAll("\n", "\n\n") : "no preview"} />
                </Stack>
              </CardBody>

              <CardFooter>
                <ButtonGroup spacing='4'>
                  <Link href={"/chatgpt-samples/" + sample.path.split(".")[0]}>
                    <Button>View here</Button>
                  </Link>
                  <ClickPromptButton />
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </>
  );
}

export default ChatGptSamples;
