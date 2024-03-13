import { Fragment, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const text =
  "According to all known laws of aviation, there's no way a bee should be able to fly. The bee, however, flies anyway, because bees don't care whot humans think is posible";

/**
 * The following function takes an array of [start, end] tuples
 * and should return the text with the characters within the ranges in bold
 *
 * How the text should be bolded does not matter, it could be <b>, or a <span> with styles, etc
 *
 *
 * For example with ranges = [[3, 5]] and text being "Lorem Ipsum"
 * it should return "Lor<b>em</b> Ipsum"
 */
type EmboldenProps = { ranges: Array<[number, number]>; children: string };
function Embolden({ ranges, children }: EmboldenProps) {
  // console.log(ranges, children);
  let startingIndex = 0;
  const segments = ranges.map(([start, end]) => {
    const nonBoldsegment = children.slice(startingIndex, start);
    const boldSegments = children.slice(start, end);
    startingIndex = end;
    return {
      nonBold: nonBoldsegment,
      bold: boldSegments,
    };
  });
  if (startingIndex < children.length) {
    segments.push({
      nonBold: children.slice(startingIndex),
      bold: "",
    });
  }
  return (
    <div>
      {segments.map((segment, index) => {
        return (
          <Fragment key={index}>
            {segment.nonBold}
            <b>{segment.bold}</b>
          </Fragment>
        );
      })}
    </div>
  ); //iplement here
}

function App() {
  return (
    <>
      <p>{text}</p>
      <Embolden
        ranges={[
          [3, 6],
          [8, 12],
        ]}
      >
        {text}
      </Embolden>
    </>
  );
}

export default App;
