import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CreateEntry } from "./Entry";
import "./searchResultCss.css";
import axios, { Axios } from "axios";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import { unstable_batchedUpdates } from "react-dom"; //used to handle multiple setStates at once //unstable_batchUpdates()

//drawer imports
import Box from "@mui/material/Box";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

//filter imports
import Slider from "@mui/material/Slider";
import AdjustIcon from "@mui/icons-material/Adjust";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import SortIcon from "@mui/icons-material/Sort";
import MuiInput from "@mui/material/Input";
import { styled } from "@mui/material/styles";

export default function() {
  const location = useLocation();
  const [home, setHome] = useState([JSON.parse(location.state.homeshopping)]);
  const [daraz, setDaraz] = useState([JSON.parse(location.state.daraz)]);
  const [mega, setMega] = useState([JSON.parse(location.state.mega)]);

  const [data, setData] = useState([]);
  const [value, setValue] = React.useState(0); //slider value control
  const [Products, setProducts] = useState([]);
  const [state, setState] = useState({ filter: false });
  const navigate = useNavigate();

  var dataHome = [];
  var dataDaraz = [];
  var dataMega = [];

  //slider functions
  const Input = styled(MuiInput)`
    width: 42px;
  `;

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  ///
  const handleWeb = () =>
    unstable_batchedUpdates(() => {
      setHome(dataHome);
      setDaraz(dataDaraz);
      setMega(dataMega);
    });

  useEffect(async (e) => {
    console.log("Search Result in 15: ", location.state.products);
    const recieveResult = await axios.post("/send/result", {
      searchResult: location.state.products,
    });
    console.log(recieveResult);
    if (recieveResult.data.length > 0) {
      handleData(recieveResult.data);
    }

    dataHome.push(JSON.parse(location.state.homeshopping));
    dataDaraz.push(JSON.parse(location.state.daraz));
    dataMega.push(JSON.parse(location.state.mega));
    handleWeb(dataHome, dataDaraz, dataMega);

    console.log(handleWeb);
    
    sortProducts();
  }, []);

  console.log("Data local", data);
  console.log("Data local type:", typeof data);

  console.log("Online home length........", home.length);
  console.log("Online data home........", home);

  console.log("Online daraz length........", daraz.length);
  console.log("Online data daraz ........", daraz);

  console.log("Online mega length........", mega.length);
  console.log("Online data mega........", mega);

  //drawer functions

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem style={{ gap: "15x" }}>
          <ListItemIcon>
            <AdjustIcon />
          </ListItemIcon>
          <ListItemText primary={"Price Range"} />
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100000,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
            style={{ padding: "10px" }}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Button
            onClick={() => {
              sortLowHigh();
            }}
          >
            <ListItemIcon>
              <SortIcon />
            </ListItemIcon>
            <ListItemText primary={"Sort Price Low to High"} />
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button
            onClick={() => {
              sortHighLow();
            }}
          >
            <ListItemIcon>
              <SortIcon />
            </ListItemIcon>
            <ListItemText primary={"Sort Price High to Low"} />
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button
            onClick={() => {
              sortAZ();
            }}
          >
            <ListItemIcon>
              <SortByAlphaIcon />
            </ListItemIcon>
            <ListItemText primary={"Sort A-Z"} />
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button
            onClick={() => {
              sortZA();
            }}
          >
            <ListItemIcon>
              <SortByAlphaIcon />
            </ListItemIcon>
            <ListItemText primary={"Sort Z-A"} />
          </Button>
        </ListItem>
      </List>
    </Box>
  );
  //drawer functions end

  return (
    <div>
      <div>
        {["filter"].map((
          anchor //filter drawer
        ) => (
          <React.Fragment key={anchor}>
            <Button
              startIcon={<FilterAltIcon></FilterAltIcon>}
              variant="outlined"
              onClick={toggleDrawer(anchor, true)}
              style={{
                backgroundColor: "white",
                marginTop: "1%",
                right: "45%",
              }}
            >
              {anchor}
            </Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
      <h1>
        <span>Search Results</span>
      </h1>
      <Grid container spacing={2} justify="center">
        {data !== null && data.length > 0 ? (
          <>
            <dl className="dictionary">
              {data.map((Product, index) => {
                return (
                  <a
                    onClick={async () => {
                      navigate("/loading", { state: { load: true } });
                      navigate("/result/productHub", {
                        state: {
                          item: JSON.stringify(Product),
                          prod: Product,
                        },
                      });
                    }}
                    key={index}
                  >
                    <Grid item style={{ marginBottom: 50, marginTop: 50 }}>
                      <Paper className="product" elevation={3}>
                        <div className="productDiv">
                          <img
                            src={Product.image}
                            alt="Product"
                            className="image"
                          />
                        </div>
                        <h4
                          style={{
                            fontSize: "large",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            margin: 10,
                            height: "40px",
                          }}
                        >
                          {" "}
                          {Product.name}{" "}
                        </h4>
                        <h3 style={{ paddingBottom: 10 }}>
                          <b>Rs: {Product.price}</b>
                        </h3>
                      </Paper>
                    </Grid>
                  </a>
                );
              })}
            </dl>
            <hr style={{ width: "inherit", color: "black", margin: 60 }}></hr>
          </>
        ) : (
          <hr style={{ width: "inherit", color: "black", margin: 60 }}></hr>
        )}
        <br></br>
        {home !== null &&
        daraz !== null &&
        mega !== null &&
        dataHome !== null &&
        dataDaraz !== null &&
        dataMega !== null &&
        home.length > 0 &&
        daraz.length > 0 &&
        mega.length > 0 &&
        Products.length > 0 ? (
          <dl className="dictionary">
            {Products.map((Product, index) => {
              return (
                <a
                  onClick={async () => {
                    navigate("/loading", { state: { load: true } });
                    const query = await axios.post("/ProductDetails", Product);
                    console.log("Sr here....", query.data);
                    navigate("/result/productDetail", {
                      state: {
                        item: JSON.stringify(query.data),
                        prod: Product,
                      },
                    });
                  }}
                  key={index}
                >
                  <Grid item style={{ marginBottom: 50, marginTop: 50 }}>
                    <Paper className="product" elevation={3}>
                      <div className="productDiv">
                        <img
                          src={Product.image}
                          alt="Product"
                          className="image"
                        />
                      </div>
                      <h4
                        style={{
                          fontSize: "large",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          margin: 10,
                          height: "40px",
                        }}
                      >
                        {" "}
                        {Product.name}{" "}
                      </h4>
                      <h3 style={{ paddingBottom: 10 }}>
                        <b>Rs: {Product.price}</b>
                      </h3>
                    </Paper>
                  </Grid>
                </a>
              );
            })}
          </dl>
        ) : (
          <Grid
            justify="center"
            style={{ margin: "auto", paddingBottom: 200, paddingTop: 50 }}
          >
            <h4>No Online products found</h4>
          </Grid>
        )}
      </Grid>
    </div>
  );

  function handleData(d) {
    setData(d);
  }


  function sortProducts() {
    let sorted = [];
    for (let i = 0; i < home[0].ProductNames.length; i++) {
      let p = home[0].ProductPrices[i];
      let element = {
        name: home[0].ProductNames[i],
        image: home[0].ProductImages[i],
        price: parseFloat(home[0].ProductPrices[i].slice(3).replace(/,/g, "")), // "Rs 26,499"
        url: home[0].ProductUrl[i],
        store: "HomeShopping.pk",
        reviews: [],
      };
      sorted.push(element);
    }
    for (let i = 0; i < daraz[0].ProductNames.length; i++) {
      let p = daraz[0].ProductPrices[i];
      p = p.replace("Rs.", "").replace(",", ""); //  "Rs. 6,180"
      let element = {
        name: daraz[0].ProductNames[i],
        image: daraz[0].ProductImages[i],
        price: parseFloat(p),
        url: daraz[0].ProductUrl[i],
        store: "Daraz.pk",
        reviews: [],
      };
      sorted.push(element);
    }
    for (let i = 0; i < mega[0].ProductNames.length; i++) {
      let p = mega[0].ProductPrices[i];
      p = p
        .replace("PKR", "")
        .replace("-", "")
        .replace(",", ""); // "8,199 - PKR"
      let element = {
        name: mega[0].ProductNames[i],
        image: mega[0].ProductImages[i],
        price: parseFloat(p),
        url: mega[0].ProductUrl[i],
        store: "Mega.pk",
        reviews: [],
      };
      sorted.push(element);
    }
    console.log(sorted);
    setProducts(sorted);
  }

  async function sortLowHigh() {
    const postLH = await axios.post("/AddSort", { data: Products });
    const getLH = await axios.get("/getSortLH");
    setProducts(getLH.data);
  }

  async function sortHighLow() {
    const postLH = await axios.post("/AddSort", { data: Products });
    const getHL = await axios.get("/getSortHL");
    setProducts(getHL.data);
  }

  async function sortAZ() {
    const postLH = await axios.post("/AddSort", { data: Products });
    const getLH = await axios.get("/getSortAZ");
    setProducts(getLH.data);
  }

  async function sortZA() {
    const postLH = await axios.post("/AddSort", { data: Products });
    const getLH = await axios.get("/getSortZA");
    setProducts(getLH.data);
  }
}
