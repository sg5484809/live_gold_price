//# Settings Configuration (Page 3)
import { useState } from "react";
import { useNavigate } from "react-router";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Settings() {
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    priceSource: "metals-api",
    updateFrequency: "15",
    minPriceLimit: "50",
    maxPriceLimit: "200",
    liveUpdatesEnabled: true
  });

  const handleSave = () => {
    console.log("Settings saved:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #fcd34d 100%)',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '900px',
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
            Live Gold Price Settings
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            marginTop: '0.5rem'
          }}>
            Configure how your app fetches and applies live gold prices
          </p>
        </div>

        {/* Settings Form */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          {/* Price Source */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '700',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Gold Price API Source
            </label>
            <select
              value={settings.priceSource}
              onChange={(e) => setSettings({ ...settings, priceSource: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                color: '#374151',
                marginBottom: '0.5rem'
              }}
            >
              <option value="metals-api">Metals-API.com</option>
              <option value="goldapi">GoldAPI.io</option>
              <option value="kitco">Kitco.com</option>
              <option value="custom">Custom API</option>
            </select>
            <p style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              margin: 0
            }}>
              Select the API provider for fetching live gold prices. Each provider may have different pricing tiers.
            </p>
          </div>

          {/* Update Frequency */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '700',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Price Update Frequency
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '0.75rem',
              marginBottom: '0.5rem'
            }}>
              {[
                { value: "5", label: "Every 5 minutes" },
                { value: "15", label: "Every 15 minutes" },
                { value: "30", label: "Every 30 minutes" },
                { value: "60", label: "Every hour" }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSettings({ ...settings, updateFrequency: option.value })}
                  style={{
                    padding: '0.75rem',
                    border: `2px solid ${settings.updateFrequency === option.value ? '#2563eb' : '#d1d5db'}`,
                    borderRadius: '0.5rem',
                    backgroundColor: settings.updateFrequency === option.value ? '#eff6ff' : 'white',
                    color: settings.updateFrequency === option.value ? '#2563eb' : '#374151',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              margin: 0
            }}>
              How often should the app check for updated gold prices? More frequent updates may consume more API calls.
            </p>
          </div>

          {/* Price Limits */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Minimum Price Limit */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Minimum Price Limit (USD/gram)
              </label>
              <input
                type="number"
                value={settings.minPriceLimit}
                onChange={(e) => setSettings({ ...settings, minPriceLimit: e.target.value })}
                step="0.01"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}
              />
              <p style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                margin: 0
              }}>
                Prevent prices from falling below this threshold
              </p>
            </div>

            {/* Maximum Price Limit */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Maximum Price Limit (USD/gram)
              </label>
              <input
                type="number"
                value={settings.maxPriceLimit}
                onChange={(e) => setSettings({ ...settings, maxPriceLimit: e.target.value })}
                step="0.01"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}
              />
              <p style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                margin: 0
              }}>
                Prevent prices from rising above this threshold
              </p>
            </div>
          </div>

          {/* Live Updates Toggle */}
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f9fafb',
            borderRadius: '0.75rem',
            border: '2px solid #e5e7eb',
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '0.25rem'
                }}>
                  Enable Live Price Updates
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  Automatically update product prices based on live gold prices
                </div>
              </div>
              <button
                onClick={() => setSettings({ ...settings, liveUpdatesEnabled: !settings.liveUpdatesEnabled })}
                style={{
                  width: '56px',
                  height: '32px',
                  borderRadius: '9999px',
                  backgroundColor: settings.liveUpdatesEnabled ? '#2563eb' : '#d1d5db',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background-color 0.2s'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: '4px',
                  left: settings.liveUpdatesEnabled ? '28px' : '4px',
                  transition: 'left 0.2s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} />
              </button>
            </div>
          </div>

          {/* API Key Section (Optional) */}
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#fef3c7',
            borderRadius: '0.75rem',
            border: '2px solid #fbbf24',
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'start'
            }}>
              <div style={{
                fontSize: '1.25rem',
                flexShrink: 0
              }}>
                ⚠️
              </div>
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  color: '#92400e',
                  marginBottom: '0.25rem'
                }}>
                  API Key Required
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#78350f'
                }}>
                  Some price sources require an API key. You can add it in the API Configuration section.
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
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
              onClick={handleSave}
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
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}