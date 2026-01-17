// Pricing Rules Management (Page 2)
import { useState } from "react";
import { useNavigate } from "react-router";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function PricingRules() {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Gold Chain Necklace",
      purity: "24K",
      weight: "15.5",
      makingChargeType: "fixed",
      makingChargeValue: "50",
      finalPrice: "1302.09"
    },
    {
      id: 2,
      name: "Diamond Ring",
      purity: "22K",
      weight: "8.3",
      makingChargeType: "percentage",
      makingChargeValue: "15",
      finalPrice: "706.95"
    },
    {
      id: 3,
      name: "Gold Bracelet",
      purity: "18K",
      weight: "12.0",
      makingChargeType: "fixed",
      makingChargeValue: "35",
      finalPrice: "761.96"
    }
  ]);

  const [filters, setFilters] = useState({
    collection: "",
    productType: ""
  });

  const calculatePrice = (purity, weight, chargeType, chargeValue) => {
    const pricePerGram = {
      "24K": 80.78,
      "22K": 74.05,
      "18K": 60.58,
      "14K": 47.12
    };
    
    const basePrice = pricePerGram[purity] * parseFloat(weight);
    let finalPrice = basePrice;
    
    if (chargeType === "fixed") {
      finalPrice += parseFloat(chargeValue);
    } else {
      finalPrice += basePrice * (parseFloat(chargeValue) / 100);
    }
    
    return finalPrice.toFixed(2);
  };

  const updateProduct = (id, field, value) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        const updated = { ...product, [field]: value };
        updated.finalPrice = calculatePrice(
          updated.purity,
          updated.weight,
          updated.makingChargeType,
          updated.makingChargeValue
        );
        return updated;
      }
      return product;
    }));
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #fcd34d 100%)',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <button
                onClick={() => navigate('/app')}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#2563eb',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                ← Back to Dashboard
              </button>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#111827',
                margin: 0
              }}>
                Product Pricing Rules
              </h1>
            </div>
          </div>

          {/* Filters */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Filter by Collection
              </label>
              <select
                value={filters.collection}
                onChange={(e) => setFilters({ ...filters, collection: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  color: '#374151'
                }}
              >
                <option value="">All Collections</option>
                <option value="necklaces">Necklaces</option>
                <option value="rings">Rings</option>
                <option value="bracelets">Bracelets</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Filter by Product Type
              </label>
              <select
                value={filters.productType}
                onChange={(e) => setFilters({ ...filters, productType: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  color: '#374151'
                }}
              >
                <option value="">All Types</option>
                <option value="gold">Gold</option>
                <option value="diamond">Diamond</option>
                <option value="silver">Silver</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    color: '#374151',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Product Name
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    color: '#374151',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Gold Purity
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    color: '#374151',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Weight (g)
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    color: '#374151',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Making Charge
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    color: '#374151',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Final Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} style={{
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <td style={{
                      padding: '1rem',
                      fontSize: '0.9rem',
                      color: '#111827',
                      fontWeight: '500'
                    }}>
                      {product.name}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <select
                        value={product.purity}
                        onChange={(e) => updateProduct(product.id, 'purity', e.target.value)}
                        style={{
                          padding: '0.5rem',
                          border: '2px solid #d1d5db',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          color: '#374151',
                          minWidth: '100px'
                        }}
                      >
                        <option value="24K">24K</option>
                        <option value="22K">22K</option>
                        <option value="18K">18K</option>
                        <option value="14K">14K</option>
                      </select>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <input
                        type="number"
                        value={product.weight}
                        onChange={(e) => updateProduct(product.id, 'weight', e.target.value)}
                        step="0.1"
                        style={{
                          padding: '0.5rem',
                          border: '2px solid #d1d5db',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          color: '#374151',
                          width: '100px'
                        }}
                      />
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <select
                          value={product.makingChargeType}
                          onChange={(e) => updateProduct(product.id, 'makingChargeType', e.target.value)}
                          style={{
                            padding: '0.5rem',
                            border: '2px solid #d1d5db',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            color: '#374151'
                          }}
                        >
                          <option value="fixed">Fixed</option>
                          <option value="percentage">%</option>
                        </select>
                        <input
                          type="number"
                          value={product.makingChargeValue}
                          onChange={(e) => updateProduct(product.id, 'makingChargeValue', e.target.value)}
                          step="0.1"
                          style={{
                            padding: '0.5rem',
                            border: '2px solid #d1d5db',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            color: '#374151',
                            width: '80px'
                          }}
                        />
                      </div>
                    </td>
                    <td style={{
                      padding: '1rem',
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: '#2563eb'
                    }}>
                      ${product.finalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem'
        }}>
          <button
            onClick={() => navigate('/app')}
            style={{
              backgroundColor: 'white',
              color: '#374151',
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              border: '2px solid #d1d5db',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            Save and Apply
          </button>
        </div>
      </div>
    </div>
  );
}