interface Point {
    x: number;
    y: number;
}

export const gcd = (a:number, b:number):number => {
    if (!b) {
      return a;
    }
    return gcd(b, a % b);
  }
  
export const lcm = (a:number,b:number) => {
    return ( a*b ) / gcd(a,b);
}

export const calcMiddlePoint = (a:Point, width: number, height: number):Point => {
    return {x: (a.x + a.x + width) / 2, y: (a.y + a.y + height) / 2};
}