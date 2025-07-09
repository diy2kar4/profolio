var titles = [
  "@",
  "@d",
  "@di",
  "@diy",
  "@diy2",
  "@diy2k",
  "@diy2k4",
];

function changeTitle() {
  var index = 0;

  setInterval(function() {
      document.title = titles[index];
      index = (index + 1) % titles.length;
  }, 1000);
}

changeTitle();
