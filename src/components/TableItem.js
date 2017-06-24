import React from 'react';

export default class TableItem extends React.Component {

    render() {
        return (
            <tr key={product.id}>
                <td>{product.brand}</td>
                <td>{product.model}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.rating}</td>
            </tr>
        );
    }
}