"use client";

import { TextField } from "@mui/material";
import { useMemo, useState } from "react";
import "diff-match-patch-line-and-word";
import { diff_match_patch } from "diff-match-patch";

//have two text field
export default function Diff() {
  const [aText, setAText] = useState("");
  const [bText, setBText] = useState("");

  const resText = useMemo(() => {
    const dmp = new diff_match_patch();
    const diffs = dmp.diff_wordMode(aText, bText);
    const html = dmp.diff_prettyHtml(diffs);

    return html;
  }, [aText, bText]);

  return (
    <div>
      <h1>Diff</h1>
      <TextField value={aText} onChange={(e) => setAText(e.target.value)} />
      <TextField value={bText} onChange={(e) => setBText(e.target.value)} />
      <p>Diff</p>
      <div dangerouslySetInnerHTML={{ __html: resText }}></div>
    </div>
  );
}
