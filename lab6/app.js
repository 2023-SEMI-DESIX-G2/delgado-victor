const fibonacci = (num)=>{
    const series = [0, 1];
                for (let i = 2; i < num; i++) {
                  series[i] = series[i - 1] + series[i - 2];
                }
                return series;
}
console.log(fibonacci(5));
