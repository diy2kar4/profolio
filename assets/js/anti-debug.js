document.addEventListener("keydown", function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
    e.preventDefault();
    alert("Hết cách rồi hẹ hẹ hẹ");
  }
  if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ["I", "C", "J", "S"].includes(e.key)) || (e.ctrlKey && e.key.toLowerCase() === "u")) {
    e.preventDefault();
    alert("Hãy thương Dev đi mà :(");
  }
});

document.addEventListener("contextmenu", e => e.preventDefault());

(function () {
  const threshold = 160;
  setInterval(() => {
    if (window.outerHeight - window.innerHeight > threshold) {
      alert("Tắt DevTools đi thg ngu");
      window.location.href = "about:blank";
    }
  }, 1000);
})();

// Blur Overlay on focus loss
const blurOverlay = document.getElementById("blur-overlay");
window.addEventListener("blur", () => blurOverlay.style.opacity = 1);
window.addEventListener("focus", () => blurOverlay.style.opacity = 0);

(function(){
  const devtools = () => {
    const before = new Date();
    debugger;
    const after = new Date();
    return after - before > 10;
  };
  setInterval(() => {
    if (devtools()) {
      alert("DevTools bị chặn.");
      window.location.href = "about:blank";
    }
  }, 1000);
})();

(function () {
  const bait = new Image();
  Object.defineProperty(bait, "id", {
    get() {
      // Bị gọi khi console.log mở ra
      alert("Cấm mở DevTools!");
      window.location.href = "about:blank";
    }
  });
  setInterval(() => console.log(bait), 1000);
})();

(function () {
  setInterval(() => {
    const detect = new Function("debugger;");
    detect();
  }, 500);
})();

(function () {
  const original = Function.prototype.toString;
  setInterval(() => {
    if (Function.prototype.toString !== original) {
      alert("Đừng cố gắng nữa!");
      location.href = "about:blank";
    }
  }, 1000);
})();

(function () {
  const detectDevtools = () => {
    const widthDiff = window.outerWidth - window.innerWidth > 160;
    const heightDiff = window.outerHeight - window.innerHeight > 160;
    return widthDiff || heightDiff;
  };

  setInterval(() => {
    if (detectDevtools()) {
      document.body.innerHTML = '';
      document.body.style.display = 'none';
    }
  }, 1000);
})();

(function () {
  const startAnti = () => {
    while (true) {} // Treo luôn trình duyệt
  };

  const detect = () => {
    const start = performance.now();
    debugger;
    const end = performance.now();
    return end - start > 100;
  };

  setInterval(() => {
    if (detect()) startAnti();
  }, 1000);
})();

console.log = function () {
  console.warn(">:(");
};
console.error = console.debug = console.warn = console.info = console.log;
