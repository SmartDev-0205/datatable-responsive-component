import React, { useEffect, useState, useMemo } from "react";

import tableData from "../assest/data/common";
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
// import Search from "@material-ui/icons/Search";
import { TailSpin } from "react-loader-spinner";
import "../assest/css/table.css";
import TopData from "./TopData";
import Header from "./Header";
import Home from "./Home";
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
  const [data, setData] = useState(tableData);
  const [category, setCategory] = useState(new Set());
  const [flag, setFlag] = useState("false");
  const [search, setSearch] = useState(data);
  const [select, setSelect] = useState(data);

  const handleSearchChange = (e) => {
    if (data.length === 0) return;
    const value = e.target.value;

    const newFilter = [...select].filter(
      (val) =>
        val.Item[1].toLowerCase().includes(value.toLowerCase()) ||
        String(val.Item[1]).toLowerCase().includes(value.toLowerCase())
    );

    setSearch(newFilter);
  };
  const handleSearchChange1 = (e) => {
    if (data.length === 0) return;
    const value = e.target.value;

    const newFilter = [...select].filter(
      (val) =>
        val.price.toLowerCase().includes(value.toLowerCase()) ||
        String(val.price).toLowerCase().includes(value.toLowerCase())
    );

    setSearch(newFilter);
  };
  const handleSearchChange2 = (e) => {
    if (data.length === 0) return;
    const value = e.target.value;

    const newFilter = [...select].filter(
      (val) =>
        val.time.toLowerCase().includes(value.toLowerCase()) ||
        String(val.time).toLowerCase().includes(value.toLowerCase())
    );

    setSearch(newFilter);
  };
  // useEffect(() => {
  //   if (data.length > 0) {
  //     let field = new Set();

  //     data.map((e) => field.add(e.category));
  //     setCategory(field);
  //   }
  // }, [data]);

  useEffect(() => {
    setFlag("true");
    setData(tableData);
    setTimeout(() => {
      setFlag("false");
    }, 700);
  }, [tableData]);
  const Rendering = () => {
    setFlag("true");
    setData(tableData);
    setTimeout(() => {
      setFlag("false");
    }, 700);
  };

  const columns = [
    {
      name: "Buyer",
      selector: ()=>{
        return "buyer"
      },
      cell: (selector, k) => [
        <select
          key = {k}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            fontSize: "18px",
          }}
        >
          {selector.buyer.map((data, key) => (
            <option key={key} style={{ color: "black" }}>{data}</option>
          ))}
        </select>
      ],
      sortable: true,
    },
    {
      name: "type",
      selector: ()=>{"type"},
      cell: (selector, k) => [
        <div key={k}>{selector.type}</div>
      ],
      sortable: true,
    },
    {
      name: "Item",
      selector: ()=>"Item",
      cell: selector => (
        <div style={{ display: "flex" }}>
          <img
            src={selector.Item[0]}
            width="35"
            height="35"
            className="avatar_img"
          />
          &nbsp; &nbsp;
          <span>{selector.Item[1]}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "price",
      selector: ()=>"price",
      cell: (selector, k) => [
        <div key={k}>{selector.price}</div>
      ],
      sortable: true,
    },
    {
      name: "time",
      selector: ()=>"time",
      cell: (selector, k) => [
        <div key={k}>{selector.time}</div>
      ],
      sortable: true,
    },
  ]
  return (
    <>
    <div className="container-dashboard" >
      <Home/>
      <br />
	<Header/>
	<br />

      <Grid container>
        {flag == "true" ? (
          <Grid item xs={12} md={6} className="table_left">
            <div
              className="spinnner"
           
            >
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
              style={{ background: "rgba(46, 44, 44, 0.682)", padding: "10px" }}
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
                      onChange={handleSearchChange}
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
                      onChange={handleSearchChange1}
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
                      onChange={handleSearchChange2}
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
                data={search}
                defaultSortField="title"
                sortIcon={<SortIcon />}
                pagination
                striped
                theme="solarized"
              />
            </Card>
          </Grid>
        )}
        <Grid item xs={12} md={2} lg={2}></Grid>
        <Grid item xs={12} md={4} lg={4} className="table_right">
          <TopData />
        </Grid>
      </Grid>
    </div>
    </>
  );
};
export default Table;
