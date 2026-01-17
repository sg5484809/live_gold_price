// # Price Preview & Sync (Page 4)
import { useState } from "react";
import { useNavigate } from "react-router";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Preview() {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Gold Chain Necklace",
      oldPrice: "1250.00",
      newPrice: "1302.09",
      difference: "+52.09",
      percentChange: "+4.2%",
      status: "pending"
    },
    {
      id: 2,
      name: "Diamond Ring",
      oldPrice: "720.00",
      newPrice: "706.95",
      difference: "-13.05",
      percentChange: "-1.8%",
      status: "synced"
    },
    {
      id: 3,
      name: "Gold Bracelet",
      oldPrice: "750.00",
      newPrice: "761.96",
      difference: "+11.96",
      percentChange: "+1.6%",
      status: "pending"
    },
    {
      id: 4,
      name: "Silver Pendant",
      oldPrice: "85.00",
      newPrice: "0.00",
      difference: "Error",
      percentChange: "N/A",
      status: "error"
    }
  ]);

  const [lastSync, setLastSync] = useState(new Date().toLocaleString());
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setProducts(products.map(p => ({ ...p, status: p.status === "error" ? "error" : "synced" })));
      setLastSync(new Date().toLocaleString());
      setIsSyncing(false);
    }, 2000);
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: '#fef3c7', color: '#92400e', text: 'Pending' },
      synced: { bg: '#d1fae5', color: '#065f46', text: 'Synced' },
      error: { bg: '#fee2e2', color: '#991b1b', text: 'Error' }
    };
    
    const style = styles[status];
    return (
      <span style={{
        backgroundColor: style.bg,
        color: style.color,
        padding: '0.375rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {style.text}
      </span>
    );
  };

  const hasProducts = products.length > 0;

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
            marginBottom: '1rem',
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
                Price Preview & Sync Status
              </h1>
            </div>
            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isSyncing ? 'not-allowed' : 'pointer',
                opacity: isSyncing ? 0.6 : 1,
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => !isSyncing && (e.currentTarget.style.backgroundColor = '#1d4ed8')}
              onMouseOut={(e) => !isSyncing && (e.currentTarget.style.backgroundColor = '#2563eb')}
            >
              {isSyncing ? '🔄 Syncing...' : '🔄 Sync Prices Now'}
            </button>
          </div>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#f3f4f6',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem'
          }}>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Last synced:</span>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>{lastSync}</span>
          </div>
        </div>

        {/* Empty State */}
        {!hasProducts && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '4rem 2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '0.5rem'
            }}>
              No Products Selected
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              marginBottom: '2rem'
            }}>
              Add pricing rules to products to see price previews and sync status here
            </p>
            <button
              onClick={() => navigate('/app/pricing-rules')}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Configure Pricing Rules
            </button>
          </div>
        )}

        {/* Products Table */}
        {hasProducts && (
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
                      Old Price
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
                      New Price
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
                      Difference
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
                      Status
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
                      <td style={{
                        padding: '1rem',
                        fontSize: '0.9rem',
                        color: '#6b7280',
                        textDecoration: 'line-through'
                      }}>
                        ${product.oldPrice}
                      </td>
                      <td style={{
                        padding: '1rem',
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: '#111827'
                      }}>
                        {product.status === 'error' ? '—' : `$${product.newPrice}`}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {product.status === 'error' ? (
                          <span style={{
                            fontSize: '0.875rem',
                            color: '#dc2626',
                            fontWeight: '600'
                          }}>
                            Error
                          </span>
                        ) : (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <span style={{
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              color: product.difference.startsWith('+') ? '#059669' : '#dc2626'
                            }}>
                              {product.difference}
                            </span>
                            <span style={{
                              fontSize: '0.75rem',
                              color: '#6b7280'
                            }}>
                              ({product.percentChange})
                            </span>
                            <span style={{ fontSize: '1rem' }}>
                              {product.difference.startsWith('+') ? '📈' : '📉'}
                            </span>
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {getStatusBadge(product.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        {hasProducts && (
          <div style={{
            marginTop: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Total Products
              </div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#111827'
              }}>
                {products.length}
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Pending Sync
              </div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#f59e0b'
              }}>
                {products.filter(p => p.status === 'pending').length}
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Synced
              </div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#10b981'
              }}>
                {products.filter(p => p.status === 'synced').length}
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Errors
              </div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#ef4444'
              }}>
                {products.filter(p => p.status === 'error').length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}