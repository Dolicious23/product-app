import { useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProductForm from './components/ProductForm.jsx'
import ProductList from './components/ProductList.jsx'
import './App.css'

let nextId = 1

function App() {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)

  const handleSave = ({ name, quantity }) => {
    if (editingProduct) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingProduct.id ? { ...product, name, quantity } : product,
        ),
      )
      setEditingProduct(null)
    } else {
      setProducts((current) => [
        ...current,
        { id: nextId++, name, quantity },
      ])
    }
  }

  const handleDelete = (id) => {
    setProducts((current) => current.filter((product) => product.id !== id))
    if (editingProduct?.id === id) {
      setEditingProduct(null)
    }
  }

  return (
    <Container className="py-4" style={{ maxWidth: '900px' }}>
      <h1 className="mb-4">Product Maintenance</h1>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="mb-3">
            {editingProduct ? 'Update product' : 'Add a new product'}
          </Card.Title>
          <ProductForm
            key={editingProduct?.id ?? 'new'}
            editingProduct={editingProduct}
            onSave={handleSave}
            onCancel={() => setEditingProduct(null)}
          />
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title className="mb-3">Products</Card.Title>
          <ProductList
            products={products}
            onEdit={setEditingProduct}
            onDelete={handleDelete}
          />
        </Card.Body>
      </Card>
    </Container>
  )
}

export default App
