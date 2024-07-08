import React from "react";
import { ListGroup } from "react-bootstrap";
import Rating from "../shared/rating/Rating";
import PropTypes from "prop-types";
import Title from "../shared/Title";
const ProductDescription = ({ title, rating, price, description }) => {
  return (
    <ListGroup>
      <ListGroup.Item>
        <Title title={title} />
        <h1 style={{ wordWrap: "break-word" }}>{title}</h1>
      </ListGroup.Item>
      <ListGroup.Item>
        <Rating rating={rating} numReviews={rating.count} />
      </ListGroup.Item>
      <ListGroup.Item>Price: ${price}</ListGroup.Item>
      <ListGroup.Item>
        Description: <p className="lead">{description}</p>
      </ListGroup.Item>
    </ListGroup>
  );
};

ProductDescription.propTypes = {
  title: PropTypes.string,
  rating: PropTypes.object,
  price: PropTypes.number,
  description: PropTypes.string,
};

export default ProductDescription;
