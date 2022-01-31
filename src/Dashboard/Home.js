import "../assest/css/home.css";
import Grid from "@material-ui/core/Grid";
import logo from "../assest/img/logo.png";
import nft1 from "../assest/img/NFT1.png";
import nft2 from "../assest/img/NFT2.png";
import nft3 from "../assest/img/NFT3.png";
import nft4 from "../assest/img/NFT4.png";
import Solana_logo from "../assest/img/Solana_logo.png";
import Vector from "../assest/img/Vector.png";
import Vector1 from "../assest/img/Vector1.png";

const Home = () => {
  return (
    <>
      <div className="container_home">
        <br />
        <br />
        <Grid container >
          <Grid item xs={6} md={4} lg={2} >
            <div className="logo_position">
            <img className="img_logo" src={logo} />
            </div>
          </Grid>
          <Grid item xs={6} md={4} lg={1}>
            <div className="text_wallet_tracker">WALLET TRACKER</div>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container   >
                  <div className="text_header_grp">
                    <div className="text_must_own">MUST OWN A</div>&nbsp;&nbsp;
                    <div className="text_lavish_whale">
                      LAVISH WHALE SOCITEY NFT
                    </div>
                    &nbsp;&nbsp;
                    <div className="text_to_access">TO ACCESS THE NFT</div>
                  </div>
                </Grid>
              </Grid>
              <br />
              <br />

              <Grid item xs={12}>
                  <div className="nft_grp">
                <Grid container >
                  <Grid item xs={12} sm={4} lg={4}>
                    <img className="img_nft" src={nft1} />
                    <img className="img_nft" src={nft2} />
                  </Grid>
                  <Grid item xs={12} sm={4} lg={3}>
                    <div className="text_terminal">TERMINAL</div>
                    <br />
                    <button className="btn_buy">BUY HERE</button>
                  </Grid>
                  <br />

                  <Grid item xs={12} sm={4} lg={4}>
                    <img className="img_nft" src={nft3} />
                    <img className="img_nft" src={nft4} />
                  </Grid>
                </Grid>
                  </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br /> <br /> <br />
        <div style={{ marginLeft: "5%" }}>
          <Grid container>
            <Grid item xs={12} md={8}   lg={6}>
              <div className="text_big_nft">THE NFT</div>
              <br />
              <div className="text_big_terminal">TERMINAL</div>
              <br />
              <div className="text_small_blockchain">
                Building the most powerful NFT investment tools on the Solana<br/>
               <span>Blockchain</span> 
              </div>
              <br />
              <br /> <br /> <br />
              <button className="connect_wallet">Connect Wallet</button>
              <br /> <br /> <br />
              <br /> <br /> <br />
            </Grid>
            <Grid item xs={12} md={4} lg={6} style={{ overflow: "hidden" }}>
              <div className="solona_grp">
                <img src={Solana_logo} width="45px" height="28px"></img>&nbsp;
                <span className="span_solana">Solana</span>&nbsp;&nbsp;
                <span className="span_sol">SOL</span>
                <div className="div_price">$ 66,623.50<img src={Vector1} width="19px" height="12px"/></div>
              </div>
              <img src={Vector}  className="img_vector"></img>&nbsp;
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <div className="text_powered">
                Powered by Lavish Whale Society
              </div>{" "}
            </Grid>
          </Grid>
          <br /> <br />
        </div>
      </div>
    </>
  );
};
export default Home;
