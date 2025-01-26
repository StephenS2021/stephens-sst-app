import Image from "next/image";
import P5Wrapper from "@/components/P5Wrapper";
import exampleSketch from "@/sketches/exampleSketch";
import noiseSampleSketch from "@/sketches/noiseSampleSketch";
import bezierSketch from "@/sketches/bezierSketch";
import discoSketch from "@/sketches/discoSketch"
import terrainSketch from "@/sketches/terrainSketch";
import stripTerrainSketch from "@/sketches/stripTerrainSketch";

export default function Home() {
  return (
    <main>
      <P5Wrapper sketch={stripTerrainSketch} />
    </main>
  );
}
