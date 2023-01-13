import React, { useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import TextField from "@mui/material/TextField";
import "./sellerDashboard.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MasksIcon from "@mui/icons-material/Masks";
import CategoryIcon from "@mui/icons-material/Category";
import { IconButton } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Button from "@mui/material/Button";

export default function SellerInputs() {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");

  async function addProduct() {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "e-commerce");
    console.log(formData);
    const imageData = await axios.post(
      "https://api.cloudinary.com/v1_1/shopping-fyp/image/upload",
      formData
    );
    console.log("Image Data", imageData.data.url);
    // console.log(name, email, address, phone, city, password, file);
    const object = {
      name: title,
      description: des,
      price: price,
      category: category,
      brand: brand,
      seller: localStorage.getItem("SellerEmail"),
      image: imageData.data.url,
    };
    console.log(object);
    await fetch("/addProduct", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        object,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          toast(data.message);
        }
      });
  }

  if (!(title && des && price && brand && category && file)) {
    toast('Please Fill All Fields')
  }

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <div style={{ display: "flex", margin: "10px" }}>
      <form action="" style={{ padding: "25px", gap: "10px" }}>
        <div className="delInp">
          <TitleOutlinedIcon className="icon" />
          <TextField
            id="fullwidth"
            label="Product Title"
            placeholder="Enter Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            style={{
              textAlign: "center",
              justifyContent: "center",
              width: "500px",
            }}
          />
        </div>
        <div className="delInp">
          <DescriptionIcon className="icon" />
          <TextField
            id="outlined-name fullwidth"
            label="des"
            placeholder="Enter Descrip"
            value={des}
            type="email"
            onChange={(e) => {
              setDes(e.target.value);
            }}
            style={{
              textAlign: "center",
              justifyContent: "center",
              width: "500px",
            }}
          />
        </div>
        <div className="delInp">
          <LocalAtmOutlinedIcon className="icon" />
          <TextField
            id="outlined-name fullwidth"
            label="Price"
            placeholder="Enter Product Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            style={{
              textAlign: "center",
              justifyContent: "center",
              width: "500px",
            }}
          />
        </div>
        <div className="delInp">
          <CategoryIcon className="icon" />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Product Category"
            placeholder="Select Category"
            onChange={handleChange}
            style={{
              textAlign: "center",
              justifyContent: "center",
              width: "500px",
            }}
          >
            <MenuItem value={"mobile"}>Mobile Phone</MenuItem>
            <MenuItem value={"laptop"}>Laptops</MenuItem>
            <MenuItem value={"computer"}>Computers</MenuItem>
            <MenuItem value={"camera"}>Camera</MenuItem>
            <MenuItem value={"watches"}>Watches</MenuItem>
          </Select>
        </div>
        <div className="delInp">
          <MasksIcon className="icon" />
          <TextField
            id="outlined-name fullwidth"
            label="Brand"
            placeholder="Enter Product Brand"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
            style={{
              textAlign: "center",
              justifyContent: "center",
              width: "500px",
            }}
          />
        </div>
        <Button
          onClick={() => addProduct()}
          style={{
            backgroundColor: "green",
            color: "white",
            justifyContent: "right",
          }}
        >
          Finish
        </Button>
      </form>
      <div className="image1">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          style={{ margin: "25px" }}
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <img
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "30%",
              border: "1px solid lightgray",
              objectFit: "scale-down",
              alignItems: "center",
              margin: "auto",
              textAlign: "center",
            }}
            src={
              file
                ? URL.createObjectURL(file)
                : "https://t4.ftcdn.net/jpg/02/83/72/41/360_F_283724163_kIWm6DfeFN0zhm8Pc0xelROcxxbAiEFI.jpg"
            }
            alt=""
          />
        </IconButton>
      </div>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            backgroundColor: "crimson",
            padding: "5px",
            color: "white",
            width: "250px",
            height: "40px",
            left: 15,
            top: 1000,
          },
        }}
      />
    </div>
  );
}
