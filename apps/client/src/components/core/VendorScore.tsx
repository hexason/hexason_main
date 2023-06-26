import { DiamondIcon, KingIcon, QueenIcon, SmallHeartIcon } from "@/assets/icons"
import { Box, HStack } from "@chakra-ui/react"
import { PropsWithChildren, useEffect, useState } from "react"

export const VendorScore = ({ score }: { score: number }) => {
  if (score < 6) return <IconRender score={score}><SmallHeartIcon width={18} height={18} fill={"red"} /></IconRender>
  if (score < 11) return <IconRender score={score}><DiamondIcon width={20} height={20} fill={"lightblue"} /></IconRender>
  if (score < 16) return <IconRender score={score}><QueenIcon width={20} height={20} fill={"orange"} /></IconRender>
  if (score > 15) return <IconRender score={score}><KingIcon width={24} height={24} fill={"orange"} /></IconRender>

  return <SmallHeartIcon width={28} height={28} fill={"red"} />
}

const IconRender = ({ score, children }: PropsWithChildren & { score: number }) => {
  const [iconPack, setIconPack] = useState<any[]>([])
  useEffect(() => {
    let newArray = []
    let n = (score % 5) === 0 ? 5 : score % 5
    for (let i = 0; i < n; i++) {
      newArray.push(i);
    }
    setIconPack([...newArray]);
  }, [score])
  return (
    <HStack>
      {iconPack.map((i) => (
        <Box key={`score-${i}-${Date.now()}`}>
          {children}
        </Box>
      ))}
    </HStack>
  )
}