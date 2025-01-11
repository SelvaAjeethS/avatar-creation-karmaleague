"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

export default function PreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const avatarUrl = searchParams.get("url");

  if (!avatarUrl) {
    alert("No Avatar URL provided!");
    router.push("/"); // Redirect back to home
    return null;
  }

  function Model() {
    const { scene } = useGLTF(avatarUrl); // Load the .glb file
    return <primitive object={scene} scale={2} />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#151517",
        color: "#c8c7cc",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Avatar Preview</h1>
      <div
        style={{
          width: "80%",
          height: "70vh",
          border: "2px solid #444",
          borderRadius: "10px",
        }}
      >
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <Model />
          <OrbitControls />
        </Canvas>
      </div>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#029ef2",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => router.push("/")}
      >
        Back to Home
      </button>
    </div>
  );
}
