import { Box, Button, Center } from "@chakra-ui/react";
import { useEffect } from "react";
import * as THREE from 'three';

export default function Header() {
  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    document.getElementById("c")?.hasChildNodes() ? document.getElementById("c")?.removeChild(document.getElementById("c")?.firstChild!) : null;
    document.getElementById("c")?.appendChild(renderer.domElement);

    function animation(time: any) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;
      renderer.render(scene, camera);
    }
  }, []);

  return (
    <Box
      minH={"100vh"}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Box height={"100vh"} position={"absolute"} id="c" width={"100px"} />
      <Box position={"absolute"} overflow="auto" h="100vh" w="100%">
        <Box width={"100%"} height="100vh"></Box>
        <Box m={"0 0 100px 0"}>
          <Center>
            <Button>CubeZet</Button>
          </Center>
        </Box>
      </Box>
    </Box>
  )
}