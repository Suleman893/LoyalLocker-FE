import React from "react";
import Select from "react-select";
import { components } from "react-select";

const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={props.data.image}
          alt=""
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <div>
          <div style={{ fontWeight: "bold" }}>{props.data.title}</div>
          <div>{props.data.description}</div>
        </div>
      </div>
    </components.Option>
  );
};

const ImageDropDown = ({
  shopifyProducts,
  formik,
  isEdit,
  isOffer = false,
  setSelectedProductPrice,
}) => {
  const selectedProduct = shopifyProducts?.find(
    (option) => option.value == formik?.values?.productId
  );

  return (
    <div style={{ width: "550px" }}>
      <Select
        value={isEdit && selectedProduct}
        options={shopifyProducts?.length ? shopifyProducts : []}
        getOptionLabel={(option) => option.title}
        getOptionValue={(option) => option.value}
        components={{ Option: CustomOption }}
        onChange={(selectedOption) => {
          formik.setFieldValue("productId", selectedOption?.value);
          isOffer && setSelectedProductPrice(selectedOption?.price);
        }}
      />
    </div>
  );
};

export default ImageDropDown;
