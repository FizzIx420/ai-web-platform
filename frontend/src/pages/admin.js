import { supabase } from '../supabaseConfig.js';

export async function adminPage(user) {
  // Check if user is admin (you'll need a role column in profiles)
  // For demo, we'll just show the panel

  // Fetch pending orders
  const { data: orders } = await supabase
    .from('orders')
    .select('*, templates(title), profiles(full_name)')
    .eq('payment_status', 'pending');

  // Fetch unapproved templates
  const { data: unapprovedTemplates } = await supabase
    .from('templates')
    .select('*, profiles(full_name)')
    .eq('approved', false);

  // Fetch all users
  const { data: users } = await supabase
    .from('profiles')
    .select('*');

  return `
    <div class="admin-panel">
      <h2>Admin Dashboard</h2>
      <div class="flex" style="gap:2rem; align-items:start;">
        <div class="admin-sidebar">
          <ul>
            <li><a href="#" class="active" onclick="showAdminSection('orders')">Orders</a></li>
            <li><a href="#" onclick="showAdminSection('templates')">Templates</a></li>
            <li><a href="#" onclick="showAdminSection('users')">Users</a></li>
          </ul>
        </div>
        <div class="admin-main" id="adminMain">
          <!-- Default orders view -->
          ${renderOrders(orders)}
        </div>
      </div>
    </div>
  `;
}

function renderOrders(orders) {
  if (!orders || orders.length === 0) return '<p>No pending orders.</p>';
  return `
    <h3>Pending Orders</h3>
    <table class="admin-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>User</th>
          <th>Template</th>
          <th>Method</th>
          <th>Transaction</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${orders.map(o => `
          <tr>
            <td>${o.id.slice(0,8)}...</td>
            <td>${o.profiles?.full_name || 'N/A'}</td>
            <td>${o.templates?.title || 'N/A'}</td>
            <td>${o.payment_method}</td>
            <td>${o.transaction_id}</td>
            <td><button class="btn btn-sm btn-success" onclick="verifyOrder('${o.id}')">Verify</button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// Add global functions for admin actions
window.verifyOrder = async (orderId) => {
  const { error } = await supabase
    .from('orders')
    .update({ payment_status: 'verified' })
    .eq('id', orderId);
  if (error) alert(error.message);
  else {
    alert('Order verified');
    window.location.reload();
  }
};

window.showAdminSection = (section) => {
  // Implement tab switching
  document.querySelectorAll('.admin-sidebar a').forEach(a => a.classList.remove('active'));
  event.target.classList.add('active');
  // Load section data and update adminMain
  // (implementation left for brevity – you can fetch data and call render functions)
};