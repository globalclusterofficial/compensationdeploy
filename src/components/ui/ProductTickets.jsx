import React from "react";
import ProductTicket from "../ProductTicket";
import PropTypes from "prop-types";

function ProductTickets({ products }) {
  const totalProducts = products.length;
  const activeProducts = products.filter(
    (product) => product.status === "active",
  ).length;
  const pendingProducts = products.filter(
    (product) => product.status === "pending",
  ).length;
  const declinedProducts = products.filter(
    (product) => product.status === "declined",
  ).length;
  return (
    <section className="flex  lg:flex-nowrap flex-wrap gap-8">
      <ProductTicket purpose="Total Products" numbers={totalProducts} />
      <ProductTicket purpose="Active Products" numbers={activeProducts} />
      <ProductTicket purpose="Pending Products" numbers={pendingProducts} />
      <ProductTicket purpose="Declined" numbers={declinedProducts} />
    </section>
  );
}

export default ProductTickets;

ProductTickets.propTypes = {
  products: PropTypes.array,
};
