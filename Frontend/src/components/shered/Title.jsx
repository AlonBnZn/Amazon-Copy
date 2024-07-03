import React from "react";
import { Helmet } from "react-helmet-async";
import propTypes from "prop-types";

const Title = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

Title.propTypes = {
  title: propTypes.string,
};

export default Title;
