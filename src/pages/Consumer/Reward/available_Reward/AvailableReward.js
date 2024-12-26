// import React, { useState } from "react";
// import { Stack } from "@mui/material";
// import "./style.css";
// import OfferCards from "../../../../components/Cards/OfferCards";

// const AvailableReward = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   const cardData = [
//     {
//       title: "Samsung Buds Pro",
//       discount: "50% OFF",
//       originalPrice: "$120",
//       currentPrice: "$150",
//       description: "For whole order",
//       points: "50",
//       isSale: false,
//       flashSaleDescription: {
//         date: "05/08/2021 04:00 – 09/08/2021 12:00",
//         combinations:
//           "Get 20% off when you spend over $169.00 or get 15% off when you spend over $89.00.",
//       },
//     },
//     {
//       title: "Samsung Buds Pro",
//       discount: "50% OFF",
//       originalPrice: "$120",
//       currentPrice: "$150",
//       description: "For whole order",
//       points: "50",
//       isSale: true,
//       flashSaleDescription: {
//         date: "05/08/2021 04:00 – 09/08/2021 12:00",
//         combinations:
//           "Get 20% off when you spend over $169.00 or get 15% off when you spend over $89.00.",
//       },
//     },
//     {
//       title: "Samsung Buds Pro",
//       discount: "50% OFF",
//       originalPrice: "$120",
//       currentPrice: "$150",
//       description: "For whole order",
//       points: "50",
//       isSale: false,
//       flashSaleDescription: {
//         date: "05/08/2021 04:00 – 09/08/2021 12:00",
//         combinations:
//           "Get 20% off when you spend over $169.00 or get 15% off when you spend over $89.00.",
//       },
//     },
//     {
//       title: "Samsung Buds Pro",
//       discount: "50% OFF",
//       originalPrice: "$120",
//       currentPrice: "$150",
//       description: "For whole order",
//       points: "50",
//       isSale: false,
//       flashSaleDescription: {
//         date: "05/08/2021 04:00 – 09/08/2021 12:00",
//         combinations:
//           "Get 20% off when you spend over $169.00 or get 15% off when you spend over $89.00.",
//       },
//     },

//     // ...
//   ];

//   return (
//     <>
//       <Stack sx={{ padding: "0px 30px" }}>
//         <div className="ar-main">
//           <div>Enjoy Flash Deals From Different Brands</div>

//           <div style={{ display: "flex", flexWrap: "wrap" }}>
//             {cardData.map((card, index) => (
//               <OfferCards
//                 key={index}
//                 title={card.title}
//                 originalPrice={card.originalPrice}
//                 currentPrice={card.currentPrice}
//                 discount={card.discount}
//                 description={card.description}
//                 points={card.points}
//                 isSale={card.isSale}
//                 flashSaleDescription={card.flashSaleDescription}
//               />
//             ))}
//           </div>
//         </div>
//       </Stack>
//     </>
//   );
// };

// export default AvailableReward;
