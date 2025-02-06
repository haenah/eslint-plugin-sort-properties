# Benchmark results

See [benchmark runner code](run.js) for more information.

## Running environment

- Node.js: v22.13.1
- Architecture: arm64
- Platform: darwin
- CPU: Apple M3 Pro
- OS: Darwin 23.5.0
- \# of iterations: 5

## Comparison

<table><tr><th style="text-align:center;">Benchmark</th><th style="text-align:center;">Time(ms)</th><th style="text-align:center;">sort-object-expression</th><th style="text-align:center;">sort-keys-fix/sort-keys-fix</th></tr><tr><td rowspan="4">Object expression:<br/>1 depth object with 10000 keys each</td><td style="text-align:center";>fix</td><td style="text-align:end";>0.06</td><td style="text-align:end";>4.29</td></tr><tr><td style="text-align:center";>parse</td><td style="text-align:end";>123.79</td><td style="text-align:end";>847.19</td></tr><tr><td style="text-align:center";>rule</td><td style="text-align:end";>83.49</td><td style="text-align:end";>236.46</td></tr><tr><td style="text-align:center";>total</td><td style="text-align:end";>528.60</td><td style="text-align:end";>2883.01</td></tr><tr><td rowspan="4">Object expression:<br/>2 depth object with 100 keys each</td><td style="text-align:center";>fix</td><td style="text-align:end";>0.10</td><td style="text-align:end";>7.27</td></tr><tr><td style="text-align:center";>parse</td><td style="text-align:end";>192.28</td><td style="text-align:end";>858.31</td></tr><tr><td style="text-align:center";>rule</td><td style="text-align:end";>50.75</td><td style="text-align:end";>212.42</td></tr><tr><td style="text-align:center";>total</td><td style="text-align:end";>628.35</td><td style="text-align:end";>2924.51</td></tr><tr><td rowspan="4">Object expression:<br/>4 depth object with 10 keys each</td><td style="text-align:center";>fix</td><td style="text-align:end";>1.58</td><td style="text-align:end";>19.94</td></tr><tr><td style="text-align:center";>parse</td><td style="text-align:end";>575.73</td><td style="text-align:end";>1406.34</td></tr><tr><td style="text-align:center";>rule</td><td style="text-align:end";>95.85</td><td style="text-align:end";>262.71</td></tr><tr><td style="text-align:center";>total</td><td style="text-align:end";>1929.25</td><td style="text-align:end";>3940.06</td></tr></table>
