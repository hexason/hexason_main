import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Input,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { useUser } from '../context/UserContext';
import NLink from "next/link";
import { IoLogIn } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { user, onOpen, loading } = useUser();


  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: "30px" }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex w="100%" fontSize={"21px"} flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Flex as={NLink} href="/">
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('black', 'white')}>
              LOVE
            </Text>
            <Text color={"red.400"}>BOX</Text>
          </Flex>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <InputGroup>
              <Input placeholder="Search Something..." />
              <InputRightAddon as={Button}>
                <FaSearch />
              </InputRightAddon>
            </InputGroup>
            <DesktopNav />
          </Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          {
            loading ? "loading" :
              <Box>
                {user.id ? <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar src={user.user_metadata?.avatar_url} size="sm" />
                  </MenuButton>
                  <MenuList>
                    {PROFILE_MENU.children.map((link) => <MenuItem key={link.label} as={NLink} href={link.href}>{link.label}</MenuItem>)}
                  </MenuList>
                </Menu> :
                  <Button
                    display={'inline-flex'}
                    fontSize={'sm'}
                    fontWeight={600}
                    onClick={onOpen}
                    isLoading={loading}
                    color="white"
                    bg={'red.300'}
                    _hover={{
                      bg: 'red.400',
                    }}>
                    <IoLogIn size={"20px"} /> <Text display={{ base: "none", md: "inline-block" }} ml={1}>Login Register</Text>
                  </Button>
                }
              </Box>
          }
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg={useColorModeValue('white', 'gray.800')}
          p={4}
          display={{ md: 'none' }}>
          {
            loading ? "loading" :
              user.id ?
                <MobileNavItem globToggle={onToggle} {...PROFILE_MENU} /> : <Button
                  display={'inline-flex'}
                  fontSize={'sm'}
                  fontWeight={600}
                  bg={'teal.400'}
                  onClick={onOpen}
                  isLoading={loading}
                  _hover={{
                    bg: 'teal.300',
                  }}>
                  Login / Register
                </Button>

          }
          {NAV_ITEMS.map((navItem) => (
            <MobileNavItem globToggle={onToggle} key={navItem.label} {...navItem} />
          ))}
        </Stack>
      </Collapse>
    </Box>
  )
}
const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                as={NLink}
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      as={NLink}
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNavItem = ({ label, children, href, globToggle }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const toggler = () => {
    if (children) onToggle()
    else if (globToggle) globToggle();
  }
  return (
    <Stack spacing={4} onClick={toggler}>
      <Flex
        py={2}
        as={NLink}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link onClick={globToggle} as={NLink} key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  globToggle?: () => void;
  href?: string;
}
const PROFILE_MENU = {
  label: 'Profile',
  children: [
    // {
    //   label: 'My Area',
    //   subLabel: 'Up-and-coming Designers',
    //   href: '/user',
    // },
    {
      label: 'Logout',
      subLabel: 'Trending Design to inspire you',
      href: '/logout',
    },
  ],
};
const NAV_ITEMS: Array<NavItem> = [
  // {
  //   label: 'Home',
  //   href: "/",
  // },
  // {
  //   label: 'How It Works',
  //   href: "/how_it_works",
  //   // children: [
  //   //   {
  //   //     label: 'Job Board',
  //   //     subLabel: 'Find your dream design job',
  //   //     href: '#',
  //   //   },
  //   // ],
  // },
];