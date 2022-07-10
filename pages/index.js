import Head from "next/head";
import * as d3 from "d3-scale-chromatic";
import * as harmonics from "harmonics";
import { useEffect, useMemo, useState } from "react";

const NOTES = ["E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb"];
function indexToNote(i) {
  return i % NOTES.length;
}
function formatHarmonicNote(note) {
  return note?.replace(/[0-9]+/gim, "");
}

export default function Home() {
  const [root, setRoot] = useState("C");
  const [chord, setChord] = useState("M");
  // const [cycle, setCycle] = useState(false);
  const rootAndChord = useMemo(() => root + " " + chord, [root, chord]);
  // const scale = useMemo(() => {
  //   try {
  //     harmonics.scale(rootAndChord);
  //   } catch (e) {
  //     return [];
  //   }
  // }, [rootAndChord]);
  const chordNotes = useMemo(() => {
    try {
      return harmonics.chord(rootAndChord).map(formatHarmonicNote);
    } catch (e) {
      return [];
    }
  }, [rootAndChord]);

  // TODO: Animate root going up

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Guitar fretboard helper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>Visualise how to construct different chords on a guitar fretboard.</p>

      <div className="relative">
        <p className="italic font-bold mb-2"></p>

        <div className="flex flex-row">
          Notes in&nbsp;
          <div className="font-bold text-red-500">{rootAndChord}</div>:
          <div className="ml-2 flex flex-row space-x-3 font-mono font-bold">
            {chordNotes.map((note, i) => (
              <div>{note}</div>
            ))}
          </div>
        </div>
        {/* <div className="flex flex-row">
          Scale:&nbsp;
          <div className="ml-2 flex flex-row space-x-3 font-mono font-bold">
            {scale.map((s) => (
              <span>s</span>
            ))}
          </div>
        </div> */}

        <div className="border-b-4 border-black my-2" />
        <p className="italic font-bold mb-2">Options on the fretboard</p>

        <main className="span-3 sticky top-0">
          <Dots />
          <String
            start="E"
            highlighted={chordNotes}
            onClick={(root) => setRoot(root)}
          />
          <String
            start="A"
            highlighted={chordNotes}
            onClick={(root) => setRoot(root)}
          />
          <String
            start="D"
            highlighted={chordNotes}
            onClick={(root) => setRoot(root)}
          />
          <String
            start="G"
            highlighted={chordNotes}
            onClick={(root) => setRoot(root)}
          />
          <String
            start="B"
            highlighted={chordNotes}
            onClick={(root) => setRoot(root)}
          />
          <String
            start="E"
            highlighted={chordNotes}
            onClick={(root) => setRoot(root)}
          />
        </main>

        <aside className="pt-4">
          {/* <div>
            <button onClick={() => setCycle((cycle) => !cycle)}>
              {cycle ? "⏸" : "▶️"} cycle
            </button>
          </div> */}

          <div className="border-b-4 border-black my-2" />

          <p className="italic font-bold mb-2">Select a root note</p>

          <div className="grid grid-flow-col auto-cols-[40px] font-mono">
            {NOTES.map((note, i) => (
              <div
                onClick={() => setRoot(note)}
                key={i}
                className={`cursor-pointer py-1 px-3 ${
                  root === note
                    ? "text-red-500 font-bold"
                    : chordNotes.includes(note)
                    ? "text-orange-500"
                    : null
                }`}
              >
                {note}
              </div>
            ))}
          </div>

          <div className="border-b-2 border-black my-2" />

          <p className="italic font-bold mb-2">Select a chord type</p>

          <div className="grid grid-cols-6 font-mono gap-2">
            {harmonics.chords().map((_chord) => (
              <div
                onClick={() => setChord(_chord)}
                className={_chord === chord && "text-red-500 font-bold"}
              >
                {_chord}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function String({ start, highlighted = [], fretCount = 16, onClick }) {
  const noteOffset = NOTES.indexOf(start);
  const notes = new Array(fretCount)
    .fill(0)
    .map((_, i) => indexToNote(noteOffset + i));
  return (
    <div className="grid grid-flow-col auto-cols-[40px] font-mono">
      {notes.map((nI, i) => {
        const isHighlighted =
          highlighted.length > 0 &&
          highlighted.some((note) => formatHarmonicNote(note) === NOTES[nI]);
        return (
          <div
            onClick={() => onClick(NOTES[nI])}
            key={i}
            className={`cursor-pointer py-1 px-3 ${
              isHighlighted ? "font-bold underline" : ""
            }`}
            style={{
              background: isHighlighted
                ? "white"
                : d3.interpolateRainbow(nI / fretCount)
            }}
          >
            {NOTES[nI]}
          </div>
        );
      })}
    </div>
  );
}

function Dots() {
  return (
    <div className="grid grid-flow-col auto-cols-[40px] font-mono text-center">
      <div></div>
      <div></div>
      <div>.</div>
      <div></div>
      <div>.</div>
      <div></div>
      <div>.</div>
      <div></div>
      <div>.</div>
      <div></div>
      <div></div>
      <div>..</div>
      <div></div>
      <div></div>
      <div>.</div>
    </div>
  );
}
