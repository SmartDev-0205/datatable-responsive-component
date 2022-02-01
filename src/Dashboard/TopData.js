import React, { useEffect, useState } from "react";

import DataTable, { createTheme } from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import Button from "@material-ui/core/Button";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { Grid } from "@material-ui/core";
import { TailSpin } from "react-loader-spinner";
import "../assest/css/table.css";
import WhaleFeed from "../assest/mockup/whalefeed.json";

createTheme("solarized", {
  text: {
    primary: "white",
    secondary: "white",
  },
  background: {
    default: "rgba(46, 44, 44, 0.682)",
  },
  context: {
    text: "black",
  },

  sortFocus: {
    default: "white",
  },
});
const TopData = () => {
  const [data, setData] = useState({
    inited:false,
    provider: [],
    count: 0,
    item: "",
    price: "",
    time: "",
  });
  const [time, setTime] = useState(+new Date());
  const [flag, setFlag] = useState("false");
  const requestData = async () => {
    const limit = 10;
    const filteredData = [];
    let regexpItem = data.item && new RegExp(data.item, 'i');
    let regexpPrice = data.price && new RegExp(data.price, 'i');
    let regexpTime = data.time && new RegExp(data.time, 'i');
    for (let i of WhaleFeed) {
      if (regexpItem && i.item[1].match(regexpItem) === null) continue;
      if (regexpPrice && i.price.match(regexpPrice) === null) continue;
      if (regexpTime && i.time.match(regexpTime) === null) continue;
      filteredData.push(i);
    }

    if (data.count * limit > filteredData.length - 10) {
      data.count = 0;
    } else {
      data.count++;
    }
    let start = data.count * limit;
    const end = start + limit;
    const tmp = filteredData.slice(1, 20);
    setData({ ...data, inited:true, count: data.count, provider: tmp });
    setTime(+new Date());
  };
  useEffect(() => {
    if (data.inited===false) {
      requestData();
    } else {
      const timer = setTimeout(requestData, 10000);
      return () => clearTimeout(timer);
    }
  }, [time]);


  const Rendering = () => {
    setFlag("true");
    requestData();
    setTimeout(() => {
      setFlag("false");
    }, 700);
  };

  const columns = [
    {
      selector: () => "item",
      cell: (selector) => (
        <img
          src={selector.item[0]}
          width="35"
          height="35"
          className="avatar_img"
        />
      ),
      sortable: true,
    },
    {
      selector: () => "buyer",
      cell: (selector, k) => [<div key={k}>{selector.buyer[0]}</div>],
      sortable: true,
    },
    {
      selector: () => "price",
      cell: (selector, k) => [<div key={k}>{selector.price}</div>],
      sortable: true,
    },
  ];
  return (
    <>
      {flag == "true" ? (
        <div className="spinnner1">
          <TailSpin heigth="100" width="100" color="blue" ariaLabel="loading" />
        </div>
      ) : (
        <Card
          style={{ background: "rgba(46, 44, 44, 0.682)", padding: "10px" }}
        >
          <br />

          <Grid container spacing={3} className="table_header">
            <Grid item xs={12}>
              <span className="logo_text">Biggest Whales</span>
              <br />
              <span className="logo_text1">SOL spent in the last 14 days</span>
              &nbsp; &nbsp; &nbsp;
              <Button onClick={Rendering} className="search_btn_load">
                <AutorenewIcon />
              </Button>
            </Grid>
          </Grid>
          <DataTable
            columns={columns}
            data={data.provider}
            defaultSortField="title"
            sortIcon={<SortIcon />}
            pagination
            striped
            theme="solarized"
          />
        </Card>
      )}
    </>
  );
};
export default TopData;
