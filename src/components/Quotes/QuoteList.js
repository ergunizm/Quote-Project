import QuoteItem from "./QuoteItem";
import Card from "../UI/Card";

import styles from "./QuoteList.module.css";

const QuoteList = (props) => {
  // fixing the bad coming data to [{...}] way
  let quotes = [];
  for (const value of Object.values(Object.entries(props.quotes))) {
    quotes.push(value[1]);
  }

  quotes.sort().reverse();

  return (
    <Card className={styles.group}>
      {quotes.map((quote) => (
        <div className={styles.quote} key={quote.id}>
          <QuoteItem
            title={quote.title}
            description={quote.description}
            author={quote.author}
            id={quote.id}
          />
        </div>
      ))}
    </Card>
  );
};

export default QuoteList;
