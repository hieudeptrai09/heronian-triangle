"use client";

import { useState } from "react";
import { AppHeader } from "./components/layout/AppHeader";
import { AppFooter } from "./components/layout/AppFooter";
import { TabBar, Tab } from "./components/layout/Tabbar";
import { PythagoreanTab } from "./components/pythagorean/PythagoreanTab";
import { HeronianTab } from "./components/heronian/HeronianTab";
import { AltitudeTab } from "./components/altitude/AltitudeTab";
import { DisplayTab } from "./components/display/DisplayTab";
import { TriangleProvider } from "./lib/TriangleContext";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("pythagorean");

  return (
    <TriangleProvider onShow={() => setActiveTab("display")}>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
        <AppHeader />
        <TabBar activeTab={activeTab} onChange={setActiveTab} />
        <main className="flex-1 px-4 sm:px-8 py-8 sm:py-12">
          <div className={activeTab === "pythagorean" ? "" : "hidden"}>
            <PythagoreanTab />
          </div>
          <div className={activeTab === "heronian" ? "" : "hidden"}>
            <HeronianTab />
          </div>
          <div className={activeTab === "altitude" ? "" : "hidden"}>
            <AltitudeTab />
          </div>
          <div className={activeTab === "display" ? "" : "hidden"}>
            <DisplayTab />
          </div>
        </main>
        <AppFooter />
      </div>
    </TriangleProvider>
  );
}
