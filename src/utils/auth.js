export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@example.com" && password === "password") {
        resolve({ token: "fake-token-123" });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500); // Simulating network delay
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === "fake-token-123") {
        resolve({
          data: {
            name: "Fake User",
            email: "fake@example.com",
            _id: "user-123",
          },
        });
      } else {
        reject(new Error("Invalid token"));
      }
    }, 500);
  });
};
