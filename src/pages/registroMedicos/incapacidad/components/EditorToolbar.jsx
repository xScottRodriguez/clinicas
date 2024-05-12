/** @format */

import { Button, ButtonGroup, Container } from "react-bootstrap";

// Quill Toolbar component
export const QuillToolbar = () => (
  <Container id="toolbar" className="bg-white">
    <select className="ql-header" defaultValue="3">
      <option value="1">Heading</option>
      <option value="2">Subheading</option>
      <option value="3">Normal</option>
    </select>
    <select className="ql-size " defaultValue="medium">
      <option value="extra-small">Size 1</option>
      <option value="small">Size 2</option>
      <option value="medium">Size 3</option>
      <option value="large">Size 4</option>
    </select>
    <ButtonGroup className="ql-header">
      <Button className="ql-bold " />
      <Button className="ql-italic" />
      <Button className="ql-underline" />
      <Button className="ql-strike" />
      <Button className="ql-list" value="ordered" />
      <Button className="ql-list" value="bullet" />
      <Button className="ql-indent" value="-1" />
      <Button className="ql-indent" value="+1" />
      <select className="ql-align " />
      <select className="ql-color" />
      <select className="ql-background" />
    </ButtonGroup>
  </Container>
);

export default QuillToolbar;
