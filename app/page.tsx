"use client"

import { Typography, TextField, Button, Container, Box, Stack } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {

  const [transText, setTrasnText] = useState('')
  const [transResText, setTrasnResText] = useState('')
  const [correctText, setCorrectText] = useState('')
  const [correctResText, setCorrectResText] = useState('')
  

  const translate = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/translate`, {
      body: JSON.stringify({ Text: transText, LangTo: 'en' }),
      method: 'POST',
    })
    setTrasnResText(await res.text()) 
  }

  const correct = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/correct`, {
      body: JSON.stringify({ Text: correctText }),
      method: 'POST',
    })
    setCorrectResText(await res.text()) 
  }

  return (
    <Container
      sx={{
        minHeight: "100vh",
        width:"480px",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack gap={4}>
        <Stack gap={1}>
          <Typography variant='h2' gutterBottom>Translate API</Typography>
          <TextField value={transText} onChange={(e) => setTrasnText(e.target.value)} fullWidth />
          <Button onClick={() => translate()} variant='contained'  sx={{alignSelf: "flex-end"}}>SUBMIT</Button>
          <Typography alignSelf={"flex-start"}>{transResText}</Typography>
        </Stack>
        <Stack gap={1}>
          <Typography variant='h2' gutterBottom>ChatGPT</Typography>
          <Typography variant='h4' gutterBottom>Text Correction</Typography>
          <TextField value={correctText} onChange={(e) => setCorrectText(e.target.value)} fullWidth />
          <Button onClick={() => correct()} variant='contained'  sx={{alignSelf: "flex-end"}}>SUBMIT</Button>
          <Typography alignSelf={"flex-start"}>{correctResText}</Typography>
        </Stack>
      </Stack>
    </Container>
  )
}
