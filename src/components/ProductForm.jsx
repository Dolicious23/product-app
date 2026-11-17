import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

function ProductForm({ editingProduct, onSave, onCancel }) {
  const [form, setForm] = useState(() => ({
    name: editingProduct?.name ?? '',
    quantity: editingProduct ? String(editingProduct.quantity) : '',
  }))
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const name = form.name.trim()
    const quantity = Number(form.quantity)

    if (!name) {
      setError('Product name is required.')
      return
    }
    if (!Number.isInteger(quantity) || quantity < 0) {
      setError('Quantity must be a whole number of 0 or more.')
      return
    }

    onSave({ name, quantity })
    setError('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-3 align-items-end">
        <Col xs={12} sm={6} md={5}>
          <Form.Label htmlFor="product-name">Product name</Form.Label>
          <Form.Control
            id="product-name"
            name="name"
            type="text"
            placeholder="e.g. Keyboard"
            value={form.name}
            onChange={handleChange}
          />
        </Col>
        <Col xs={6} sm={3} md={3}>
          <Form.Label htmlFor="product-quantity">Quantity</Form.Label>
          <Form.Control
            id="product-quantity"
            name="quantity"
            type="number"
            min="0"
            step="1"
            value={form.quantity}
            onChange={handleChange}
          />
        </Col>
        <Col xs={6} sm={3} md={4} className="d-flex gap-2">
          <Button type="submit" variant="primary">
            {editingProduct ? 'Update' : 'Add product'}
          </Button>
          {editingProduct && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Col>
      </Row>
      {error && <p className="text-danger small mt-2 mb-0">{error}</p>}
    </Form>
  )
}

export default ProductForm
