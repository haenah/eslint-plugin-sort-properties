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

<table><tr><th style="text-align:center;">Benchmark</th><th style="text-align:center;">Time(ms)</th><th style="text-align:center;">sort-object-expression</th><th style="text-align:center;">sort-keys-fix/sort-keys-fix</th></tr><tr><td rowspan="4">Object expression:<br/>1 depth object with 10000 keys each</td><td style="text-align:center";>fix</td><td style="text-align:end";>0.05</td><td style="text-align:end";>3.00</td></tr><tr><td style="text-align:center";>parse</td><td style="text-align:end";>130.49</td><td style="text-align:end";>1027.26</td></tr><tr><td style="text-align:center";>rule</td><td style="text-align:end";>128.77</td><td style="text-align:end";>70.35</td></tr><tr><td style="text-align:center";>total</td><td style="text-align:end";>642.99</td><td style="text-align:end";>2827.51</td></tr><tr><td rowspan="4">Object expression:<br/>2 depth object with 100 keys each</td><td style="text-align:center";>fix</td><td style="text-align:end";>0.22</td><td style="text-align:end";>4.91</td></tr><tr><td style="text-align:center";>parse</td><td style="text-align:end";>264.66</td><td style="text-align:end";>936.69</td></tr><tr><td style="text-align:center";>rule</td><td style="text-align:end";>106.51</td><td style="text-align:end";>146.14</td></tr><tr><td style="text-align:center";>total</td><td style="text-align:end";>825.25</td><td style="text-align:end";>3070.91</td></tr><tr><td rowspan="4">Object expression:<br/>4 depth object with 10 keys each</td><td style="text-align:center";>fix</td><td style="text-align:end";>4.09</td><td style="text-align:end";>18.80</td></tr><tr><td style="text-align:center";>parse</td><td style="text-align:end";>347.61</td><td style="text-align:end";>1076.61</td></tr><tr><td style="text-align:center";>rule</td><td style="text-align:end";>140.50</td><td style="text-align:end";>543.45</td></tr><tr><td style="text-align:center";>total</td><td style="text-align:end";>1648.25</td><td style="text-align:end";>3753.00</td></tr></table>
