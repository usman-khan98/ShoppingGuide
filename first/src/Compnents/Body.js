import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Rating from "./Rating";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "./features/productSlice";
import "./body.css";
import ClipLoader from "react-spinners/ClipLoader";
import toast, { Toaster } from 'react-hot-toast';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Body({ login, setLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var i = -1;
  const [sales, setSales] = useState([]);
  const [promo, setPromo] = useState([]);
  const [recomendations, setRecommendation] = useState([]);
  const [score, setScore] = useState([]);
  const [topProduct, setTopProduct] = useState({})
  const [loader, setLoading] = useState(false);

  async function getSales() {
    await fetch(`/getSales`, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        setSales(data);
      });
  }
  async function getPromo() {
    await fetch(`/getPromo`, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        setPromo(data);
      });
  }

  async function fetchProducts(products) {
    let product_details = [];
    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      await fetch(`/getRecProduct/${element}`, { mode: "cors" })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          product_details.push(data);
        });
    }
    for (let index = 0; index < product_details.length; index++) {
      const reviews = product_details[index].reviews;
      let query = { data: [] };
      if (reviews.length > 0) {
        query = await axios.post("/getSentimentScore", { data: reviews });
      }
      console.log(query.data);
      if (query.data) score.push(query.data.score);
    }
    setRecommendation(product_details);
  }

  async function getSuggestions() {
    let rec_products = [];
    if (!localStorage.getItem("Name")) {
      console.log("not logged in");
      await fetch(`/getSuggestions`, {
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          let array = data.slice(1, data.length - 3).split(",");
          for (let index = 0; index < array.length; index++) {
            var element = array[index].slice(1, array[index].length - 1);
            if (index > 0) {
              element = array[index].slice(2, array[index].length - 1);
            }
            rec_products.push(element);
          }
          console.log(rec_products);
          fetchProducts(rec_products);
        });
    } else {
      console.log(localStorage.getItem("Name"));
      await fetch(`/getSuggestions/${localStorage.getItem("Name")}`, {
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          let array = data.slice(1, data.length - 3).split(",");
          for (let index = 0; index < array.length; index++) {
            var element = array[index].slice(1, array[index].length - 1);
            if (index > 0) {
              element = array[index].slice(2, array[index].length - 1);
            }
            rec_products.push(element);
          }
          console.log(rec_products);
          fetchProducts(rec_products);
        });
    }
  }

  async function getTopProduct() {
    await fetch(`/getTopProduct`, {
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.topProduct);
        setTopProduct(data.topProduct)
      });
  }

  useEffect(async () => {
    getSales();
    getPromo();
    getSuggestions();
    getTopProduct();
  }, recomendations);

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function navigateDetail(sale) {
    navigate("saleDetail", { state: sale });
  }

  return (
    <div style={{ margin: "0px" }}>
      <div class="row" style={{ textAlign: "center", display: "flex" }}>
        <div class="col-2" style={{ minWidth: "50%" }}>
          <h1 style={{ color: "#0303039e" }}>
            Find Products <br />
            Instantly!
          </h1>
          <p>
            Get the best deals on products across the web all in one place,
            easily <br />
            using our search engine.
          </p>
          <a href="#" target="_blank" rel="noopener noreferrer" class="btn">
            Explore Now &#8594;
          </a>
        </div>
      </div>
      <br />
      <Box sx={{ bgcolor: "background.paper", margin: "auto" }}>
        <AppBar position="static">
          <Tabs
            style={{ backgroundColor: "#F03200" }}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Sales and Offers" {...a11yProps(0)} />
            <Tab label="Promo Code Available" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div style={{ margin: "15px" }}>
              <Container maxWidth="xl">
                <Box
                  sx={{
                    height: "-max-content",
                    padding: "25px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "35px",
                      justifyContent: "center",
                    }}
                  >
                    {sales.map((sale) => (
                      <Card sx={{ maxWidth: 450 }} style={{ width: "300px", height: 'max-content' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="5"
                            image="https://source.unsplash.com/random/?computer/"
                            // image="https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGlzY291bnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                            alt="sales"
                            className="image"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              style={{ fontWeight: "bold" }}
                            >
                              {sale.title}
                            </Typography>
                            <Typography
                              variant="h4"
                              color="green"
                              style={{ fontWieght: "bold" }}
                            >
                              {sale.discount_per}%Off
                            </Typography>
                            <Typography
                              variant="h5"
                              color="grey"
                              style={{ fontStyle: "italic" }}
                            >
                              {localStorage.getItem("SellerStore")}
                            </Typography>
                            <Button
                              variant="contained"
                              style={{ backgroundColor: "orange" }}
                              onClick={() => {
                                navigateDetail(sale);
                              }}
                            >
                              Visit Sale
                            </Button>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    ))}
                  </div>
                </Box>
              </Container>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div style={{ margin: "15px" }}>
              <Container maxWidth="xl">
                <Box
                  sx={{
                    height: "-max-content",
                    padding: "25px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "",
                      gap: "15px",
                      justifyContent: "center",
                    }}
                  >
                    {promo.map((sale) => (
                      <div>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar style={{ width: "75px" }}>
                            <Avatar
                              style={{ width: "50px", height: "50px" }}
                              alt="Remy Sharp"
                              src="https://source.unsplash.com/random/?discount/"
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={sale.title}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="p"
                                  variant="body2"
                                  color="text.primary"
                                  fontWeight="bold"
                                >
                                  Grab {sale.discount_per}% off on All Products
                                  <br />
                                </Typography>
                                Enter -- Code: {sale.code}
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </div>
                    ))}
                  </div>
                </Box>
              </Container>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>

      <div class="offer" style={{ backgroundColor: "black" }}>
        <div class="small-container">
          <div class="row">
            <div class="col-2">
              <img
                src={topProduct.image}
                alt=""
                style={{width: '450px', height: '350px', borderradius: '15px'}}
              />
            </div>
            <div class="col-2">
              <p style={{ color: 'white'}}>Top Selling Product</p>
              <h3 style={{ color: "white", fontWeight: 'bold' }}>{topProduct.name}</h3>
              <small style={{ color: 'white'}}>
                {
                  topProduct.name + " " + topProduct.description
                }
              </small>
              <br />
              <a href="#" class="btn" onClick={()=>{
                let product = {
                  product: topProduct.name,
                  image: topProduct.image,
                  price: {
                    actual: 0,
                    discount: parseInt(topProduct.price)
                  },
                  seller: topProduct.seller
                }
                if (!login) {
                  navigate("/login");
                } else {
                  dispatch(addToCart(product));
                  toast('Added to Cart')
                }
              }}>
                Buy Now &#8594;
              </a>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            backgroundColor: '#2d9632',
            padding: '5px',
            color: 'white',
            width: '250px',
            height: '40px',
            left: 15,
            top: 1000
          },
        }}
      />
      <div class="small-container">
        <h2>Featured Products</h2>
        <div class="row">
          {recomendations.length === 0 ?
            <div style={{ height: "calc(80vh)", display: "flex", textAlign: "center", flex:1, alignItems: "center", justifyContent: "center"}}>
              <ClipLoader size={150} cssOverride={{'borderWidth': 8}} color={"red"} loading={true}   />
            </div>
             :
            <>
              {recomendations.map((element) => (
                  <div class="col-4">
                    <a href="product_details.html">
                      <img className="proImg" src={element.image} alt="" />
                    </a>
                    <a href="product_details.html">
                      <h4 className="productName">{element.name}</h4>
                    </a>
                    <p>{element.price}</p>
                    <Rating value={score.length > 0 ? score[i++] : ""} />
                    <br />
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "orange",
                        width: "max-content",
                        padding: "5px",
                      }}
                      onClick={async () => {
                        navigate("/loading", { state: { load: true } });
                        navigate("/result/productHub", {
                          state: {
                            item: JSON.stringify(element),
                            prod: element,
                          },
                        });
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                ))
              } 
            </>
          }
        </div>
      </div>

      <div class="brands">
        <div class="small-container">
          <div class="row">
            <div class="col-5">
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </div>

            <div class="col-5">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmZuFCoAWQRxgjlqezPmcw3a5uG8cq9hGjHw&usqp=CAU"
                alt=""
              />
            </div>

            <div class="col-5">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMEiZSGO3apZykHuuKLFWLhMjLwtVyHiEc8Q&usqp=CAU"
                alt=""
              />
            </div>

            <div class="col-5">
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </div>

            <div class="col-5">
              <img
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
