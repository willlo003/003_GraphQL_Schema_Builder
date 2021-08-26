function Line(x1: number, y1: number, x2: number, y2: number, id: string) {
  if (x2 < x1) {
    let tmp;
    tmp = x2;
    x2 = x1;
    x1 = tmp;
    tmp = y2;
    y2 = y1;
    y1 = tmp;
  }
  const lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const m = (y2 - y1) / (x2 - x1);
  const degree = (Math.atan(m) * 180) / Math.PI;
  const line = document.createElement("div");
  line.className = "line";
  line.id = id;
  line.style.transform = `rotate(${degree}deg)`;
  line.style.width = `${lineLength}px`;
  line.style.top = `${y1}px`;
  line.style.left = `${x1}px`;
  document.body.append(line);
}

export default Line;
