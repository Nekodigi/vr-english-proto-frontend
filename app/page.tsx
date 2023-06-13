"use client";

import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import "diff-match-patch-line-and-word";
import { diff_match_patch } from "diff-match-patch";

export default function Home() {
  const [transText, setTrasnText] = useState("");
  const [transResText, setTrasnResText] = useState("");
  const [correctText, setCorrectText] = useState("");
  const [correctResText, setCorrectResText] = useState("");

  const translate = async () => {
    const transParam = new FormData();
    transParam.append("text", transText);
    transParam.append("langTo", "en");
    //JSON.stringify({ Text: transText, LangTo: 'en' })

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/translate`, {
      body: transParam,
      method: "POST",
    });
    setTrasnResText(await res.text());
  };

  const correctParam = new FormData();
  correctParam.append("text", correctText);
  //JSON.stringify({ Text: correctText }),
  const correct = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/correct`, {
      body: correctParam,
      method: "POST",
    });
    let text = await res.text();
    text = text.substring(1, text.length - 1);
    const dmp = new diff_match_patch();
    const diffs = dmp.diff_wordMode(correctText, text);
    const html = dmp.diff_prettyHtml(diffs);

    console.log(text);
    setCorrectResText(html);
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        width: "480px",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack gap={4}>
        <Stack gap={1}>
          <Typography variant="h2" gutterBottom>
            Translate API
          </Typography>
          <TextField
            value={transText}
            onChange={(e) => setTrasnText(e.target.value)}
            fullWidth
          />
          <Button
            onClick={() => translate()}
            variant="contained"
            sx={{ alignSelf: "flex-end" }}
          >
            SUBMIT
          </Button>
          <Typography alignSelf={"flex-start"}>{transResText}</Typography>
        </Stack>
        <Stack gap={1}>
          <Typography variant="h2" gutterBottom>
            ChatGPT
          </Typography>
          <Typography variant="h4" gutterBottom>
            Text Correction
          </Typography>
          <TextField
            value={correctText}
            onChange={(e) => setCorrectText(e.target.value)}
            fullWidth
          />
          <Button
            onClick={() => correct()}
            variant="contained"
            sx={{ alignSelf: "flex-end" }}
          >
            SUBMIT
          </Button>
          <div dangerouslySetInnerHTML={{ __html: correctResText }}></div>
          {/* <Typography alignSelf={"flex-start"}>{correctResText}</Typography> */}
        </Stack>
      </Stack>
    </Container>
  );
}
