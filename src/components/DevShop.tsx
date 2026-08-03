import React, { useState, useEffect, useRef } from 'react';

const JS_LAB_CODE_SNIPPETS = {
  swr: `// Stale-While-Revalidate (SWR) Cache Fetcher
const swrCache = new Map();

async function fetchWithSWR(url, options = {}) {
  const cacheKey = url;
  const cached = swrCache.get(cacheKey);
  const TTL = 10000; // 10 seconds validity

  if (cached && (Date.now() - cached.timestamp < TTL)) {
    console.log(\`[CACHE] hit: served from memory in 0ms\`);
    
    // Trigger background sync in revalidation cycle
    triggerBackgroundSync(url, cacheKey);
    return cached.data;
  }

  console.log(\`[NETWORK] cache miss: Fetching from server...\`);
  const freshData = await networkFetch(url, options);
  
  swrCache.set(cacheKey, {
    data: freshData,
    timestamp: Date.now()
  });
  
  return freshData;
}`,
  debounce: `// Custom High-Performance Event Debouncer
function debounce(func, delay = 350) {
  let timeoutId = null;

  return function (...args) {
    // Clear any active timer to group triggers
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Schedule execution after the quiet window
    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, delay);
    
    console.log("[EVENT] Raw event received, delaying call...");
  };
}

// Optimization usage:
const handleScrollOptimized = debounce(() => {
  console.log("[DATABASE] Telemetry db write executed (1 write)!");
}, 350);`,
  transition: `// React 19 Asynchronous Action with useTransition
import { useTransition, useState } from "react";

function RecordEditor() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState("idle");

  const handleUpdate = () => {
    // Wrap async operations in transitions
    startTransition(async () => {
      try {
        setStatus("Updating Atlas node...");
        await updateDatabaseRecord();
        setStatus("Update complete!");
      } catch (err) {
        setStatus("Update failed");
      }
    });
  };

  return (
    <button onClick={handleUpdate} disabled={isPending}>
      {isPending ? "Syncing..." : "Update Record"}
    </button>
  );
}`
};

interface ProductNode {
  id: string;
  title: string;
  category: 'merch' | 'hardware' | 'services';
  handle: string;
  description: string;
  image: string;
  price: string;
}

interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface MongoUser {
  _id: string;
  name: string;
  role: string;
  createdAt: string;
}

const PRODUCTS_DATABASE: ProductNode[] = [
  {
    id: "gid://shopify/Product/1",
    title: "Oxygen Developer Hoodie",
    category: "merch",
    handle: "oxygen-hoodie",
    description: "Premium heavyweight cotton hoodie styled with glowing cyan branding and custom edge-loop cuffs.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80",
    price: "49.99"
  },
  {
    id: "gid://shopify/Product/2",
    title: "Hydrogen Stealth Cap",
    category: "merch",
    handle: "hydrogen-cap",
    description: "Structured minimalist profile cap featuring desaturated stitching and water-resistant materials.",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80",
    price: "19.99"
  },
  {
    id: "gid://shopify/Product/3",
    title: "GraphQL Coffee Mug",
    category: "merch",
    handle: "graphql-mug",
    description: "Matte black ceramic mug styled with neon magenta schema node prints.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80",
    price: "14.99"
  },
  {
    id: "gid://shopify/Product/4",
    title: "SWR Thermos Flask",
    category: "merch",
    handle: "swr-flask",
    description: "Stainless steel double-walled vacuum insulated flask displaying real-time cache sync status.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80",
    price: "24.99"
  },
  {
    id: "gid://shopify/Product/5",
    title: "Headless Keyboard (75%)",
    category: "hardware",
    handle: "headless-keyboard",
    description: "75% layout keyboard featuring custom linear switches and customizable glowing keys.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80",
    price: "129.99"
  },
  {
    id: "gid://shopify/Product/6",
    title: "GraphQL Ergonomic Mouse",
    category: "hardware",
    handle: "graphql-mouse",
    description: "Ultra-lightweight wireless mouse with custom optical sensors and low latency query pooling.",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80",
    price: "79.99"
  },
  {
    id: "gid://shopify/Product/7",
    title: "Oxygen Edge Hosting Plan",
    category: "services",
    handle: "oxygen-hosting",
    description: "Ultra-low latency global hosting with instant scale cache workers and continuous Vercel push hooks.",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=400&q=80",
    price: "9.99"
  },
  {
    id: "gid://shopify/Product/8",
    title: "Hydrogen Migration Strategy",
    category: "services",
    handle: "hydrogen-migration",
    description: "Complete architectural review and custom migration strategy checklist built for high-scale merchants.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    price: "299.99"
  }
];

const INITIAL_MONGO_USERS: MongoUser[] = [
  { _id: "64f1c9a8b2c4d5e6f7a8b9c0", name: "Alex Mercer", role: "Developer", createdAt: "2026-07-09T08:12:00Z" },
  { _id: "64f1c9a8b2c4d5e6f7a8b9c1", name: "Sarah Connor", role: "Store Manager", createdAt: "2026-07-09T08:14:00Z" },
  { _id: "64f1c9a8b2c4d5e6f7a8b9c2", name: "John Doe", role: "E-Commerce Client", createdAt: "2026-07-09T08:16:00Z" }
];

