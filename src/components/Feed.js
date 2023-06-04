import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Sanityclient } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { SearchQuery } from "../util.js/data";
import { feedQuery } from "../util.js/data";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { categoryID } = useParams();
  const [pins, setPins] = useState();

  useEffect(() => {
    setLoading(true);

    if (categoryID) {
      const query = SearchQuery(categoryID);

      Sanityclient.fetch(query).then((data) => {
        setPins(data);

        console.log(data);
        setLoading(false);
      });
    } else {
      Sanityclient.fetch(feedQuery).then((data) => {
        setPins(data);
        console.log(data);
        setLoading(false);
      });
    }
  }, [categoryID]);

  if (loading)
    return <Spinner message=" We are adding new ideas to your Feed" />;

  console.log("pins", pins);

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
