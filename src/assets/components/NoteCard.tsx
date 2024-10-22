import React from "react";
import { Tag } from "../../App";
import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./NoteList.module.css";

export type SimplefieldNote = {
  id: string;
  title: string;
  tags: Tag[];
};

const NoteCard = ({ id, title, tags }: SimplefieldNote) => {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-item-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => {
                return (
                  <Badge key={tag.id} className="text-trucate">
                    {tag.label}
                  </Badge>
                );
              })}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
