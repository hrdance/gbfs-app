import { Fragment, useState } from 'react';

function ListGroup({ items, onSelectItem }) {

  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <Fragment>
      {items.length === 0 && <p>No items found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
              ? 'list-group-item active'
              : 'list-group-item'
            }
            key={item.id}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default ListGroup;
