import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../actions";
import searchPageReducer from "../reducers/searchPageReducer";
import Title from "../components/shared/Title";
import { Button, Col, Row } from "react-bootstrap";
import { getFilterUrl } from "../utils";
import Loading from "../components/shared/Loading";
import MessageBox from "../components/MessageBox";
import Product from "./homePage/Product";
import { LinkContainer } from "react-router-bootstrap";
const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },

  {
    name: "$50 to $200",
    value: "50-200",
  },

  {
    name: "$200 to $1000",
    value: "200-1000",
  },
];
export const ratings = [
  {
    name: "4 stars & up",

    rating: 4,
  },
  {
    name: "3 stars & up",
    rating: 3,
  },
  {
    name: "2 stars & up",
    rating: 2,
  },
  {
    name: "1 stars & up",
    rating: 1,
  },
];

const SearchPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "all";
  const price = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";
  const order = searchParams.get("order") || "newest";
  const page = searchParams.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(searchPageReducer, { loading: true, error: "", products: [] });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/products/categories"
        );
        setCategories(data);
      } catch (error) {
        toast.error(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: GET_REQUEST });
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/products/search?category=${category}&query=${query}&price=${price}&rating=${rating}&order=${order}&page=${page}`
        );

        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: error });
        toast.error(error);
      }
    };
    getData();
  }, [dispatch, category, query, price, rating, order, page]);
  return (
    <div>
      <Title title="Search Products" />
      <Row>
        <Col md={3}>
          <div>
            <h3>Category</h3>
            <ul>
              <li>
                <Link
                  className={categories === "all" ? "text-bold" : ""}
                  to={getFilterUrl(search, { category })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={c === category ? "text-bold" : ""}
                    to={getFilterUrl(search, { category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Prices</h3>
            <ul>
              <li>
                <Link
                  className={prices === "all" ? "text-bold" : ""}
                  to={getFilterUrl(search, { price })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    className={p.value === price ? "text-bold" : ""}
                    to={getFilterUrl(search, { price: p.value })}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Reviews</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    className={r.rating === rating ? "text-bold" : ""}
                    to={getFilterUrl(search, { rating: r.rating })}
                  >
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? "No" : countProducts} Results
                    {query !== "all" && " : " + query}
                    {category !== "all" && " : " + category}
                    {price !== "all" && " : Price " + price}
                    {rating !== "all" && " : Rating" + rating}
                    {query !== "all" ||
                    category !== "all" ||
                    rating !== "all" ||
                    price !== "all" ? (
                      <Button
                        variant="light"
                        onClick={() =>
                          navigate(
                            getFilterUrl(search, {
                              query: "all",
                              category: "all",
                              price: "all",
                              rating: "all",
                            })
                          )
                        }
                      >
                        <i className="fa fa-times-circle" />
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by{" "}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl(search, { order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={{
                      pathname: "/search",
                      search: getFilterUrl(search, { page: x + 1 }, true),
                    }}
                  >
                    <Button
                      className={
                        Number(page) === x + 1 ? "highligh-current-page" : ""
                      }
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SearchPage;
