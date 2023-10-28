import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, set_val, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Box, Button, Heading, Input, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import NextLink from "next/link"
import NextHead from "next/head"



export default function Component() {
  const form_state = useContext(StateContext)
  const router = useRouter()
  const [ colorMode, toggleColorMode ] = useContext(ColorModeContext)
  const focusRef = useRef();
  
  // Main event loop.
  const [addEvents, connectError] = useContext(EventLoopContext)

  // Set focus to the specified element.
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  })

  // Route after the initial page hydration.
  useEffect(() => {
    const change_complete = () => addEvents(initialEvents())
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])

  const ref_password = useRef(null); refs['ref_password'] = ref_password;
  const ref_email = useRef(null); refs['ref_email'] = ref_email;

  return (
    <Fragment>
  <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <Modal isOpen={connectError !== null}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Connection Error`}
</ModalHeader>
  <ModalBody>
  <Text>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {getEventURL().href}
</Text>
</ModalBody>
</ModalContent>
</ModalOverlay>
</Modal>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  <VStack>
  <Box as={`form`} onSubmit={(_e0) => addEvents([Event("form_state.handle_submit", {form_data:{"password": getRefValue(ref_password), "email": getRefValue(ref_email)}})], (_e0))}>
  <Heading size={`xl`} sx={{"marginTop": "3em", "color": "black", "textAlign": "center"}}>
  {`TimeLockVR`}
</Heading>
  <Text sx={{"fontSize": "1.5em", "marginTop": "2em"}}>
  {`Login`}
</Text>
  <VStack>
  <Input id={`email`} placeholder={`Email`} ref={ref_email} sx={{"marginTop": "2em"}} type={`password`}/>
  <Input id={`password`} placeholder={`Password`} ref={ref_password} type={`password`}/>
  <Link as={NextLink} href={`/`} sx={{"isLoading": false, "loadingText": "Loading...", "button": true, "spinnerPlacement": "start", "marginTop": "4em", "type": "submit"}}>
  <Button>
  {`Login`}
</Button>
</Link>
  <Link as={NextLink} href={`/`} sx={{"marginTop": "4em", "color": "rgb(107,99,246)"}}>
  {`Don't have an account? Sign up here!`}
</Link>
</VStack>
</Box>
</VStack>
  <NextHead>
  <title>
  {`Reflex App`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
