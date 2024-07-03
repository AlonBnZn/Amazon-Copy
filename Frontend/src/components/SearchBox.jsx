import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export default function SerchBox() {
  return (
    <Form className="d-flex col-sm-5 col-md-8">
      <InputGroup>
        <FormControl
          aria-describedby="button-serch"
          placeholder="Search Products"
          type="text"
          name="q"
          id="q"
        ></FormControl>
        <Button varient="outline-primery" type="submit" id="button-search">
          <FontAwesomeIcon icon={faSearch} className="text-white" />
        </Button>
      </InputGroup>
    </Form>
  );
}
