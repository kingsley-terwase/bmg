// Dummy user credentials
export const DUMMY_USERS = {
  admin: {
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    user: {
      id: 1,
      firstname: "Admin",
      lastname: "User",
      email: "admin@example.com",
      role: "admin"
    }
  },
  expert: {
    email: "expert@example.com",
    password: "expert123",
    role: "expert",
    user: {
      id: 2,
      firstname: "Expert",
      lastname: "Smith",
      email: "expert@example.com",
      role: "expert"
    }
  },
  user: {
    email: "user@example.com",
    password: "user123",
    role: "user",
    user: {
      id: 3,
      firstname: "John",
      lastname: "Doe",
      email: "user@example.com",
      role: "user"
    }
  }
};

// Authenticate user
export const authenticateUser = (email, password) => {
  // Find matching user
  const userEntry = Object.values(DUMMY_USERS).find(
    (user) => user.email === email && user.password === password
  );

  if (userEntry) {
    return {
      success: true,
      data: userEntry,
      message: "Login successful"
    };
  }

  return {
    success: false,
    data: null,
    message: "Invalid email or password"
  };
};

// Get dashboard route based on role
export const getDashboardRoute = (role) => {
  const routes = {
    admin: "/dashboard",
    expert: "/dashboard/expert/overview",
    user: "/dashboard/user/overview"
  };

  return routes[role] || "/dashboard";
};

// ============================================
// DUMMY USER CREDENTIALS SUMMARY
// ============================================
/*
ADMIN:
  Email: admin@example.com
  Password: admin123
  Dashboard: /dashboard

EXPERT:
  Email: expert@example.com
  Password: expert123
  Dashboard: /dashboard/expert/overview

USER:
  Email: user@example.com
  Password: user123
  Dashboard: /dashboard/user/overview
*/
