import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import DetailPage from "./pages/DetailPage";

import Sidebar from "./components/Sidebar";
import axios from "./utils/axiosInstance";
import "react-virtualized/styles.css";

const App: React.FC = () => {
  const [tags, setTags] = useState<any[]>([]);

  useEffect(() => {
    getTags();
  }, []);

  const getTags = () => {
    axios
      .get("/entry/tags")
      .then((res: any) => {
        setTags(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="app">
      <div className="layout">
        <Sidebar tags={tags} />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/report/:id">
            <ReportPage getTags={getTags} tags={tags}/>
          </Route>
          <Route path="/detail/:id">
            <DetailPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
