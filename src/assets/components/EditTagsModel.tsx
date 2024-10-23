import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Tag } from "../../App";

type EditTagsModelProps = {
  availabelTags: Tag[];
  handleClose: () => void;
  show: boolean;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};
const EditTagsModel = ({
  availabelTags,
  handleClose,
  show,
  updateTag,
  deleteTag,
}: EditTagsModelProps) => {
  console.log(show);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availabelTags.map((tag) => {
              return (
                <Row key={tag.id}>
                  <Col>
                    <Form.Control
                      type="text"
                      value={tag.label}
                      onChange={(e) => updateTag(tag.id, e.target.value)}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="outline-danger"
                      onClick={() => deleteTag(tag.id)}
                    >
                      &times;
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTagsModel;
