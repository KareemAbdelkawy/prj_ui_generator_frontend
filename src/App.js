import React, { useRef, useEffect, useState, Suspense } from "react";
import "./App.scss";
//Components
import Header from "./components/header";
import { Section } from "./components/section";

// Page State
import state from "./components/state";

// R3F
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// React Spring
import { a, useTransition } from "@react-spring/web";
//Intersection Observer
import { useInView } from "react-intersection-observer";

function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} dispose={null} />;
}

const BlackScreen = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "50rem",
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20px",
      }}
    >
      <div
        style={{
          width: "75rem",
          height: "35rem",
          backgroundColor: "black",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          position: "relative",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <input
          type="text"
          placeholder="write your UI description here"
          style={{
            width: "80%",
            padding: "10px",
            fontSize: "20px",
            marginBottom: "20px",
            marginTop: "20px"
          }}
        />
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "white",
            color: "black",
            fontSize: "20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={()=>console.log('hess')}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={0.3} />
      {/* Diretion light */}
      {/* <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      /> */}
      {/* Spotlight Large overhead light */}
      <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
    </>
  );
};
const ScreenOne = ({ bgColor, position, children, domContent, modelPath }) => {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.z -= 0.01;
    // rotate around z-plane
  });
  const [refItem, inView] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]}>
        <mesh ref={ref} scale={[2, 2, 2]}>
          <Model url={modelPath} />
        </mesh>
        <Html fullscreen portal={domContent}>
          <div ref={refItem} className="container">
            <h1 className="title">{children}</h1>
          </div>
        </Html>
      </group>
    </Section>
  );
};
const Screen = ({ bgColor, position, children, domContent, modelPath }) => {
  const ref = useRef();
  const [xPosition, setXPosition] = useState(-200); // starting x position
  const [direction, setDirection] = useState(-1); // initial direction is to the right (+x)

  useFrame(() => {
    // update x position based on direction
    if (xPosition >= 200) {
      setDirection(-1);
      ref.current.rotation.z = +Math.PI / 2; // rotate to the left
    } else if (xPosition <= -200) {
      setDirection(1);
      ref.current.rotation.z = -Math.PI / 2; // rotate to the right
    }
    setXPosition(xPosition + 0.5 * direction);

    // update position of group
    ref.current.position.x = xPosition;
  });

  const [refItem, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]}>
        <mesh ref={ref} scale={[2, 2, 2]} position={[0,-50,0]}>
          <Model url={modelPath} />
        </mesh>
        <Html fullscreen portal={domContent}>
          <div ref={refItem} className="container">
            <h1 className="title">{children}</h1>
          </div>
        </Html>
      </group>
    </Section>
  );
};

const HTMLContent = ({
  domContent,
  children,
  bgColor,
  modelPath,
  position,
}) => {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.z -= 0.01;
    // rotate around z-plane
  });
  const [refItem, inView] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]}>
        <mesh ref={ref} scale={[2, 2, 2]}>
          <Model url={modelPath} />
        </mesh>
        <Html fullscreen portal={domContent}>
          <div ref={refItem} className="container">
            <h1 className="title">{children}</h1>
          </div>
        </Html>
      </group>
    </Section>
  );
};

function Loader() {
  const { active, progress } = useProgress();
  const transition = useTransition(active, {
    from: { opacity: 1, progress: 0 },
    leave: { opacity: 0 },
    update: { progress },
  });
  return transition(
    ({ progress, opacity }, active) =>
      active && (
        <a.div className="loading" style={{ opacity }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h1 style={{ marginBottom: 0, color: "white" }}>
              your best ui generator tool is loading
            </h1>
            <a.div className="loading-bar" style={{ width: progress }}></a.div>
          </div>
        </a.div>
      )
  );
}

export default function App() {
  const [events, setEvents] = useState();
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <>
      <Header />
      {/* R3F Canvas */}
      <Canvas
        concurrent
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}
      >
        {/* Lights Component */}
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent
            domContent={domContent}
            bgColor="#f15946"
            modelPath="/sceneTwo.gltf"
            position={250}
          >
            <span style={{ fontSize: "5rem" }}>Create mobile UI </span>
            <span style={{ fontSize: "5rem" }}>creating UI experience </span>
          </HTMLContent>
          <Screen
            domContent={domContent}
            bgColor="#2b2a2b"
            position={0}
            modelPath="/sceneOne.gltf"
          >
            <BlackScreen
              style={{ width: "100%", height: "100%", borderRadius: "50px" }}
            />
          </Screen>
          <HTMLContent
            domContent={domContent}
            bgColor="#571ec1"
            modelPath="/scene.gltf"
            position={-250}
          >
            <span style={{ fontSize: "5rem" }}>Shit... we even</span>
            <span style={{ fontSize: "5rem" }}>create web UI</span>
          </HTMLContent>
          {/* <HTMLContent
            domContent={domContent}
            bgColor="#636567"
            modelPath="/armchairGray.gltf"
            position={-250}
          >
            <span>And yes</span>
            <span>we even got</span>
            <span>monochrome!</span>
          </HTMLContent> */}
        </Suspense>
      </Canvas>
      <Loader />
      <div
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        {...events}
      >
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
}
