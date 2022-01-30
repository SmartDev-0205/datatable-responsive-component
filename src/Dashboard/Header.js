import React, { useEffect, useState, useMemo } from "react";

import Grid from "@material-ui/core/Grid";
import "../assest/css/header.css";
import headerData from "../assest/data/header";

export default function Header() {
  // 0xd04d8cd4581b5D31D39dedfF7EB22aFd04C4aF1f
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          <div className="header_div_grp">
            <img className="header_img" src={headerData[0].Item[0]}></img>
            <div>
              <div className="div_name">{headerData[0].Item[1]}</div>
              <div className="div_price">{headerData[0].price}</div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div className="header_div_grp">
            <img
              className="header_img"
              src={headerData[1].Item[0]}
            ></img>
            <div>
              <div className="div_name">{headerData[1].Item[1]}</div>
              <div className="div_price">{headerData[1].price}</div>
            </div>
          </div>
        </Grid>
        <Grid  item xs={12} sm={6} md={3}>
          <div className="header_div_grp">
            <img
              className="header_img"
              src={headerData[2].Item[0]}
            ></img>
            <div>
              <div className="div_name">{headerData[2].Item[1]}</div>
              <div className="div_price">{headerData[2].price}</div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div className="header_div_grp">
            <img
              className="header_img"
              src={headerData[3].Item[0]}
            ></img>
            <div>
              <div className="div_name">{headerData[3].Item[1]}</div>
              <div className="div_price">{headerData[3].price}</div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