export default function DevShop() {
  const [sandboxMode, setSandboxMode] = useState<'shopify' | 'mern' | 'js-lab'>('shopify');

  // --- Shopify Sandbox State ---
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'merch' | 'hardware' | 'services'>('all');
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [cartTotal, setCartTotal] = useState<string>('0.00');

  // --- Shopify Checkout Simulator State ---
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCheckoutProcessing, setIsCheckoutProcessing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'info' | 'payment' | 'success'>('info');
  const [shippingInfo, setShippingInfo] = useState({
    email: 'merchant@example.com',
    name: 'Al-Farabi',
    address: '128 Silicon Valley Dr',
    city: 'San Jose',
    zip: '95112'
  });
  const [paymentCard, setPaymentCard] = useState({
    number: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvc: '•••'
  });
  const [checkoutOrderId, setCheckoutOrderId] = useState('');

  // --- MERN Sandbox State ---
  const [mongoUsers, setMongoUsers] = useState<MongoUser[]>(INITIAL_MONGO_USERS);
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('Developer');

  // --- JS/React Lab State ---
  const [selectedSimulation, setSelectedSimulation] = useState<'swr' | 'debounce' | 'transition'>('swr');
  const [swrCacheHits, setSwrCacheHits] = useState(0);
  const [swrCacheMisses, setSwrCacheMisses] = useState(0);
  const [lastSWRFetchTime, setLastSWRFetchTime] = useState<number | null>(null);
  const [rawScrollCount, setRawScrollCount] = useState(0);
  const [debouncedWriteCount, setDebouncedWriteCount] = useState(0);
  const [isDebounceActive, setIsDebounceActive] = useState(true);
  const [react19Status, setReact19Status] = useState('idle');
  const [isReact19Pending, setIsReact19Pending] = useState(false);
  const [isBlockingTransition, setIsBlockingTransition] = useState(false);

  // --- Display Console State ---
  const [activeTab, setActiveTab] = useState<'query' | 'response'>('query');
  const [queryCode, setQueryCode] = useState<string>('');
  const [consoleOutput, setConsoleOutput] = useState<string>('// Select an action to dispatch sandbox instructions.');
  const [isConsoleGlowing, setIsConsoleGlowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const count = cartLines.reduce((acc, line) => acc + line.quantity, 0);
    const event = new CustomEvent('shopify-cart-update', { detail: { count } });
    window.dispatchEvent(event);
  }, [cartLines]);

  // Syntax highlighting helper functions
  const highlightGraphQL = (code: string) => {
    return code
      .replace(/(query|mutation|fragment|const|app\.[a-z]+|async|await|let)/g, '<span class="text-pink-500 font-bold">$1</span>')
      .replace(/(CartInput|CartLineInput|ID|CartLine|ProductVariant|User)/g, '<span class="text-amber-400 font-semibold">$1</span>')
      .replace(/(\b[a-zA-Z0-9_]+:)/g, '<span class="text-cyan-400">$1</span>')
      .replace(/(".*?")/g, '<span class="text-emerald-400">$1</span>');
  };

  const highlightJSON = (code: string) => {
    return code
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*")/g, '<span class="text-cyan-300">$1</span>')
      .replace(/(\b(true|false|null)\b)/g, '<span class="text-pink-500 font-bold">$1</span>')
      .replace(/(\b[0-9]+(\.[0-9]+)?\b)/g, '<span class="text-amber-400 font-medium">$1</span>')
      .replace(/("([^"]+)":)/g, '<span class="text-purple-400 font-bold">$1</span>');
  };

  const triggerConsoleGlow = () => {
    setIsConsoleGlowing(true);
    setTimeout(() => setIsConsoleGlowing(false), 600);
  };

  // --- Shopify Checkout Simulator Handlers ---
  const handleOpenCheckoutModal = () => {
    setIsCheckoutOpen(true);
    setCheckoutStep('info');
    setIsCheckoutProcessing(false);
    
    // Log the event to our dev console
    setActiveTab('query');
    setQueryCode(`// Shopify Storefront API: Create Checkout Session
mutation checkoutCreate($input: CheckoutCreateInput!) {
  checkoutCreate(input: $input) {
    checkout {
      id
      webUrl
      lineItems(first: 10) {
        edges {
          node {
            title
            quantity
          }
        }
      }
    }
    checkoutUserErrors {
      message
      field
    }
  }
}

// Variables:
{
  "input": {
    "lineItems": ${JSON.stringify(cartLines.map(line => ({
      "variantId": line.merchandise.id,
      "quantity": line.quantity
    })), null, 2)}
  }
}`);

    setConsoleOutput(`// Initiating Shopify Checkout session...
// Cart ID: ${cartId}
// Waiting for customer shipping details input...`);
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('payment');
    
    setActiveTab('query');
    setQueryCode(`// Shopify Storefront API: Update Shipping Address
mutation checkoutShippingAddressUpdateV2($checkoutId: ID!, $shippingAddress: MailingAddressInput!) {
  checkoutShippingAddressUpdateV2(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {
    checkout {
      id
      shippingAddress {
        address1
        city
        zip
      }
    }
  }
}

// Variables:
{
  "checkoutId": "gid://shopify/Checkout/${cartId?.split('/').pop()}",
  "shippingAddress": ${JSON.stringify(shippingInfo, null, 2)}
}`);

    setConsoleOutput(`// Shipping address updated.
// Email: ${shippingInfo.email}
// Name: ${shippingInfo.name}
// Address: ${shippingInfo.address}, ${shippingInfo.city} ${shippingInfo.zip}
// Tokenizing shipping metrics...
// Redirecting to card authorization form.`);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckoutProcessing(true);
    
    setActiveTab('query');
    setQueryCode(`// Shopify Storefront API: Complete Checkout Session (Payment Gateway Hook)
mutation checkoutCompleteWithCreditCardV2($checkoutId: ID!, $payment: CreditCardPaymentInputV2!) {
  checkoutCompleteWithCreditCardV2(checkoutId: $checkoutId, payment: $payment) {
    checkout {
      id
      ready
    }
    payment {
      id
      ready
      errorMessage
    }
  }
}

// Variables:
{
  "checkoutId": "gid://shopify/Checkout/${cartId?.split('/').pop()}",
  "payment": {
    "amount": "${cartTotal}",
    "currencyCode": "USD",
    "paymentGateway": "shopify_payments",
    "token": "tok_1Mv8sB2eZvKYlo2C1eR2Q9x9"
  }
}`);

    setConsoleOutput(`// Dispatching payment payload to gateway...
// Shopify Card Vault: tokenizing card ending in 4242...
// Waiting for checkout webhook callback (checkout/complete)...`);

    // Simulate network processing latency
    setTimeout(() => {
      const generatedOrderId = `SB-${Math.floor(1000 + Math.random() * 9000)}`;
      setCheckoutOrderId(generatedOrderId);
      setIsCheckoutProcessing(false);
      setCheckoutStep('success');
      
      // Update output console with order webhook payloads!
      setActiveTab('response');
      setConsoleOutput(JSON.stringify({
        event: "shopify_checkout_completed",
        timestamp: new Date().toISOString(),
        order: {
          id: `gid://shopify/Order/${Math.floor(600000000 + Math.random() * 300000000)}`,
          name: `#${generatedOrderId}`,
          email: shippingInfo.email,
          total_price: `${cartTotal}`,
          currency: "USD",
          shipping_address: {
            name: shippingInfo.name,
            address1: shippingInfo.address,
            city: shippingInfo.city,
            zip: shippingInfo.zip,
            country: "United States"
          },
          line_items: cartLines.map(line => ({
            title: line.merchandise.title,
            quantity: line.quantity,
            price: line.merchandise.price.amount
          }))
        },
        payment_details: {
          gateway: "shopify_payments",
          status: "success",
          transaction_id: `ch_${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        }
      }, null, 2));

      // Trigger success glow on console
      setIsConsoleGlowing(true);
      setTimeout(() => setIsConsoleGlowing(false), 2000);
    }, 1850);
  };

  const handleCloseCheckoutModal = () => {
    setIsCheckoutOpen(false);
    if (checkoutStep === 'success') {
      // Clear the cart on checkout success
      setCartLines([]);
      setCartTotal('0.00');
      setCartId(null);
      setCheckoutUrl(null);
      // Dispatch cart update event
      window.dispatchEvent(new CustomEvent('shopify-cart-update', { detail: { count: 0 } }));
    }
  };

  // --- Shopify Product Sorting ---
  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS_DATABASE 
    : PRODUCTS_DATABASE.filter(p => p.category === selectedCategory);

  // 1. ADD / INCREMENT MUTATION
  const handleAddToCart = (product: ProductNode) => {
    setIsLoading(true);
    triggerConsoleGlow();
    setActiveTab('response');

    setTimeout(() => {
      const mockCartId = cartId || `gid://shopify/Cart/c_sandbox_${Math.random().toString(36).substring(2, 8)}`;
      const variantId = `gid://shopify/ProductVariant/${product.id.split('/').pop()}_var`;
      
      const existingLineIdx = cartLines.findIndex(line => line.merchandise.id === variantId);
      let updatedLines = [];

      if (existingLineIdx > -1) {
        updatedLines = cartLines.map((line, idx) => idx === existingLineIdx 
          ? { ...line, quantity: line.quantity + 1 }
          : line
        );
      } else {
        updatedLines = [
          ...cartLines,
          {
            id: `gid://shopify/CartLine/${product.id.split('/').pop()}_${Math.random().toString(36).substring(2, 6)}`,
            quantity: 1,
            merchandise: {
              id: variantId,
              title: product.title,
              price: { amount: product.price, currencyCode: "USD" }
            }
          }
        ];
      }

      setCartId(mockCartId);
      setCheckoutUrl("https://checkout.shopify.com/mock-checkout");
      const total = updatedLines.reduce((acc, curr) => acc + (parseFloat(curr.merchandise.price.amount) * curr.quantity), 0);
      setCartTotal(total.toFixed(2));
      setCartLines(updatedLines);

      const isNew = !cartId;
      const mutationName = isNew ? "cartCreate" : "cartLinesAdd";
      
      const mutationGraphQL = isNew
        ? `mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
      cost { totalAmount { amount } }
    }
  }
}`
        : `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      cost { totalAmount { amount } }
    }
  }
}`;

      const variables = isNew 
        ? { input: { lines: [{ merchandiseId: variantId, quantity: 1 }] } }
        : { cartId: mockCartId, lines: [{ merchandiseId: variantId, quantity: 1 }] };

      setQueryCode(`// Shopify Storefront Mutation (${mutationName})\n${mutationGraphQL}\n\n// Variables\n${JSON.stringify(variables, null, 2)}`);

      const jsonResponse = {
        data: {
          [mutationName]: {
            cart: {
              id: mockCartId,
              checkoutUrl: "https://checkout.shopify.com/mock-checkout",
              cost: { totalAmount: { amount: total.toFixed(2), currencyCode: "USD" } },
              lines: updatedLines.map(l => ({
                id: l.id,
                quantity: l.quantity,
                merchandise: { id: l.merchandise.id, title: l.merchandise.title }
              }))
            }
          }
        },
        latency: "42ms (Oxygen Edge Server)",
        status: "200 OK"
      };

      setConsoleOutput(JSON.stringify(jsonResponse, null, 2));
      setIsLoading(false);
    }, 350);
  };

  // 2. UPDATE QUANTITY MUTATION
  const handleUpdateQuantity = (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveLine(lineId);
      return;
    }

    setIsLoading(true);
    triggerConsoleGlow();
    setActiveTab('response');

    setTimeout(() => {
      const updatedLines = cartLines.map(line => line.id === lineId 
        ? { ...line, quantity }
        : line
      );

      const total = updatedLines.reduce((acc, curr) => acc + (parseFloat(curr.merchandise.price.amount) * curr.quantity), 0);
      setCartTotal(total.toFixed(2));
      setCartLines(updatedLines);

      const mutationGraphQL = `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      id
      cost { totalAmount { amount } }
    }
  }
}`;

      const variables = {
        cartId: cartId,
        lines: [{ id: lineId, quantity }]
      };

      setQueryCode(`// Shopify Storefront Mutation (cartLinesUpdate)\n${mutationGraphQL}\n\n// Variables\n${JSON.stringify(variables, null, 2)}`);

      const jsonResponse = {
        data: {
          cartLinesUpdate: {
            cart: {
              id: cartId,
              cost: { totalAmount: { amount: total.toFixed(2), currencyCode: "USD" } },
              lines: updatedLines.map(l => ({
                id: l.id,
                quantity: l.quantity,
                merchandise: { id: l.merchandise.id, title: l.merchandise.title }
              }))
            }
          }
        },
        latency: "38ms (Oxygen Edge Server)",
        status: "200 OK"
      };

      setConsoleOutput(JSON.stringify(jsonResponse, null, 2));
      setIsLoading(false);
    }, 300);
  };

  // 3. REMOVE LINE MUTATION
  const handleRemoveLine = (lineId: string) => {
    setIsLoading(true);
    triggerConsoleGlow();
    setActiveTab('response');

    setTimeout(() => {
      const updatedLines = cartLines.filter(line => line.id !== lineId);
      const total = updatedLines.reduce((acc, curr) => acc + (parseFloat(curr.merchandise.price.amount) * curr.quantity), 0);
      setCartTotal(total.toFixed(2));
      setCartLines(updatedLines);

      const mutationGraphQL = `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      id
      cost { totalAmount { amount } }
    }
  }
}`;

      const variables = {
        cartId: cartId,
        lineIds: [lineId]
      };

      setQueryCode(`// Shopify Storefront Mutation (cartLinesRemove)\n${mutationGraphQL}\n\n// Variables\n${JSON.stringify(variables, null, 2)}`);

      const jsonResponse = {
        data: {
          cartLinesRemove: {
            cart: {
              id: cartId,
              cost: { totalAmount: { amount: total.toFixed(2), currencyCode: "USD" } },
              lines: updatedLines.map(l => ({
                id: l.id,
                quantity: l.quantity,
                merchandise: { id: l.merchandise.id, title: l.merchandise.title }
              }))
            }
          }
        },
        latency: "35ms (Oxygen Edge Server)",
        status: "200 OK"
      };

      setConsoleOutput(JSON.stringify(jsonResponse, null, 2));
      setIsLoading(false);
    }, 300);
  };

  const handleClearCart = () => {
    setCartId(null);
    setCartLines([]);
    setCheckoutUrl(null);
    setCartTotal('0.00');
    setQueryCode('');
    setConsoleOutput('// Cart Context Cleared.');
    triggerConsoleGlow();
  };

  // --- MERN API Mutations ---
  const handleAddMongoUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) return;

    setIsLoading(true);
    triggerConsoleGlow();
    setActiveTab('response');

    setTimeout(() => {
      const newId = Math.random().toString(16).substring(2, 26).padEnd(24, '0');
      const newUserObj: MongoUser = {
        _id: newId,
        name: newUserName,
        role: newUserRole,
        createdAt: new Date().toISOString()
      };

      const updatedUsers = [...mongoUsers, newUserObj];
      setMongoUsers(updatedUsers);
      setNewUserName('');

      const clientFetchCode = `// React Client Request
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: "${newUserName}", role: "${newUserRole}" })
})
.then(res => res.json());

// Express Backend Route (MERN)
app.post('/api/users', async (req, res) => {
  const { name, role } = req.body;
  
  // Mongoose Schema validation & create
  const newUser = await User.create({ name, role });
  res.status(201).json(newUser);
});`;

      setQueryCode(clientFetchCode);

      const jsonResponse = {
        success: true,
        message: "Document created successfully in MongoDB Collection 'users'",
        document: newUserObj,
        database: "MongoDB Atlas Cluster-0",
        latency: "15ms (Express Endpoint Server)"
      };

      setConsoleOutput(JSON.stringify(jsonResponse, null, 2));
      setIsLoading(false);
    }, 320);
  };

  const handleDeleteMongoUser = (id: string, name: string) => {
    setIsLoading(true);
    triggerConsoleGlow();
    setActiveTab('response');

    setTimeout(() => {
      const updatedUsers = mongoUsers.filter(u => u._id !== id);
      setMongoUsers(updatedUsers);

      const clientFetchCode = `// React Client Request
fetch('/api/users/${id}', {
  method: 'DELETE'
})
.then(res => res.json());

// Express Backend Route (MERN)
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  
  // Find & remove document in MongoDB
  const deleted = await User.findByIdAndDelete(id);
  res.json({ success: true, deleted });
});`;

      setQueryCode(clientFetchCode);

      const jsonResponse = {
        success: true,
        message: `Document '${name}' successfully deleted in Collection 'users'`,
        idDeleted: id,
        database: "MongoDB Atlas Cluster-0",
        latency: "12ms (Express Endpoint Server)"
      };

      setConsoleOutput(JSON.stringify(jsonResponse, null, 2));
      setIsLoading(false);
    }, 280);
  };

  // --- JS/React Optimization Lab Actions ---
  const debounceTimeoutRef = useRef<any>(null);

  const handleRunSWR = () => {
    setActiveTab('response');
    const now = Date.now();
    const TTL = 10000; // 10s TTL
    
    if (lastSWRFetchTime && (now - lastSWRFetchTime < TTL)) {
      // SWR Cache Hit
      setSwrCacheHits(prev => prev + 1);
      triggerConsoleGlow();
      
      const cacheHitOutput = `// STALE-WHILE-REVALIDATE CACHE INDEX
[CACHE] served 'gid://shopify/Product/1' from memory in 0ms
Source: memory_cache (hit count: ${swrCacheHits + 1})
Cache TTL: ${Math.round((TTL - (now - lastSWRFetchTime)) / 1000)}s remaining

Response Payload (Served Instantly):
{
  "id": "gid://shopify/Product/1",
  "title": "Oxygen Developer Hoodie",
  "price": "49.99",
  "status": "cached_read"
}

[REVALIDATING] Dispatched background fetch request to sync cache...
[NETWORK] background sync completed in 120ms (cache is current).`;
      
      setConsoleOutput(cacheHitOutput);
    } else {
      // SWR Cache Miss
      setIsLoading(true);
      triggerConsoleGlow();
      setSwrCacheMisses(prev => prev + 1);
      
      const initialMissOutput = `// NETWORK REQUEST DISPATCHED
[NETWORK] cache miss: GET https://api.shopify.com/v1/products/1
Status: 202 Pending...`;
      setConsoleOutput(initialMissOutput);

      setTimeout(() => {
        setLastSWRFetchTime(Date.now());
        const freshOutput = `// NETWORK REQUEST COMPLETED
[NETWORK] GET https://api.shopify.com/v1/products/1 - 200 OK (took 1200ms)
[CACHE] write: cached product payload to memory

Response Payload:
{
  "id": "gid://shopify/Product/1",
  "title": "Oxygen Developer Hoodie",
  "price": "49.99",
  "status": "network_read"
}`;
        setConsoleOutput(freshOutput);
        setIsLoading(false);
      }, 1200);
    }
  };

  const handleTriggerScroll = () => {
    setActiveTab('response');
    const nextRawCount = rawScrollCount + 1;
    setRawScrollCount(nextRawCount);
    
    if (isDebounceActive) {
      const waitOutput = `// HIGH-FREQUENCY SCROLL LISTENER ACTIVE
[EVENT] Raw scroll event #${nextRawCount} captured.
[DEBOUNCE] Timer reset. Delaying database write...`;
      setConsoleOutput(waitOutput);

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        setDebouncedWriteCount(prev => {
          const nextWrite = prev + 1;
          const writeOutput = `// DEBOUNCED EVENT EXECUTED
[DEBOUNCE] Quiet period of 350ms crossed!
[DATABASE] Telemetry payload successfully committed to MongoDB Atlas.
Total database writes executed: ${nextWrite} (Saved ${nextRawCount - nextWrite} redundant database calls!)

Payload:
{
  "event": "scroll_telemetry",
  "rawScrollsGrouped": ${nextRawCount},
  "writesExecuted": ${nextWrite},
  "status": "success"
}`;
          setConsoleOutput(writeOutput);
          return nextWrite;
        });
        triggerConsoleGlow();
      }, 350);
    } else {
      // Debounce OFF: direct execution (reflow bottleneck simulation)
      setDebouncedWriteCount(prev => {
        const nextWrite = prev + 1;
        const writeOutput = `// UNOPTIMIZED EVENT EXECUTED (IMMEDIATE WRITE)
[EVENT] Raw scroll event #${nextRawCount} captured.
[DATABASE] Telemetry payload successfully committed to MongoDB Atlas.
Total database writes executed: ${nextWrite}

WARNING: High-frequency DOM/database writes triggered immediately!
- forced layout reflow blocking main thread
- 16ms frame rendering lag detected (input lag visible)`;
        setConsoleOutput(writeOutput);
        return nextWrite;
      });
      triggerConsoleGlow();
    }
  };

  const handleResetJSLab = () => {
    setSwrCacheHits(0);
    setSwrCacheMisses(0);
    setLastSWRFetchTime(null);
    setRawScrollCount(0);
    setDebouncedWriteCount(0);
    setQueryCode(JS_LAB_CODE_SNIPPETS[selectedSimulation]);
    setConsoleOutput('// JS/React optimization simulator reset.');
    triggerConsoleGlow();
  };

  const handleRunReact19Action = () => {
    setActiveTab('response');
    triggerConsoleGlow();

    if (isBlockingTransition) {
      setReact19Status('blocking');
      setConsoleOutput(`// SIMULATING UNOPTIMIZED SYNCHRONOUS BLOCKING CALL
[THREAD] Blocking main loop...
[THREAD] Browser UI frame rendering is locked!
- Try hover effects, clicks, or scrolling elsewhere (they will freeze).
- V8 engine thread is busy executing synchronous work.`);
      
      // Give React 50ms to flush the state render, then execute the busy wait thread block
      setTimeout(() => {
        const start = Date.now();
        while (Date.now() - start < 1200) {
          // busy wait blocks V8 execution thread completely!
        }
        setReact19Status('idle');
        
        const blockSuccessOutput = `// SYNCHRONOUS BLOCKING CALL RESOLVED
[THREAD] Main thread released.
- Database write completed in 1200ms.
- WARNING: 1200ms of complete UI thread freeze occurred. User interactions were dropped during this period.`;
        setConsoleOutput(blockSuccessOutput);
        triggerConsoleGlow();
      }, 50);
    } else {
      // React 19 concurrent transition
      setIsReact19Pending(true);
      setReact19Status('syncing');
      
      setConsoleOutput(`// REACT 19 USETRANSITION STATE ACTIVE
[ACTION] startTransition callback running...
Status: Pending (isPending === true)
UI Interaction: Main thread unlocked.
- UI remains responsive. Hover animations, tabs, and buttons are fully clickable.`);

      setTimeout(() => {
        setIsReact19Pending(false);
        setReact19Status('idle');
        
        const successOutput = `// REACT 19 ASYNCHRONOUS ACTION COMPLETED
[ACTION] startTransition callback resolved successfully.
Status: Idle (isPending === false)

Atlas Database Update Payload:
{
  "action": "update_user_role",
  "documentId": "64f1c9a8b2c4d5e6f7a8b9c0",
  "modifiedFields": {
    "role": "Lead Headless Architect",
    "updatedAt": "${new Date().toISOString()}"
  },
  "status": "success",
  "performance": "0ms forced UI lock (Asynchronous runtime active)"
}`;
        setConsoleOutput(successOutput);
        triggerConsoleGlow();
      }, 1200);
    }
  };

  const handleResetMongoUsers = () => {
    setMongoUsers(INITIAL_MONGO_USERS);
    setQueryCode('');
    setConsoleOutput('// MongoDB Collection Reset.');
    triggerConsoleGlow();
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-2xl relative z-20">
      
      {/* ═══ Top Sandbox Toggle ═══ */}
      <div className="flex border-b border-white/5 bg-black/50">
        <button 
          onClick={() => { setSandboxMode('shopify'); setQueryCode(''); setConsoleOutput('// Select a product to dispatch custom cart mutations.'); }}
          data-cursor-text="SHOPIFY"
          className={`flex-1 py-3.5 px-2 text-center font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
            sandboxMode === 'shopify' 
              ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' 
              : 'text-white/40 hover:text-white/70 hover:bg-white/[0.01]'
          }`}
        >
          ⚡ Shopify <span className="hidden sm:inline">Headless Playzone</span>
        </button>
        <button 
          onClick={() => { setSandboxMode('mern'); setQueryCode(''); setConsoleOutput('// CRUD live mock users in MongoDB collection.'); }}
          data-cursor-text="MERN"
          className={`flex-1 py-3.5 px-2 text-center font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
            sandboxMode === 'mern' 
              ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]' 
              : 'text-white/40 hover:text-white/70 hover:bg-white/[0.01]'
          }`}
        >
          💾 MERN Stack <span className="hidden sm:inline">Server Playzone</span>
        </button>
        <button 
          onClick={() => { setSandboxMode('js-lab'); setQueryCode(JS_LAB_CODE_SNIPPETS['swr']); setConsoleOutput('// JS/React optimization simulator initialized.\n// Select a lab action below to run simulations.'); setSelectedSimulation('swr'); }}
          data-cursor-text="JS LAB"
          className={`flex-1 py-3.5 px-2 text-center font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
            sandboxMode === 'js-lab' 
              ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' 
              : 'text-white/40 hover:text-white/70 hover:bg-white/[0.01]'
          }`}
        >
          ⚙️ JS/React <span className="hidden sm:inline">Optimization Lab</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* ═══ LEFT PANEL: INTERACTION ═══ */}
        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.01]">
          {sandboxMode === 'shopify' && (
            /* ── Shopify View ── */
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-wider">
                  🛒 Storefront API GraphQL Client
                </span>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400 animate-ping'}`}></span>
                  <span className="text-[10px] font-mono text-white/50">mock.shop API Live</span>
                </div>
              </div>

              <h3 className="text-xl font-black text-white mb-2">Shopify Storefront Sandbox</h3>
              <p className="text-white/60 text-xs mb-6 leading-relaxed">
                Dispatching real e-commerce API mutations. Select a product card to construct cart nodes dynamically on edge networks.
              </p>

              <div className="flex flex-wrap gap-2 mb-6 font-mono text-[10px]">
                {(['all', 'merch', 'hardware', 'services'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    data-cursor-text={cat.toUpperCase()}
                    className={`px-3 py-1.5 rounded-lg border font-bold uppercase tracking-wider transition-all duration-200 ${
                      selectedCategory === cat
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white'
                        : 'border-white/5 bg-white/5 text-white/40 hover:text-white/70'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Catalog Scroll Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
                {filteredProducts.map(p => (
                  <div key={p.id} className="flex flex-col p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300 group/item">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden border border-white/5 bg-black/50 mb-3 relative">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover filter brightness-[0.7] group-hover/item:brightness-[0.9] transition-all duration-300" loading="lazy" decoding="async" />
                      <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-mono text-white/65 uppercase tracking-widest">{p.category}</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white mb-1 group-hover/item:text-[var(--color-accent)] transition-colors">{p.title}</h4>
                        <p className="text-[10px] text-[var(--color-text-muted)] line-clamp-2 leading-relaxed mb-3">{p.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-[11px] font-mono font-bold text-green-400">${p.price}</span>
                        <button
                          onClick={() => handleAddToCart(p)}
                          disabled={isLoading}
                          data-cursor-text="ADD"
                          className="px-2.5 py-1.5 text-[10px] font-black rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-accent)] disabled:bg-white/10 text-zinc-950 transition-all duration-200"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shopify Cart Section */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/40">Shopify Cart Context</span>
                  {cartLines.length > 0 && (
                    <button onClick={handleClearCart} className="text-[10px] font-bold text-rose-400 hover:text-rose-300">
                      Clear
                    </button>
                  )}
                </div>

                {cartLines.length === 0 ? (
                  <div className="text-center py-6 rounded-xl border border-dashed border-white/5 text-white/30 text-xs">
                    No active cart items. Click '+ Add' above to build a checkout cart.
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                      {cartLines.map(line => (
                        <div key={line.id} className="flex items-center justify-between p-2 rounded-lg border border-white/5 bg-black/20 text-xs font-mono text-white/80">
                          <div className="min-w-0 flex-1">
                            <span className="font-bold truncate block text-white/95">{line.merchandise.title}</span>
                            <span className="text-[10px] text-white/40">${parseFloat(line.merchandise.price.amount).toFixed(2)} each</span>
                          </div>
                          
                          <div className="flex items-center gap-3 ml-4">
                            <div className="flex items-center border border-white/10 rounded-md bg-black">
                              <button 
                                onClick={() => handleUpdateQuantity(line.id, line.quantity - 1)}
                                className="px-2 py-0.5 text-white/50 hover:text-white border-r border-white/10"
                              >
                                -
                              </button>
                              <span className="px-2.5 text-[10px] text-white/90">{line.quantity}</span>
                              <button 
                                onClick={() => handleUpdateQuantity(line.id, line.quantity + 1)}
                                className="px-2 py-0.5 text-white/50 hover:text-white border-l border-white/10"
                              >
                                +
                              </button>
                            </div>

                            <button onClick={() => handleRemoveLine(line.id)} className="text-rose-400 hover:text-rose-300 p-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-white/5 font-mono text-xs">
                      <span className="text-white/60 font-bold">Total cost:</span>
                      <span className="text-[var(--color-accent)] font-black text-sm">${cartTotal} USD</span>
                    </div>

                    {checkoutUrl && (
                      <button
                        onClick={handleOpenCheckoutModal}
                        data-cursor-text="CHECKOUT"
                        className="w-full text-center py-2.5 px-4 rounded-xl bg-[var(--color-accent)] hover:opacity-95 text-black font-black text-xs shadow-[0_0_15px_rgba(223,193,93,0.25)] transition-all duration-200"
                      >
                        🚀 Proceed to Shopify Checkout
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          {sandboxMode === 'mern' && (
            /* ── MERN View ── */
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-[10px] font-bold uppercase tracking-wider">
                  💾 MongoDB + Express REST Server
                </span>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isLoading ? 'bg-yellow-400 animate-pulse' : 'bg-cyan-400 animate-ping'}`}></span>
                  <span className="text-[10px] font-mono text-white/50">MERN Stack Active</span>
                </div>
              </div>

              <h3 className="text-xl font-black text-white mb-2">MERN Database Sandbox</h3>
              <p className="text-white/60 text-xs mb-6 leading-relaxed">
                Interacting with full-stack endpoints. Create, retrieve, or delete records directly inside the virtual MongoDB database collection.
              </p>

              {/* Add User Form */}
              <form onSubmit={handleAddMongoUser} className="p-4 rounded-2xl border border-white/5 bg-black/30 space-y-4 mb-6">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">// Write Document (MongoDB Collection)</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-white/40 block mb-1" htmlFor="new-user-name">User Name</label>
                    <input 
                      type="text" 
                      id="new-user-name"
                      name="username"
                      autoComplete="name"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      placeholder="e.g. Liam Arshad"
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                      maxLength={24}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/40 block mb-1" htmlFor="new-user-role">User Role</label>
                    <select
                      id="new-user-role"
                      name="userrole"
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                    >
                      <option value="Developer">Developer</option>
                      <option value="Store Manager">Store Manager</option>
                      <option value="E-Commerce Client">E-Commerce Client</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !newUserName.trim()}
                  data-cursor-text="POST"
                  className="w-full py-2 px-4 text-xs font-bold text-white rounded-lg bg-[var(--color-accent)] hover:bg-cyan-500 disabled:bg-white/5 transition-all duration-200"
                >
                  {isLoading ? "Querying Atlas Node..." : "💾 POST Request (Create Document)"}
                </button>
              </form>

              {/* Live MongoDB Collection Monitor */}
              <div>
                <div className="flex items-center justify-between mb-3 text-[11px] font-mono">
                  <span className="text-white/40">MongoDB Collection: `users`</span>
                  <button onClick={handleResetMongoUsers} data-cursor-text="RESET" className="text-white/50 hover:text-white">
                    Reset Collection
                  </button>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {mongoUsers.map(u => (
                    <div key={u._id} className="flex items-center justify-between p-2.5 rounded-lg border border-white/5 bg-black/20 font-mono text-xs text-white/80">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white/95">{u.name}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-white/55 font-bold uppercase">{u.role}</span>
                        </div>
                        <span className="text-[9px] text-white/30 truncate block max-w-[200px] mt-0.5">_id: {u._id}</span>
                      </div>
                      
                      <button 
                        onClick={() => handleDeleteMongoUser(u._id, u.name)}
                        disabled={isLoading}
                        data-cursor-text="DELETE"
                        className="text-rose-400 hover:text-rose-300 p-1"
                        title="Delete document"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {sandboxMode === 'js-lab' && (
            /* ── JS/React Lab View ── */
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-wider font-mono">
                  ⚙️ High-Performance JS/React Lab
                </span>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isLoading || isReact19Pending ? 'bg-yellow-400 animate-pulse' : 'bg-purple-400 animate-ping'}`}></span>
                  <span className="text-[10px] font-mono text-white/50">Runtime Active</span>
                </div>
              </div>

              <h3 className="text-xl font-black text-white mb-2">JS/React Optimization Lab</h3>
              <p className="text-white/60 text-xs mb-6 leading-relaxed">
                Interact with core speed optimizations. Select a strategy below to inspect the client-side wrapper on the right and run console executions live.
              </p>

              {/* Lab Navigation Toggles */}
              <div className="grid grid-cols-3 gap-2 mb-6 font-mono text-[9px]">
                {(['swr', 'debounce', 'transition'] as const).map(sim => (
                  <button
                    key={sim}
                    onClick={() => {
                      setSelectedSimulation(sim);
                      setQueryCode(JS_LAB_CODE_SNIPPETS[sim]);
                      setConsoleOutput(`// Swapped simulation to: ${sim === 'swr' ? 'Stale-While-Revalidate Caching' : sim === 'debounce' ? 'Event Debouncing' : 'React 19 Asynchronous Actions'}\n// Click 'Run Simulation' below to see execution telemetry.`);
                    }}
                    className={`py-2.5 px-1 rounded-lg border font-bold uppercase text-center transition-all ${
                      selectedSimulation === sim
                        ? 'border-purple-500 bg-purple-500/10 text-white shadow-[0_0_10px_rgba(168,85,247,0.15)]'
                        : 'border-white/10 text-white/40 hover:text-white/70 hover:bg-white/[0.01]'
                    }`}
                  >
                    {sim === 'swr' ? 'SWR Cache' : sim === 'debounce' ? 'Debounce' : 'React 19'}
                  </button>
                ))}
              </div>

              {/* Dynamic Simulation Console Panel */}
              <div className="p-5 rounded-2xl border border-white/5 bg-black/30 space-y-5 mb-6">
                {selectedSimulation === 'swr' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-mono text-white/60">// Caching telemetry</span>
                      <button onClick={handleResetJSLab} className="text-[9px] font-mono text-white/30 hover:text-white">
                        Reset Cache
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center text-xs font-mono">
                      <div className="p-3 bg-black/20 border border-white/5 rounded-xl">
                        <span className="text-white/45 block text-[10px] uppercase">Cache Hits</span>
                        <span className="text-lg font-black text-emerald-400">{swrCacheHits}</span>
                      </div>
                      <div className="p-3 bg-black/20 border border-white/5 rounded-xl">
                        <span className="text-white/45 block text-[10px] uppercase">Cache Misses</span>
                        <span className="text-lg font-black text-amber-400">{swrCacheMisses}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleRunSWR}
                      disabled={isLoading}
                      className="w-full py-2.5 px-4 text-xs font-bold text-white rounded-lg bg-purple-500 hover:bg-purple-600 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                    >
                      {isLoading ? "Fetching from Edge Server..." : "🚀 Fetch API (fetchWithSWR)"}
                    </button>
                  </div>
                )}

                {selectedSimulation === 'debounce' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-mono text-white/60">// Scroll group telemetry</span>
                      <button onClick={handleResetJSLab} className="text-[9px] font-mono text-white/30 hover:text-white">
                        Reset Counts
                      </button>
                    </div>
                    <div className="flex justify-between items-center bg-black/20 p-2.5 rounded-lg border border-white/5">
                      <span className="text-[10px] font-mono text-white/50">Debounce:</span>
                      <div className="flex gap-1.5 font-mono text-[9px]">
                        <button
                          type="button"
                          onClick={() => setIsDebounceActive(true)}
                          className={`px-2.5 py-1 rounded border font-bold transition-all ${
                            isDebounceActive
                              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                              : 'border-white/10 text-white/40 hover:text-white/60'
                          }`}
                        >
                          ON (350ms)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsDebounceActive(false);
                            setConsoleOutput(`// Debounce disabled.\n// WARNING: Every raw scroll event will execute an immediate database telemetry write, causing thread blocks.`);
                          }}
                          className={`px-2.5 py-1 rounded border font-bold transition-all ${
                            !isDebounceActive
                              ? 'border-rose-500/50 bg-rose-500/10 text-rose-400'
                              : 'border-white/10 text-white/40 hover:text-white/60'
                          }`}
                        >
                          OFF
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center text-xs font-mono">
                      <div className="p-3 bg-black/20 border border-white/5 rounded-xl">
                        <span className="text-white/45 block text-[10px] uppercase">Raw Scrolls</span>
                        <span className="text-lg font-black text-amber-400">{rawScrollCount}</span>
                      </div>
                      <div className="p-3 bg-black/20 border border-white/5 rounded-xl">
                        <span className="text-white/45 block text-[10px] uppercase">Database Writes</span>
                        <span className="text-lg font-black text-emerald-400">{debouncedWriteCount}</span>
                      </div>
                    </div>
                    
                    {/* Interactive scroll area track */}
                    <div 
                      onScroll={handleTriggerScroll}
                      className="w-full h-24 rounded-lg border border-dashed border-white/10 bg-black/45 flex items-center justify-center relative overflow-y-scroll cursor-ns-resize group/scrolltrack select-none"
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-[9px] font-mono text-white/35 group-hover/scrolltrack:text-white/60 transition-colors uppercase gap-1 text-center px-4">
                        <span>↕️ Scroll / Swipe here to trigger events</span>
                        <span className="text-[7.5px] opacity-75">(Scroll track listener active)</span>
                      </div>
                      <div className="w-full h-[600px] pointer-events-none"></div>
                    </div>
                  </div>
                )}

                {selectedSimulation === 'transition' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-mono text-white/60">// React 19 Action telemetry</span>
                      <button onClick={handleResetJSLab} className="text-[9px] font-mono text-white/30 hover:text-white">
                        Reset State
                      </button>
                    </div>
                    <div className="flex justify-between items-center bg-black/20 p-2.5 rounded-lg border border-white/5">
                      <span className="text-[10px] font-mono text-white/50">Execution Mode:</span>
                      <div className="flex gap-1.5 font-mono text-[9px]">
                        <button
                          type="button"
                          onClick={() => {
                            setIsBlockingTransition(false);
                            setConsoleOutput(`// Mode: React 19 Concurrent Transition (Non-blocking)\n// Click 'Update Atlas Admin Document' to run asynchronously.`);
                          }}
                          className={`px-2.5 py-1 rounded border font-bold transition-all ${
                            !isBlockingTransition
                              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                              : 'border-white/10 text-white/45'
                          }`}
                        >
                          Non-Blocking
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsBlockingTransition(true);
                            setConsoleOutput(`// Mode: Synchronous Blocking (Legacy UI thread lock)\n// Click 'Update Atlas Admin Document' to simulate CPU-heavy blocking work.`);
                          }}
                          className={`px-2.5 py-1 rounded border font-bold transition-all ${
                            isBlockingTransition
                              ? 'border-rose-500/50 bg-rose-500/10 text-rose-400'
                              : 'border-white/10 text-white/45'
                          }`}
                        >
                          Blocking
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-black/20 p-2.5 rounded-lg border border-white/5">
                      <span className="text-[10px] font-mono text-white/50">Transition State:</span>
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                        isReact19Pending 
                          ? 'border-yellow-500/40 bg-yellow-500/10 text-yellow-400 animate-pulse'
                          : react19Status === 'blocking'
                          ? 'border-rose-500/40 bg-rose-500/10 text-rose-400 animate-pulse'
                          : 'border-white/10 bg-white/5 text-white/45'
                      }`}>
                        {isReact19Pending ? 'Pending (Async)' : react19Status === 'blocking' ? 'Thread Blocked' : 'Idle'}
                      </span>
                    </div>
                    <button
                      onClick={handleRunReact19Action}
                      disabled={isReact19Pending || (react19Status === 'blocking')}
                      className={`w-full py-2.5 px-4 text-xs font-bold text-white rounded-lg transition-all shadow-[0_0_15px_rgba(168,85,247,0.25)] ${
                        react19Status === 'blocking'
                          ? 'bg-rose-500 hover:bg-rose-600'
                          : 'bg-purple-500 hover:bg-purple-600 disabled:opacity-50'
                      }`}
                    >
                      {isReact19Pending 
                        ? "Processing Transition..." 
                        : react19Status === 'blocking' 
                        ? "Executing Blocking Call..." 
                        : "💾 Update Atlas Admin Document"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ═══ RIGHT PANEL: CODE DISPLAY ═══ */}
        <div className="lg:col-span-6 flex flex-col h-full bg-black/35">
          <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/5">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('query')}
                data-cursor-text="CODE"
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
                  activeTab === 'query'
                    ? 'bg-white/10 text-white border border-white/10'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                {sandboxMode === 'shopify' 
                  ? 'storefrontMutation.graphql' 
                  : sandboxMode === 'mern' 
                  ? 'expressRouter.js' 
                  : selectedSimulation === 'swr' 
                  ? 'fetchWithSWR.js' 
                  : selectedSimulation === 'debounce' 
                  ? 'debounceEvent.js' 
                  : 'useTransitionAction.jsx'}
              </button>
              <button
                onClick={() => setActiveTab('response')}
                data-cursor-text="JSON"
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
                  activeTab === 'response'
                    ? 'bg-white/10 text-white border border-white/10'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                {sandboxMode === 'shopify' 
                  ? 'shopifyResponse.json' 
                  : sandboxMode === 'mern' 
                  ? 'databasePayload.json' 
                  : 'telemetryConsole.log'}
              </button>
            </div>
            <span className="text-[9px] font-bold text-pink-500 uppercase tracking-widest font-mono select-none">Live Console Log</span>
          </div>

          <div className="flex-1 p-4 flex flex-col justify-between min-h-[300px]">
            <div className="h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono text-white/35">
                  {activeTab === 'query' 
                    ? (sandboxMode === 'shopify' 
                        ? 'GraphQL Request Payload' 
                        : sandboxMode === 'mern' 
                        ? 'React Client Request + Express Route' 
                        : 'JavaScript / React Source Code')
                    : (sandboxMode === 'shopify' 
                        ? 'Shopify Edge response JSON' 
                        : sandboxMode === 'mern' 
                        ? 'Express HTTP Response + Atlas Telemetry' 
                        : 'Optimization Execution Console Log')}
                </span>
                {isLoading && (
                  <span className="text-[9px] font-mono text-amber-400 font-bold uppercase tracking-wider animate-pulse">
                    Querying Endpoint...
                  </span>
                )}
              </div>
              
              <pre className={`text-[10px] font-mono overflow-auto flex-1 p-3 rounded-lg bg-black/50 border transition-all duration-300 min-h-[200px] sm:min-h-[300px] max-h-[430px] ${
                isConsoleGlowing 
                  ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                  : 'border-white/5'
              }`}>
                <code dangerouslySetInnerHTML={{
                  __html: activeTab === 'query' 
                    ? (queryCode ? highlightGraphQL(queryCode) : `<span class="text-white/20">// ${sandboxMode === 'shopify' ? 'GraphQL cart variables will compile here' : 'Express request syntax will compile here'}</span>`)
                    : highlightJSON(consoleOutput)
                }}></code>
              </pre>
            </div>

            <div className="mt-4 flex items-center justify-between text-[9px] font-mono text-white/30 border-t border-white/5 pt-3 select-none">
              <span>Server: {sandboxMode === 'shopify' ? 'Shopify Oxygen Edge' : sandboxMode === 'mern' ? 'Express Backend Runtime' : 'Node.js V8 Engine'}</span>
              <span>Host: {sandboxMode === 'shopify' ? 'mock.shop Graph client' : sandboxMode === 'mern' ? 'MongoDB Atlas node' : 'Vite HMR Client / Browser Context'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Shopify Checkout Simulator Modal ── */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4 py-6 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#070913] p-5 md:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] font-sans relative overflow-hidden text-left" onClick={(e) => e.stopPropagation()}>
            
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"></div>

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-accent)] text-sm">🛍️</span>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Shopify Checkout Simulator</h4>
              </div>
              <button 
                onClick={handleCloseCheckoutModal} 
                className="text-white/40 hover:text-white transition-colors p-1"
                aria-label="Close Checkout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Progress indicators */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5 text-[10px] font-mono uppercase tracking-wider text-white/40 select-none">
              <span className={checkoutStep === 'info' ? 'text-[var(--color-accent)] font-black' : 'text-white/30'}>1. Shipping</span>
              <span>→</span>
              <span className={checkoutStep === 'payment' ? 'text-[var(--color-accent)] font-black' : 'text-white/30'}>2. Payment</span>
              <span>→</span>
              <span className={checkoutStep === 'success' ? 'text-[var(--color-accent)] font-black' : 'text-white/30'}>3. Confirmation</span>
            </div>

            {/* Order Mini-Summary Sidebar */}
            {checkoutStep !== 'success' && (
              <div className="mb-5 p-3 rounded-lg border border-white/5 bg-white/[0.02] space-y-2 text-xs font-mono">
                <span className="text-[10px] text-white/30 uppercase block">// Order Summary</span>
                <div className="max-h-24 overflow-y-auto space-y-1">
                  {cartLines.map(line => (
                    <div key={line.id} className="flex justify-between text-white/70">
                      <span className="truncate max-w-[200px]">{line.merchandise.title} (x{line.quantity})</span>
                      <span>${(parseFloat(line.merchandise.price.amount) * line.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-2 text-[var(--color-accent)] font-bold">
                  <span>Total Amount:</span>
                  <span>${cartTotal} USD</span>
                </div>
              </div>
            )}

            {/* STEPS */}
            {checkoutStep === 'info' && (
              <form onSubmit={handleContinueToPayment} className="space-y-4 font-mono">
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-white/45 block mb-1" htmlFor="checkout-email">Email Address</label>
                    <input 
                      type="email" 
                      id="checkout-email"
                      name="email"
                      required
                      value={shippingInfo.email} 
                      onChange={e => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      className="w-full bg-black/45 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[var(--color-accent)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/45 block mb-1" htmlFor="checkout-name">Full Name</label>
                    <input 
                      type="text" 
                      id="checkout-name"
                      name="name"
                      required
                      value={shippingInfo.name} 
                      onChange={e => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                      className="w-full bg-black/45 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[var(--color-accent)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/45 block mb-1" htmlFor="checkout-address">Shipping Address</label>
                    <input 
                      type="text" 
                      id="checkout-address"
                      name="address"
                      required
                      value={shippingInfo.address} 
                      onChange={e => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="w-full bg-black/45 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[var(--color-accent)] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-white/45 block mb-1" htmlFor="checkout-city">City</label>
                      <input 
                        type="text" 
                        id="checkout-city"
                        name="city"
                        required
                        value={shippingInfo.city} 
                        onChange={e => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className="w-full bg-black/45 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[var(--color-accent)] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-white/45 block mb-1" htmlFor="checkout-zip">Zip / Postal Code</label>
                      <input 
                        type="text" 
                        id="checkout-zip"
                        name="zip"
                        required
                        value={shippingInfo.zip} 
                        onChange={e => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                        className="w-full bg-black/45 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[var(--color-accent)] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full text-center mt-2 py-2.5 px-4 rounded-xl bg-[var(--color-accent)] hover:opacity-95 text-black font-black text-xs shadow-[0_0_15px_rgba(223,193,93,0.2)]"
                >
                  Continue to Payment Method →
                </button>
              </form>
            )}

            {checkoutStep === 'payment' && (
              <form onSubmit={handleCompleteOrder} className="space-y-4 font-mono">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-white/5 bg-white/[0.01] flex items-center justify-between text-xs text-white/60">
                    <div>
                      <span className="block text-[10px] text-white/30 uppercase">// Shipping details</span>
                      <span>{shippingInfo.name} • {shippingInfo.address}, {shippingInfo.city}</span>
                    </div>
                    <button type="button" onClick={() => setCheckoutStep('info')} className="text-[var(--color-accent)] text-[10px] hover:underline">
                      Edit
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] text-white/45 block mb-1" htmlFor="checkout-card-num">Credit Card Number</label>
                    <input 
                      type="text" 
                      id="checkout-card-num"
                      name="cardnum"
                      required
                      disabled
                      value={paymentCard.number} 
                      className="w-full bg-black/45 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/60 focus:outline-none cursor-not-allowed font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-white/45 block mb-1" htmlFor="checkout-card-expiry">Expiration</label>
                      <input 
                        type="text" 
                        id="checkout-card-expiry"
                        name="cardexpiry"
                        required
                        disabled
                        value={paymentCard.expiry} 
                        className="w-full bg-black/45 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/60 focus:outline-none cursor-not-allowed font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-white/45 block mb-1" htmlFor="checkout-card-cvc">CVC Security Code</label>
                      <input 
                        type="text" 
                        id="checkout-card-cvc"
                        name="cardcvc"
                        required
                        disabled
                        value={paymentCard.cvc} 
                        className="w-full bg-black/45 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/60 focus:outline-none cursor-not-allowed font-mono"
                      />
                    </div>
                  </div>
                  <span className="text-[9px] text-white/30 leading-relaxed block select-none">
                    * Interactive sandbox uses Shopify test credentials. Live checkout mutations will mock authorization tokens.
                  </span>
                </div>

                <button 
                  type="submit"
                  disabled={isCheckoutProcessing}
                  className="w-full text-center mt-2 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-white/5 disabled:text-white/40 text-black font-black text-xs shadow-[0_0_15px_rgba(16,185,129,0.25)] flex items-center justify-center gap-2"
                >
                  {isCheckoutProcessing ? (
                    <>
                      <svg className="animate-spin h-4.5 w-4.5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
                      Querying Shopify Payment Vault...
                    </>
                  ) : (
                    `💳 Complete Transaction ($${cartTotal} USD)`
                  )}
                </button>
              </form>
            )}

            {checkoutStep === 'success' && (
              <div className="text-center py-6 space-y-4 font-mono">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.15)] animate-bounce">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="space-y-1">
                  <h5 className="text-base font-black text-white">Payment Successful!</h5>
                  <p className="text-xs text-white/50">Shopify Order #{checkoutOrderId} created successfully</p>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-black/40 text-left text-xs space-y-1.5 text-white/70">
                  <div className="flex justify-between border-b border-white/5 pb-1.5 mb-1.5 text-[10px] text-white/40 uppercase">
                    <span>Receipt summary</span>
                    <span>Status: PAID</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Order Total:</span>
                    <span className="text-[var(--color-accent)] font-bold">${cartTotal} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer:</span>
                    <span>{shippingInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Address:</span>
                    <span className="truncate max-w-[200px]">{shippingInfo.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gateway:</span>
                    <span>shopify_payments</span>
                  </div>
                </div>

                <span className="text-[9px] text-white/35 block leading-relaxed select-none">
                  Webhook payload dispatched: `orders/create` signals pushed to Express analytics threads. Check response tab on the right side console.
                </span>

                <button 
                  onClick={handleCloseCheckoutModal}
                  className="w-full text-center py-2.5 px-4 rounded-xl bg-white hover:bg-white/90 text-black font-black text-xs transition-colors"
                >
                  Return to Storefront
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
