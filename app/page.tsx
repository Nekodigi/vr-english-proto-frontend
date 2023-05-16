"use client"

import { Typography, TextField, Button } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {

  const [transText, setTrasnText] = useState('')
  const [transResText, setTrasnResText] = useState('')
  

  const translate = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/translate`, {
      body: JSON.stringify({ Text: transText, LangTo: 'en' }),
      method: 'POST',
    })
    setTrasnResText(await res.text())
    
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Typography>{transResText}</Typography>
      <TextField value={transText} onChange={(e) => setTrasnText(e.target.value)} />
      <Button onClick={() => translate()}>SUBMIT</Button>
    </main>
  )
}
