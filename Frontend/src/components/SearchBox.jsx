import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getFilterUrl } from "../utils";
export default function SerchBox() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();
  const submitHandler = (e) => {
    e.preventDefault();
    const filterURI = getFilterUrl(search, { query: query });
    navigate(filterURI);
  };
  useEffect(() => {
    // getFilterUrl(search)
    if (!query) {
      return;
    }
    const filterURI = getFilterUrl(search, { query: query });
    navigate(filterURI);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, search, navigate]);
  return (
    <Form
      onSubmitCapture={(e) => submitHandler(e)}
      className="d-flex col-sm-5 col-md-8"
    >
      <InputGroup>
        <FormControl
          aria-describedby="button-serch"
          placeholder="Search Products"
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
        ></FormControl>
        <Button varient="outline-primery" type="submit" id="button-search">
          <FontAwesomeIcon icon={faSearch} className="text-white" />
        </Button>
      </InputGroup>
    </Form>
  );
}
