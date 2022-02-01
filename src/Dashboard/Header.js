import React, { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import "../assest/css/header.css";
import WhaleFeed from "../assest/mockup/whalefeed.json";

export default function Header() {


  const [data, setData] = useState({
    inited: false,
    provider: [],
    count: 0,
    item: "",
    price: "",
    time: "",
    rand:0,
    


  });
  const [time, setTime] = useState(+new Date());
  const requestData = async () => {
    const limit = 10;
    const filteredData = [];
 
   
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
      data.count = 0;
    } else {
      data.count++;
    }
    let start = data.count * limit;
    const end = start + limit;
    const tmp = filteredData.slice(start, end);
    let min = 1;
    let max = 8;
    let rndNum=Math.round(min + Math.random() * (max - min)) 
    setData({ ...data, inited: true, count: data.count, provider: tmp, rand:rndNum});
    setTime(+new Date());
  };
  useEffect(() => {
    requestData();
  }, []);
  useEffect(() => {
    /* requestData(); */
    const timer = setTimeout(requestData, 3000);
    return () => clearTimeout(timer);
  }, [time]);
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          <div className="header_div_grp">
            <img
              className="header_img"
              src={data.provider[data.rand]?.item[0]}
            ></img>
            <div>
              <div className="div_name">{data.provider[data.rand]?.item[1]}</div>
              <div className="div_price">{data.provider[data.rand]?.price.slice(0,6)+"..."}</div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div className="header_div_grp">
            <img className="header_img" src={data.provider[data.rand+1]?.item[0]}></img>
            <div>
              <div className="div_name">{data.provider[data.rand+1]?.item[1]}</div>
              <div className="div_price">{data.provider[data.rand+1]?.price.slice(0,6)+"..."}</div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div className="header_div_grp">
            <img className="header_img" src={data.provider[data.rand+2]?.item[0]}></img>
            <div>
              <div className="div_name">{data.provider[data.rand+2]?.item[1]}</div>
              <div className="div_price">{data.provider[data.rand+2]?.price.slice(0,6)+"..."}</div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div className="header_div_grp">
            <img className="header_img" src={data.provider[data.rand+3]?.item[0]}></img>
            <div>
              <div className="div_name">{data.provider[data.rand+3]?.item[1]}</div>
              <div className="div_price">{data.provider[data.rand+3]?.price.slice(0,6)+"..."}</div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
