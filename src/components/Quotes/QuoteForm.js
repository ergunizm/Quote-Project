import { useRef } from "react";
import Card from "../UI/Card";
import styles from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const titleInputRef = useRef("");
  const quoteInputRef = useRef("");

  const submitFormHandler = (e) => {
    e.preventDefault();
    const title = titleInputRef.current.value;
    const description = quoteInputRef.current.value;
    const id = new Date().toISOString();

    const data = { id, description, title, author: props.author };
    props.onAdd(data);
  };

  return (
    <Card>
      <form onSubmit={submitFormHandler} className={styles.form}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" ref={titleInputRef} />
        </div>
        <div>
          <label htmlFor="text">Quote</label>
          <textarea
            id="text"
            rows="6"
            cols="50"
            maxLength="300"
            ref={quoteInputRef}
          ></textarea>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={props.author}
            disabled="disabled"
          />
        </div>
        <div>
          <button>Add Quote</button>
        </div>
      </form>
    </Card>
  );
};

export default QuoteForm;
