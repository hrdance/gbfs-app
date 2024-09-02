import { Fragment, useState } from 'react';

function ListGroup({ items, onSelectItem }) {
  // Hook
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
            key={item.id} // Assuming each item has a unique id
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item.name} {/* Displaying name from the item object */}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default ListGroup;
