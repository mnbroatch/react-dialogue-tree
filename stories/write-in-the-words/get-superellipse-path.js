export default function getSuperellipsePath(x, y, width, height, eccentricity) {  
  const halfWidth = width / 2.0;
  const halfHeight = height / 2.0;
  const TWO_PI = Math.PI * 2.0;
  const resolution = 100;
  const centreX = x + halfWidth;
  const centreY = y + halfHeight;
  
  let svgPath = `M ${halfWidth} 0`

  for (let theta = 0.0; theta < TWO_PI; theta += TWO_PI / resolution) {
    const sineTheta = Math.sin(theta);
    const cosineTheta = Math.cos(theta);
    const r =  Math.pow(
      1 / (
        Math.pow(Math.abs(cosineTheta) / halfWidth, eccentricity)
        + Math.pow(Math.abs(sineTheta) / halfHeight, eccentricity)
      ),
      1 / eccentricity
    );

    svgPath += ` L ${r * cosineTheta} ${r * sineTheta}`;
  }

  return svgPath;
}

