import { SendIcon } from "@/assets/icons";
import { Button, Divider, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

export default function TimeLine() {
  const [stage] = useState([
    {
      title: "Starting point",
      description: "Анхан шатны ойлголт авах - Javascript, CSS, HTMl"
    },
    {
      title: "Board point",
      description: "Хөгжүүлэлтийн орчин бэлдэх - VScode, Git, Nodejs гэх зэрэг программ компьютер дээрээ суулгаж бэлтгэнэ. Github хаяг үүсгэж тусгайлан бэлдэж өгсөн эх код clone хийж авч ажиллах ба Pull Request харилцааг эрхэмлэх тухай тайлбар өгнө."
    },
    {
      title: "Prepare point",
      description: "Nestjs, Nextjs хоёрын талаар тайлбарлаж өгнө. Хөгжилтэй байлгах үүднээс суралцагчдын Ранк тодорхойлох тоглоом болон шалгалтууд орж ирнэ"
    },
    {
      title: "Discord Bot",
      description: "Discord.js ашиглан суралцагчид өөрсдийн гэсэн боттой болно. Ихэвчлэн бие даасан хэлбэртэй явагдах учир олон төрлийн сонирхолтой ботнууд гарч ирээд зогсохгүй өөрсдийн ботоо зарах бүтээгдэхүүн болгох чадвартай болно."
    },
    {
      title: "What is next",
      description: "Тусгайлан бэлдэж өгсөн эх код дээр ажиллаж дадлага хийх болон өөрсдийн CV, Portfolio гаргаж ирнэ. Өөрийн сурсан, мэдсэн, зүйлсээ эхнээс дахин нэг туршиж үзээд дараа нь яах вэ? яаж суралцах талаар бие даах болно. Сайн Ранктай суралцагч цаашдаа томхон ажлын байранд шаардлагатай бол зуучилж өгнө. Цаашдаа суралцагч өөрийн ажилласан туршилга, сонин хачин, мэдсэн зүйлсээ бусадтайгаа хуваалцаж ранкаа ахиулаад явна."
    },
    {
      title: "Recursive point",
      description: "Сургалт хэзээ ч дуусахгүй. Үргэлжийн явагдана. ZTH16 хөтөлбөр байнга хөгжин хувьсаж байх болно. \"0\"-ээс \"1\"-рүү, \"1\"-ээс \"0\"-рүү "
    },
  ])
  return (
    <Stack spacing={"20px"}>
      <Button colorScheme="teal" as={Link} href="https://forms.gle/o9jWaowk99aHo9JY9">
        <SendIcon height="20px" fill="white" /><Text mx="1">Бүртгүүлэх</Text>
      </Button>
      <Divider />
      <div className="timeline">
        <div className="timeline-empty" />
        <div className="timeline-middle">
          <div className="timeline-circle" />
        </div>
        <Point {...stage[0]} />
        <Point {...stage[1]} />
        <div className="timeline-middle">
          <div className="timeline-circle" />
        </div>
        <div className="timeline-empty" />
        <div className="timeline-empty" />
        <div className="timeline-middle">
          <div className="timeline-circle" />
        </div>
        <Point {...stage[2]} />
        <Point {...stage[3]} />
        <div className="timeline-middle">
          <div className="timeline-circle" />
        </div>
        <div className="timeline-empty" />
        <div className="timeline-empty" />
        <div className="timeline-middle">
          <div className="timeline-circle" />
        </div>
        <Point {...stage[4]} />
        <Point {...stage[5]} />
        <div className="timeline-middle">
          <div className="timeline-circle" />
        </div>
      </div >
      <Button colorScheme="teal" as={Link} href="https://forms.gle/o9jWaowk99aHo9JY9">
        <SendIcon height="20px" fill="white" /><Text mx="1">Бүртгүүлэх</Text>
      </Button>
    </Stack >
  )
}

const Point = ({ title, description }: { title: string, description: string }) => {
  return (
    <div className="timeline-component timeline-content">
      <Text as="h3" fontWeight={"bold"}>{title}</Text>
      <Text color="gray.400">{description}</Text>
    </div>
  )
}