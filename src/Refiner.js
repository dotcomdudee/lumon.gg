import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BinShelf from "./components/BinShelf";
import DigitMatrix from "./components/DigitMatrix";
import CompletionScreen from "./components/CompletionScreen";
import Divider from "./components/Divider";
import RetroMonitorScrim from "./components/RetroMonitorScrim";
import Cursor from "./components/Cursor";
import { useViewControls, useKeyPress, randomInt } from "./util";

const Refiner = () => {
  const { pan, zoom } = useViewControls();
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [binPositions, setBinPositions] = useState([0, 0, 0, 0, 0]);
  const [binMaxes] = useState([
    {
      wo: randomInt(16, 48),
      fc: randomInt(16, 48),
      dr: randomInt(16, 48),
      ma: randomInt(16, 48),
    },
    {
      wo: randomInt(16, 48),
      fc: randomInt(16, 48),
      dr: randomInt(16, 48),
      ma: randomInt(16, 48),
    },
    {
      wo: randomInt(16, 48),
      fc: randomInt(16, 48),
      dr: randomInt(16, 48),
      ma: randomInt(16, 48),
    },
    {
      wo: randomInt(16, 48),
      fc: randomInt(16, 48),
      dr: randomInt(16, 48),
      ma: randomInt(16, 48),
    },
    {
      wo: randomInt(16, 48),
      fc: randomInt(16, 48),
      dr: randomInt(16, 48),
      ma: randomInt(16, 48),
    },
  ]);
  const [binTotals, setBinTotals] = useState([
    { wo: 0, fc: 0, dr: 0, ma: 0 },
    { wo: 0, fc: 0, dr: 0, ma: 0 },
    { wo: 0, fc: 0, dr: 0, ma: 0 },
    { wo: 0, fc: 0, dr: 0, ma: 0 },
    { wo: 0, fc: 0, dr: 0, ma: 0 },
  ]);
  const bin01 = useKeyPress("1");
  const bin02 = useKeyPress("2");
  const bin03 = useKeyPress("3");
  const bin04 = useKeyPress("4");
  const bin05 = useKeyPress("5");

  const handleBinPositionChange = (positions) => {
    setBinPositions(positions);
  };

  const handleMouseMove = ({ pageX, pageY }) => {
    setCursor({ x: pageX, y: pageY });
  };

  const handleBin = ({ binIndex, type }) => {
    const binTotalsCopy = [...binTotals];

    // Add to the bin if type quota hasn't been met.
    if (binTotalsCopy[binIndex][type] < binMaxes[binIndex][type]) {
      binTotalsCopy[binIndex][type] += 1;
      setBinTotals(binTotalsCopy);

      const total = binTotalsCopy.reduce(
        (aggregate, { wo, fc, dr, ma }) => aggregate + wo + fc + dr + ma,
        0
      );

      const max = binMaxes.reduce(
        (aggregate, { wo, fc, dr, ma }) => aggregate + wo + fc + dr + ma,
        0
      );

      setProgress(total / max);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseMove={handleMouseMove}
    >
      <Header filename="Dranesville" progress={progress} />
      <Divider weight="double" />
      <DigitMatrix
        squareRoot={20}
        pan={pan}
        zoom={zoom}
        binPositions={binPositions}
        bin01={bin01}
        bin02={bin02}
        bin03={bin03}
        bin04={bin04}
        bin05={bin05}
        onBin={handleBin}
      />
      <Divider weight="double" />
      <BinShelf
        binMaxes={binMaxes}
        binTotals={binTotals}
        onBinPositionChange={handleBinPositionChange}
        bin01={bin01}
        bin02={bin02}
        bin03={bin03}
        bin04={bin04}
        bin05={bin05}
      />
      <Divider weight="single" />
      <Footer hexMin="0x15DB4A" hexMax="0x0AEAFC" />
      <CompletionScreen open={progress === 1} />
      <RetroMonitorScrim />
      <Cursor x={cursor.x} y={cursor.y} />
    </div>
  );
};

export default Refiner;
