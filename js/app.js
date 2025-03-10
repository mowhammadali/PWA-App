if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((register) => {
      console.log("registed successfully", register);
    })
    .catch((err) => console.log(err));
} else {
  console.log("not");
}
