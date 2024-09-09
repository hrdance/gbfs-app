import { useState } from 'react';

function ListGroup({ items, onSelectItem }) {

  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <div>
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
    </div>
  );
}

export default ListGroup;
