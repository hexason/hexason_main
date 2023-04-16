import { Tag } from "@chakra-ui/react"
import { useState } from "react"

export default function StatusViewer({statusCode}: {statusCode:number}) {
  const [status, setStatus] = useState({colorSchema: "green", txt: "Active"})
  switch (statusCode) {
    case 12:
      setStatus({colorSchema: "green", txt: "Active"})

  }

  return <Tag colorScheme=""></Tag>
}