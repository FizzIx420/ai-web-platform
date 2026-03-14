export function dashboardPage(user) {
  if (!user) return '<p>Please login to view your dashboard.</p>';
  return `
    <div class="dashboard-container" style="padding: 20px;">
      <h2>Welcome back!</h2>
      <p>Logged in as: ${user.email}</p>
      <hr />
      <a href="#builder"><button>Open Visual Builder</button></a>
      <a href="#cart"><button>View My Cart</button></a>
    </div>
  `;
}