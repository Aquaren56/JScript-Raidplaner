export const gcd = (a:number, b:number):number => {
    if (!b) {
      return a;
    }
    return gcd(b, a % b);
  }
  
export const lcm = (a:number,b:number) => {
    return ( a*b ) / gcd(a,b);
}

