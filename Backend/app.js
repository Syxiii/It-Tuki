const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database simulation
let tickets = [
  { 
    id: 1, 
    title: "VPN ei toimi", 
    description: "VPN ei yhdistä", 
    status: "Avoin", 
    user: "matti@example.com",
    priority: "Korkea",
    created: "2025-01-10",
    updated: "2025-01-10"
  },
  { 
    id: 2, 
    title: "Tulostin rikki", 
    description: "Tulostin ei toimi", 
    status: "Käsittelyssä", 
    user: "matti@example.com",
    priority: "Keskitaso",
    created: "2025-01-09",
    updated: "2025-01-11"
  },
  { 
    id: 3, 
    title: "Sähköposti ei toimi", 
    description: "En saa sähköpostia", 
    status: "Ratkaistu", 
    user: "anna@example.com",
    priority: "Korkea",
    created: "2025-01-08",
    updated: "2025-01-11"
  }
];

let users = [
  { id: 1, email: "admin@example.com", password: "admin123", role: "admin", name: "Admin Käyttäjä" },
  { id: 2, email: "matti@example.com", password: "matti123", role: "user", name: "Matti Meikäläinen" },
  { id: 3, email: "anna@example.com", password: "anna123", role: "user", name: "Anna Virtanen" }
];

let nextTicketId = 4;

// Authentication middleware (simple token-based)
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token && token !== 'fake-jwt-token') {
    req.user = { email: 'matti@example.com', role: 'user' };
  }
  next();
};

app.use(authMiddleware);

// ==================== AUTHENTICATION ====================

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({
      success: true,
      token: 'fake-jwt-token',
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        role: user.role 
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Väärät tunnistetiedot' });
  }
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  res.json({ success: true, message: 'Onnistuneesti kirjautuneena ulos' });
});

// ==================== TICKETS ENDPOINTS ====================

// Get all tickets
app.get('/api/tickets', (req, res) => {
  res.json(tickets);
});

// Get ticket by ID
app.get('/api/tickets/:id', (req, res) => {
  const ticket = tickets.find(t => t.id === parseInt(req.params.id));
  if (!ticket) {
    return res.status(404).json({ message: 'Tikettiä ei löytynyt' });
  }
  res.json(ticket);
});

// Get user's own tickets
app.get('/api/my-tickets', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Ei tunnistautumista' });
  }
  const userTickets = tickets.filter(t => t.user === req.user.email);
  res.json(userTickets);
});

// Create new ticket
app.post('/api/tickets', (req, res) => {
  const { title, description, priority } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ message: 'Otsikko ja kuvaus vaaditaan' });
  }

  const newTicket = {
    id: nextTicketId++,
    title,
    description,
    priority: priority || 'Keskitaso',
    status: 'Avoin',
    user: req.user?.email || 'anonymous@example.com',
    created: new Date().toISOString().split('T')[0],
    updated: new Date().toISOString().split('T')[0]
  };

  tickets.push(newTicket);
  res.status(201).json(newTicket);
});

// Update ticket
app.put('/api/tickets/:id', (req, res) => {
  const ticket = tickets.find(t => t.id === parseInt(req.params.id));
  
  if (!ticket) {
    return res.status(404).json({ message: 'Tikettiä ei löytynyt' });
  }

  const { title, description, status, priority } = req.body;
  
  if (title) ticket.title = title;
  if (description) ticket.description = description;
  if (status) ticket.status = status;
  if (priority) ticket.priority = priority;
  ticket.updated = new Date().toISOString().split('T')[0];

  res.json(ticket);
});

// Delete ticket
app.delete('/api/tickets/:id', (req, res) => {
  const index = tickets.findIndex(t => t.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ message: 'Tikettiä ei löytynyt' });
  }

  const deletedTicket = tickets.splice(index, 1)[0];
  res.json({ message: 'Tiketti poistettu onnistuneesti', ticket: deletedTicket });
});

// Get ticket statistics (for admin dashboard)
app.get('/api/stats/dashboard', (req, res) => {
  const stats = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === 'Avoin').length,
    inProgressTickets: tickets.filter(t => t.status === 'Käsittelyssä').length,
    resolvedTickets: tickets.filter(t => t.status === 'Ratkaistu').length,
    highPriorityTickets: tickets.filter(t => t.priority === 'Korkea').length
  };
  res.json(stats);
});

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'IT-tukiportaali API on käynnissä',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Palvelimessa tapahtui virhe' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Palvelin käynnissä portissa ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
