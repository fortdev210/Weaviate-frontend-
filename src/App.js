import React, { useState, useEffect } from "react";
import "./App.css";
import Accordian from "./components/Accordian";
import Header from "./components/Header";
import { BallBeat } from "react-pure-loaders";
const weaviate = require("weaviate-client");

function App() {
  const client = weaviate.client({
    scheme: "https",
    host: "demo.dataset.playground.semi.technology",
  });

  const [data, setData] = useState([]);
  const [publication, setPublication] = useState([]);
  const [category, setCategory] = useState([]);
  const [selpublication, setSelpublication] = useState("");
  const [selcategory, setSelcategory] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchData = () => {
    setLoading(true);
    client.graphql
      .get()
      .withClassName("Article")
      .withFields(
        "summary title url publicationDate wordCount HasAuthors{ ... on Author {name}} InPublication {... on Publication {name}} OfCategory {... on Category {name}}"
      )
      .do()
      .then((res) => {
        console.log(res);
        setData(res.data.Get.Things.Article);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const filterData = (searchVal) => {
    setLoading(true);
    client.graphql
      .get()
      .withClassName("Article")
      .withFields(
        "title url summary wordCount InPublication {... on Publication {name}}"
      )
      .withExplore({
        concepts: [searchVal],
      })
      .do()
      .then((res) => {
        setData(res.data.Get.Things.Article);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const filterCategory = () => {
    client.graphql
      .get()
      .withClassName("Category")
      .withFields("name")
      .do()
      .then((res) => {
        setCategory(res.data.Get.Things.Category);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const filterPublication = () => {
    client.graphql
      .get()
      .withClassName("Publication")
      .withFields("name")
      .do()
      .then((res) => {
        setPublication(res.data.Get.Things.Publication);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onPubChange = (val) => {
    setSelpublication(val);
  };

  const onCatChange = (val) => {
    setSelcategory(val);
  };

  useEffect(() => {
    filterCategory();
    filterPublication();
  }, []);

  return (
    <div>
      <Header
        fetch={fetchData}
        filter={filterData}
        publication={publication}
        category={category}
        onPubChange={onPubChange}
        onCatChange={onCatChange}
      />
      <div className="BallBeat">
        <BallBeat color={"#123abc"} loading={loading} />
      </div>
      <div className="App container">
        {data &&
          !loading &&
          data.error == null &&
          data.map((element, index) => {
            if (selpublication && selcategory !== "All") {
              if (element.InPublication[0].name !== selpublication) return;
            }
            return (
              <Accordian
                key={index}
                title={element.title}
                content={element.summary}
                url={element.url}
                publicationDate={element.publicationDate}
                wordCount={element.wordCount}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
