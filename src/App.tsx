import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import DataForm from "./DataForm";
import { RecoilRoot } from "recoil";
import DataList from "./components/DataList";
import ScatterPlot2d from "./components/ScatterPlot2d";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <RecoilRoot>
      <main className="main">
        <Layout
          drawer={
            <>
              <DataForm />
              <DataList />
            </>
          }
          main={<Dashboard />}
        />
      </main>
    </RecoilRoot>
  );
}

export default App;
