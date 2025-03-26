export function getItems() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          _id: "65f7368dfb74bd6a92114c85",
          title: "Pikachu",
          imageUrl: "https://fakepokemonapi.com/images/pikachu.png",
        },
        {
          _id: "65f7371e7bce9e7d331b11a0",
          title: "Charizard",
          imageUrl: "https://fakepokemonapi.com/images/charizard.png",
        },
      ]);
    }, 500);
  });
}

export function saveItem(item) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...item, _id: "new-item-id" });
    }, 500);
  });
}
