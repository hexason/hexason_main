import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { DefaultAnimate } from "../animation";

export default function Background({ children, imageSrc }: { children: ReactNode, imageSrc?: string }) {
  const followerCursor = (event: any) => {
    const { clientX, clientY } = event;

    let blob = document.getElementById("blob");
    if (blob) {
      blob.style.left = clientX > 1600 ? "1600px" : `${clientX}px`;
      blob.style.top = clientY > 500 ? '500px' : `${clientY}px`;
    }
  }

  return (
    <Box
      backgroundImage={`url(${imageSrc || 'https://storage.googleapis.com/pai-images/056da8c9515c4b99b28f3e650cd102e2.jpeg'})`}
      minH="100vh"
      minW="100%"
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      position={"relative"}
      onPointerMove={followerCursor}
      backdropFilter={"blur(200px)"}
    >
      <DefaultAnimate
        transition={{ duration: 1 }}
      >
        <Box
          zIndex={0}
          position={"absolute"}
          minH="100vh"
          minW="100%"
          bg="#000000AB"
        >
          {children}
        </Box>
        {/* <Box
          id="blob"
          zIndex={1}
          position={"absolute"}
          w="200px"
          h="200px"
          display={{
            base: "none",
            md: "block"
          }}
          bg="#fff"
        /> */}
      </DefaultAnimate>
    </Box>
  )
}