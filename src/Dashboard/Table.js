import React, { useEffect, useState, useMemo } from "react";

import DataTable, { createTheme } from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import Button from "@material-ui/core/Button";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import {
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { TailSpin } from "react-loader-spinner";
import "../assest/css/table.css";
import TopData from "./TopData";
import Header from "./Header";
import Home from "./Home";

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
const Table = () => {
  const [data, setData] = useState({
    inited: false,
    provider: [],
    count: 0,
    item: "",
    price: "",
    time: "",
  });

  const [time, setTime] = useState(+new Date());
  const [flag, setFlag] = useState("false");

  const onFilter = (field) => (e) => {
    setData({ ...data, inited: false, [field]: e.target.value });
  };

  const requestData = async () => {
    const limit = 1;
    const filteredData = [];
    const sortData=[];
    let regexpItem = data.item && new RegExp(data.item, "i");
    let regexpPrice = data.price && new RegExp(data.price, "i");
    let regexpTime = data.time && new RegExp(data.time, "i");
    for (let i of WhaleFeed) {
      if (regexpItem && i.item[1].match(regexpItem) === null) continue;
      if (regexpPrice && i.price.match(regexpPrice) === null) continue;
      if (regexpTime && i.time.match(regexpTime) === null) continue;
      filteredData.push(i);
    }

    if (data.count * limit > filteredData.length - 10) {
      data.count = 30;
    } else {
      data.count++;
    }
    let start = data.count * limit;
    const end = start + limit;
    sortData.push(filteredData.sort((a,b) => a.time - b.time));
    const tmp = sortData[0].slice(0, end);
    setData({ ...data, inited: true, count: data.count, provider: tmp });
    setTime(+new Date());
  };

  useEffect(() => {
    if (data.inited === false) {
      requestData();
    } else {
      const timer = setTimeout(requestData, 1000);
      return () => clearTimeout(timer);
    }
  }, [time, data.item, data.price, data.time]);

  const Rendering = () => {
    setFlag("true");
    requestData();
    setTimeout(() => {
      setFlag("false");
    }, 700);
  };

  const columns = [
    {
      name: "Buyer",
      selector: () => {
        return "buyer";
      },
      cell: (selector, k) => [<div key={k}>{selector.buyer}</div>],

      // sortable: true,
    },
    {
      name: "type",
      selector: () => {
        "type";
      },
      cell: (selector, k) => [<div key={k}>{selector.type}</div>],
      // sortable: true,
    },
    {
      name: "Item",
      selector: () => "item",
      cell: (selector) => (
        <div style={{ display: "flex" }}>
          <img
            src={selector.item[0]}
            width="35"
            height="35"
            className="avatar_img"
          />
          &nbsp; &nbsp;
          <span>{selector.item[1]}</span>
        </div>
      ),
      // sortable: true,
    },
    {
      name: "price",
      selector: () => "price",
      cell: (selector, k) => [<div key={k}>{selector.price}</div>],
      // sortable: true,
    },
    {
      name: "time",
      selector: "time",
      sortable: true,
    },
  ];
  return (
    <>
      <Home />
      <br />
      <Header />
      <br />
      <Grid container>
        {flag == "true" ? (
          <Grid item xs={12} md={6} className="table_left">
            <div className="spinnner">
              <TailSpin
                heigth="100"
                width="100"
                color="blue"
                ariaLabel="loading"
              />
            </div>
          </Grid>
        ) : (
          <Grid item xs={12} md={6} lg={6} className="table_left">
            <Card
              style={{
                background: "rgba(46, 44, 44, 0.682)",
                padding: "10px",
              }}
            >
              <br />

              <Grid container spacing={3} className="table_header">
                <Grid item item xs={12} sm={12} lg={4}>
                  <span className="logo_text">Recent Whale Purcase</span>
                </Grid>
                <Grid item item xs={6} sm={3} lg={2}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel htmlFor="searchByName" className="search-label">
                      Item
                    </InputLabel>
                    <OutlinedInput
                      onChange={onFilter("item")}
                      id="searchByName"
                      className="searchByName"
                      labelWidth={60}
                    />
                  </FormControl>
                </Grid>
                <Grid item item xs={6} sm={3} lg={2}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel htmlFor="searchByName" className="search-label">
                      Price
                    </InputLabel>
                    <OutlinedInput
                      onChange={onFilter("price")}
                      id="searchByName"
                      className="searchByName"
                      labelWidth={60}
                    />
                  </FormControl>
                </Grid>
                <Grid item item xs={6} sm={3} lg={2}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel htmlFor="searchByName" className="search-label">
                      List
                    </InputLabel>
                    <OutlinedInput
                      onChange={onFilter("time")}
                      id="searchByName"
                      className="searchByName"
                      labelWidth={60}
                    />
                  </FormControl>
                </Grid>
                <Grid item item xs={6} sm={3} lg={3} lg={2}>
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
                defaultSortAsc={true}
              />
            </Card>
          </Grid>
        )}
        <Grid item xs={12} md={2} lg={2}></Grid>
        <Grid item xs={12} md={4} lg={4} className="table_right">
          <TopData />
        </Grid>
      </Grid>
    </>
  );
};
export default Table;
