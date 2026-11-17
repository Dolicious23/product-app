import { Button, Table } from 'react-bootstrap'

function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p className="text-muted mb-0">No products yet. Add one above.</p>
  }

  return (
    <Table striped bordered hover responsive className="mb-0">
      <thead>
        <tr>
          <th>Product name</th>
          <th className="text-end">Quantity</th>
          <th className="text-end" style={{ width: '150px' }}>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td className="text-end">{product.quantity}</td>
            <td className="text-end">
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => onEdit(product)}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(product.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ProductList
